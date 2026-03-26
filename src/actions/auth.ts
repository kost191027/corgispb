"use server";

import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";
const PETS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_PETS_COLLECTION || "pets_corgi";

export type CurrentUser = {
  $id: string;
  name: string;
  email: string;
};

export type CurrentUserProfile = CurrentUser & {
  city: string | null;
  district?: string;
  phone: string | null;
  bio: string | null;
  role: string | null;
  avatarUrl: string | null;
  hasProfileDocument: boolean;
};

export type CurrentUserPet = {
  id: string;
  name: string;
  breed: string;
  gender: string | null;
  birthDate: string | null;
  description: string | null;
  photoUrl: string | null;
  isPublic: boolean;
};

export type CabinetData = {
  user: CurrentUserProfile | null;
  pets: CurrentUserPet[];
};

export async function signUpWithEmail(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    redirect(`/register?error=${encodeURIComponent("Все поля обязательны к заполнению")}`);
  }

  try {
    const { account } = await createAdminClient();
    const newUser = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    try {
      const adminClient = await createAdminClient();
      const databases = adminClient.databases;
      await databases.createDocument(DB_ID, USERS_COLLECTION, newUser.$id, {
        name,
        email,
        city: "Санкт-Петербург",
        district: "",
        role: "owner",
      });
    } catch (dbError) {
      console.error("Failed to create user profile in DB:", dbError);
    }

    cookies().set("pet-portal-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Ошибка регистрации";
    redirect(`/register?error=${encodeURIComponent(msg)}`);
  }

  redirect("/cabinet");
}

export async function signInWithEmail(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent("Все поля обязательны к заполнению")}`);
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("pet-portal-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Ошибка авторизации";
    redirect(`/login?error=${encodeURIComponent(msg)}`);
  }

  redirect("/cabinet");
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    console.error("Sign out error", error);
  } finally {
    cookies().delete("pet-portal-session");
  }

  redirect("/");
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return {
      $id: user.$id,
      name: user.name,
      email: user.email,
    };
  } catch {
    return null;
  }
});

export const getCurrentUserProfile = cache(async (): Promise<CurrentUserProfile | null> => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    try {
      const profile = await databases.getDocument(DB_ID, USERS_COLLECTION, user.$id);
      return {
        $id: user.$id,
        name: String(profile.name || user.name),
        email: String(profile.email || user.email),
        city: profile.city ? String(profile.city) : "Санкт-Петербург",
        district: profile.district ? String(profile.district) : undefined,
        phone: profile.phone ? String(profile.phone) : null,
        bio: profile.bio ? String(profile.bio) : null,
        role: profile.role ? String(profile.role) : "owner",
        avatarUrl: profile.avatar_url ? String(profile.avatar_url) : null,
        hasProfileDocument: true,
      };
    } catch {
      return {
        $id: user.$id,
        name: user.name,
        email: user.email,
        city: "Санкт-Петербург",
        district: undefined,
        phone: null,
        bio: null,
        role: "owner",
        avatarUrl: null,
        hasProfileDocument: false,
      };
    }
  } catch {
    return null;
  }
});

export const getCurrentUserPets = cache(async (): Promise<CurrentUserPet[]> => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const response = await databases.listDocuments(DB_ID, PETS_COLLECTION, [
      Query.equal("user_id", user.$id),
      Query.orderDesc("$createdAt"),
      Query.limit(12),
    ]);

    return response.documents.map((pet) => ({
      id: pet.$id,
      name: String(pet.name || "Без имени"),
      breed: String(pet.breed || "Пемброк"),
      gender: pet.gender ? String(pet.gender) : null,
      birthDate: pet.birth_date ? String(pet.birth_date) : null,
      description: pet.description ? String(pet.description) : null,
      photoUrl: pet.photo_url ? String(pet.photo_url) : null,
      isPublic: typeof pet.is_public === "boolean" ? pet.is_public : true,
    }));
  } catch {
    return [];
  }
});

export const getCabinetData = cache(async (): Promise<CabinetData> => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const [profileResult, petsResult] = await Promise.allSettled([
      databases.getDocument(DB_ID, USERS_COLLECTION, user.$id),
      databases.listDocuments(DB_ID, PETS_COLLECTION, [
        Query.equal("user_id", user.$id),
        Query.orderDesc("$createdAt"),
        Query.limit(12),
      ]),
    ]);

    const profile =
      profileResult.status === "fulfilled"
        ? {
            $id: user.$id,
            name: String(profileResult.value.name || user.name),
            email: String(profileResult.value.email || user.email),
            city: profileResult.value.city ? String(profileResult.value.city) : "Санкт-Петербург",
            district: profileResult.value.district ? String(profileResult.value.district) : undefined,
            phone: profileResult.value.phone ? String(profileResult.value.phone) : null,
            bio: profileResult.value.bio ? String(profileResult.value.bio) : null,
            role: profileResult.value.role ? String(profileResult.value.role) : "owner",
            avatarUrl: profileResult.value.avatar_url ? String(profileResult.value.avatar_url) : null,
            hasProfileDocument: true,
          }
        : {
            $id: user.$id,
            name: user.name,
            email: user.email,
            city: "Санкт-Петербург",
            district: undefined,
            phone: null,
            bio: null,
            role: "owner",
            avatarUrl: null,
            hasProfileDocument: false,
          };

    const pets =
      petsResult.status === "fulfilled"
        ? petsResult.value.documents.map((pet) => ({
            id: pet.$id,
            name: String(pet.name || "Без имени"),
            breed: String(pet.breed || "Пемброк"),
            gender: pet.gender ? String(pet.gender) : null,
            birthDate: pet.birth_date ? String(pet.birth_date) : null,
            description: pet.description ? String(pet.description) : null,
            photoUrl: pet.photo_url ? String(pet.photo_url) : null,
            isPublic: typeof pet.is_public === "boolean" ? pet.is_public : true,
          }))
        : [];

    return { user: profile, pets };
  } catch {
    return { user: null, pets: [] };
  }
});

export const getPublicUserProfileById = cache(async (userId: string): Promise<{
  $id: string;
  name: string;
  city?: string;
  district?: string;
  avatarUrl?: string;
  bio?: string;
} | null> => {
  try {
    const { databases } = await createAdminClient();
    const profile = await databases.getDocument(DB_ID, USERS_COLLECTION, userId);

    return {
      $id: userId,
      name: String(profile.name || "Участник сообщества"),
      city: profile.city ? String(profile.city) : undefined,
      district: profile.district ? String(profile.district) : undefined,
      avatarUrl: profile.avatar_url ? String(profile.avatar_url) : undefined,
      bio: profile.bio ? String(profile.bio) : undefined,
    };
  } catch {
    return null;
  }
});
