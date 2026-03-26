"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/actions/auth";
import { createSessionClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";

export interface UpdateProfileResult {
  ok: boolean;
  message: string;
}

export async function updateCurrentUserProfile(formData: FormData): Promise<UpdateProfileResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const name = String(formData.get("name") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const avatarUrl = String(formData.get("avatarUrl") || "").trim();

  if (!name) {
    return {
      ok: false,
      message: "Имя профиля не может быть пустым.",
    };
  }

  try {
    const { account, databases } = await createSessionClient();
    await account.updateName(name);
    await databases.updateDocument(DB_ID, USERS_COLLECTION, currentUser.$id, {
      name,
      city: city || "Санкт-Петербург",
      bio,
      avatar_url: avatarUrl,
    });

    revalidatePath("/");
    revalidatePath("/cabinet");
    revalidatePath(`/owners/${currentUser.$id}`);

    return {
      ok: true,
      message: "Профиль обновлен.",
    };
  } catch (error) {
    console.error("Profile update failed", error);
    return {
      ok: false,
      message: "Не удалось обновить профиль. Проверьте данные и настройки коллекции users_corgi.",
    };
  }
}
