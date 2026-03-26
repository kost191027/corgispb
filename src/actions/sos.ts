"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getCurrentUser } from "@/actions/auth";
import { createAdminClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const LOST_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_LOST_COLLECTION || "lost_pets_corgi";
const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET ||
  process.env.APPWRITE_STORAGE_BUCKET ||
  "";
const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "";

export type SosReportType = "lost" | "found";

export type SosNotice = {
  id: string;
  petName: string;
  breed: string;
  age: string | null;
  description: string;
  address: string | null;
  phone: string;
  reward: string | null;
  photoUrl: string | null;
  galleryUrls: string[];
  lostDate: string | null;
  status: string;
  reportType: SosReportType;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
};

export type SosActionResult = {
  success: boolean;
  message: string;
};

type DescriptionMeta = {
  description: string;
  address: string;
  reportType: SosReportType;
  galleryUrls: string[];
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDate(value: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toISOString();
}

function normalizeCoordinate(value: string) {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildStoredDescription({
  description,
  address,
  reportType,
  galleryUrls,
}: DescriptionMeta) {
  const payload = [`[type=${reportType}]`];

  if (address) {
    payload.push(`[location=${address}]`);
  }

  if (galleryUrls.length > 0) {
    payload.push(`[gallery=${galleryUrls.join("||")}]`);
  }

  payload.push(description);

  return payload.join("\n");
}

function parseStoredDescription(rawValue: string): DescriptionMeta {
  const lines = rawValue
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let reportType: SosReportType = "lost";
  let address = "";
  let galleryUrls: string[] = [];
  const descriptionLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("[type=") && line.endsWith("]")) {
      const value = line.slice(6, -1);
      if (value === "lost" || value === "found") {
        reportType = value;
      }
      continue;
    }

    if (line.startsWith("[location=") && line.endsWith("]")) {
      address = line.slice(10, -1).trim();
      continue;
    }

    if (line.startsWith("[gallery=") && line.endsWith("]")) {
      galleryUrls = line
        .slice(9, -1)
        .split("||")
        .map((url) => url.trim())
        .filter(Boolean);
      continue;
    }

    descriptionLines.push(line);
  }

  return {
    description: descriptionLines.join("\n").trim() || "Описание не указано",
    address,
    reportType,
    galleryUrls,
  };
}

export async function getSosNotices(): Promise<SosNotice[]> {
  try {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(DB_ID, LOST_COLLECTION, [
      Query.equal("status", "active"),
      Query.orderDesc("$createdAt"),
      Query.limit(24),
    ]);

    return response.documents.map((document) => {
      const parsed = parseStoredDescription(String(document.description || ""));

      return {
        id: document.$id,
        petName: String(document.pet_name || "Без имени"),
        breed: String(document.breed || "Пемброк"),
        age: document.age ? String(document.age) : null,
        description: parsed.description,
        address: parsed.address || null,
        phone: String(document.phone || ""),
        reward: document.reward ? String(document.reward) : null,
        photoUrl: document.photo_url ? String(document.photo_url) : null,
        galleryUrls: parsed.galleryUrls,
        lostDate: document.lost_date ? String(document.lost_date) : null,
        status: document.status ? String(document.status) : "active",
        reportType: parsed.reportType,
        latitude:
          typeof document.latitude === "number" ? document.latitude : null,
        longitude:
          typeof document.longitude === "number" ? document.longitude : null,
        createdAt: String(document.$createdAt || ""),
      };
    });
  } catch (error) {
    console.error("Failed to load SOS notices", error);
    return [];
  }
}

export async function reportSosAction(
  formData: FormData,
): Promise<SosActionResult> {
  const petName = getFormValue(formData, "petName");
  const age = getFormValue(formData, "age");
  const breed = getFormValue(formData, "breed") || "Пемброк";
  const description = getFormValue(formData, "description");
  const address = getFormValue(formData, "address");
  const phone = getFormValue(formData, "phone");
  const reward = getFormValue(formData, "reward");
  const lostDate = normalizeDate(getFormValue(formData, "lostDate"));
  const latitude = normalizeCoordinate(getFormValue(formData, "latitude"));
  const longitude = normalizeCoordinate(getFormValue(formData, "longitude"));
  const reportType =
    getFormValue(formData, "reportType") === "found" ? "found" : "lost";
  const photos = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)
    .slice(0, 4);

  if (!petName || !description || !phone) {
    return {
      success: false,
      message: "Заполните кличку, описание и телефон для связи.",
    };
  }

  try {
    const { databases, storage } = await createAdminClient();
    const currentUser = await getCurrentUser();
    const galleryUrls: string[] = [];
    let photoUrl = "";

    if (photos.length > 0 && STORAGE_BUCKET) {
      for (const photo of photos) {
        try {
          const bytes = Buffer.from(await photo.arrayBuffer());
          const uploaded = await storage.createFile(
            STORAGE_BUCKET,
            ID.unique(),
            InputFile.fromBuffer(bytes, photo.name || "sos-photo"),
          );

          const uploadedUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET}/files/${uploaded.$id}/view?project=${APPWRITE_PROJECT}`;
          galleryUrls.push(uploadedUrl);
        } catch (uploadError) {
          console.error("Failed to upload SOS photo", uploadError);
        }
      }
    } else if (photos.length > 0 && !STORAGE_BUCKET) {
      console.error(
        "NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET is not configured. SOS photos were skipped.",
      );
    }

    if (galleryUrls.length > 0) {
      photoUrl = galleryUrls[0];
    }

    const payload: Record<string, string | number> = {
      user_id: currentUser?.$id || "anonymous",
      pet_name: petName,
      breed,
      description: buildStoredDescription({
        description,
        address,
        reportType,
        galleryUrls,
      }),
      phone,
      status: "active",
    };

    if (age) {
      payload.age = age;
    }

    if (reward) {
      payload.reward = reward;
    }

    if (lostDate) {
      payload.lost_date = lostDate;
    }

    if (typeof latitude === "number") {
      payload.latitude = latitude;
    }

    if (typeof longitude === "number") {
      payload.longitude = longitude;
    }

    if (photoUrl) {
      payload.photo_url = photoUrl;
    }

    await databases.createDocument(
      DB_ID,
      LOST_COLLECTION,
      ID.unique(),
      payload,
    );

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (BOT_TOKEN && CHAT_ID) {
      const title =
        reportType === "found" ? "Нашли собаку" : "СОС! Потерялась собака";
      const lines = [
        `*${title}*`,
        "",
        `*Кличка:* ${petName}`,
        `*Порода:* ${breed}`,
        age ? `*Возраст:* ${age}` : null,
        address ? `*Где заметили:* ${address}` : null,
        typeof latitude === "number" && typeof longitude === "number"
          ? `*Координаты:* ${latitude}, ${longitude}`
          : null,
        lostDate ? `*Дата:* ${lostDate}` : null,
        `*Описание:* ${description}`,
        `*Связь:* ${phone}`,
        reward ? `*Вознаграждение:* ${reward}` : null,
        galleryUrls.length > 0 ? `*Фото:* ${galleryUrls[0]}` : null,
      ].filter(Boolean);

      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: lines.join("\n"),
            parse_mode: "Markdown",
          }),
        });
      } catch (error) {
        console.error("Failed to send telegram webhook", error);
      }
    }

    revalidatePath("/sos");

    return {
      success: true,
      message: "SOS-объявление опубликовано.",
    };
  } catch (error) {
    console.error("Failed to save SOS report", error);
    return {
      success: false,
      message:
        "Не удалось опубликовать объявление. Проверьте Appwrite и попробуйте еще раз.",
    };
  }
}
