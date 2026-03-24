"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errorMessage = "";

  if (!email || !password || !name) {
    errorMessage = "Все поля обязательны к заполнению";
  } else {
    try {
      const { account } = await createAdminClient();
      
      // Create the user account
      await account.create(ID.unique(), email, password, name);

      // Create a session for the new user
      const session = await account.createEmailPasswordSession(email, password);

      // Set secure HttpOnly cookie
      cookies().set("pet-portal-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    } catch (error: unknown) {
      errorMessage = error instanceof Error ? error.message : "Unknown error";
    }
  }

  if (errorMessage) {
    redirect(`/register?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/cabinet");
}

export async function signInWithEmail(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errorMessage = "";

  if (!email || !password) {
    errorMessage = "Все поля обязательны к заполнению";
  } else {
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
      errorMessage = error instanceof Error ? error.message : "Unknown error";
    }
  }

  if (errorMessage) {
    redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
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

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}
