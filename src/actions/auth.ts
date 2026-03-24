"use server";

import { ID, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";

export async function signUpWithEmail(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    redirect(`/register?error=${encodeURIComponent("Все поля обязательны к заполнению")}`);
  }

  try {
    const { account } = await createAdminClient();
    
    // 1. Create auth account
    const newUser = await account.create(ID.unique(), email, password, name);

    // 2. Create a session for the new user
    const session = await account.createEmailPasswordSession(email, password);

    // 3. Save user profile to database collection
    try {
      const adminClient = await createAdminClient();
      const databases = adminClient.databases;
      await databases.createDocument(DB_ID, USERS_COLLECTION, newUser.$id, {
        name: name,
        email: email,
        city: "Санкт-Петербург",
        role: "owner",
      });
    } catch (dbError) {
      console.error("Failed to create user profile in DB:", dbError);
      // Don't block registration if DB write fails — auth is already done
    }

    // 4. Set secure HttpOnly cookie
    cookies().set("pet-portal-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
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
      maxAge: 60 * 60 * 24 * 30, // 30 days
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

// Returns a plain serializable object
export async function getCurrentUser(): Promise<{
  $id: string;
  name: string;
  email: string;
} | null> {
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
}
