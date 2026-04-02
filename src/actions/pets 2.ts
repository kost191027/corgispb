"use server";

import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/auth";
import { serializePetDescription } from "@/lib/pets";
import { createAdminClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const PETS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_PETS_COLLECTION || "pets_corgi";
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET || "media_corgi";
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "";

export interface CreatePetResult {
  ok: boolean;
  message: string;
  petId?: string;
}

function buildFileUrl(fileId: string) {
  const endpoint = APPWRITE_ENDPOINT.replace(/\/$/, "");
  const project = encodeURIComponent(APPWRITE_PROJECT);
  return `${endpoint}/storage/buckets/${STORAGE_BUCKET}/files/${fileId}/view?project=${project}`;
}

async function uploadPetPhotos(files: File[]) {
  if (!files.length || !APPWRITE_PROJECT) {
    return [];
  }

  const { storage } = await createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file.size) {
      continue;
    }

    const uploadedFile = await storage.createFile(
      STORAGE_BUCKET,
      ID.unique(),
      InputFile.fromBuffer(Buffer.from(await file.arrayBuffer()), file.name),
    );

    urls.push(buildFileUrl(uploadedFile.$id));
  }

  return urls;
}

export async function createPet(formData: FormData): Promise<CreatePetResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      ok: false,
      message: "Нужно войти в аккаунт, чтобы добавить питомца.",
    };
  }

  const name = String(formData.get("name") || "").trim();
  const breed = String(formData.get("breed") || "").trim() || "Пемброк";
  const age = String(formData.get("age") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const traitsValue = String(formData.get("traits") || "[]");
  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!name) {
    return {
      ok: false,
      message: "Укажите кличку питомца.",
    };
  }

  let traits: string[] = [];
  try {
    traits = JSON.parse(traitsValue) as string[];
  } catch {
    traits = [];
  }

  let uploadedUrls: string[] = [];
  let uploadWarning = "";

  try {
    uploadedUrls = await uploadPetPhotos(photos);
  } catch (error) {
    console.error("Pet photo upload failed", error);
    uploadWarning = " Питомец сохранен без части фотографий.";
  }

  const descriptionWithMeta = serializePetDescription(description, {
    age,
    district,
    traits,
    gallery: uploadedUrls.slice(1),
  });

  try {
    const { databases } = await createAdminClient();
    const createdPet = await databases.createDocument(DB_ID, PETS_COLLECTION, ID.unique(), {
      user_id: currentUser.$id,
      name,
      breed,
      gender: "unknown",
      description: descriptionWithMeta,
      photo_url: uploadedUrls[0] || undefined,
      is_public: true,
    });

    revalidatePath("/cabinet");
    revalidatePath("/pets");
    revalidatePath(`/pets/${createdPet.$id}`);

    return {
      ok: true,
      message: `Питомец добавлен в профиль.${uploadWarning}`,
      petId: createdPet.$id,
    };
  } catch (error) {
    console.error("Pet create failed", error);
    return {
      ok: false,
      message: "Не удалось сохранить питомца. Проверьте обязательные поля и настройки коллекции pets_corgi.",
    };
  }
}
