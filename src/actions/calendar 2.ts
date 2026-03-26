"use server";

import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { createAdminClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const CALENDAR_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_CALENDAR_COLLECTION || "calendar_events_corgi";

export interface CalendarActionResult {
  ok: boolean;
  message: string;
}

function normalizeDate(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.includes("T") ? trimmed : `${trimmed}T12:00`;
}

export async function createCalendarEvent(formData: FormData): Promise<CalendarActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const title = String(formData.get("title") || "").trim();
  const eventDate = normalizeDate(String(formData.get("eventDate") || ""));
  const location = String(formData.get("location") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const type = String(formData.get("type") || "").trim();

  if (!title || !eventDate) {
    return {
      ok: false,
      message: "Для события нужны название и дата.",
    };
  }

  try {
    const { databases } = await createAdminClient();
    await databases.createDocument(DB_ID, CALENDAR_COLLECTION, ID.unique(), {
      user_id: currentUser.$id,
      title,
      event_date: eventDate,
      location,
      description,
      type: type || "manual",
      source: "manual",
    });

    revalidatePath("/cabinet");

    return {
      ok: true,
      message: "Событие добавлено в календарь.",
    };
  } catch (error) {
    console.error("Calendar event create failed", error);
    return {
      ok: false,
      message: "Не удалось сохранить событие. Проверьте коллекцию calendar_events_corgi.",
    };
  }
}

export async function saveSiteEventToCalendar(formData: FormData): Promise<CalendarActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      ok: false,
      message: "Войдите в аккаунт, чтобы сохранить событие.",
    };
  }

  const sourceId = String(formData.get("sourceId") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const eventDate = normalizeDate(String(formData.get("eventDate") || ""));
  const location = String(formData.get("location") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const type = String(formData.get("type") || "").trim();

  if (!title || !eventDate) {
    return {
      ok: false,
      message: "У события не хватает названия или даты.",
    };
  }

  try {
    const { databases } = await createAdminClient();

    if (sourceId) {
      const existing = await databases.listDocuments(DB_ID, CALENDAR_COLLECTION, [
        Query.equal("user_id", currentUser.$id),
        Query.equal("source_id", sourceId),
        Query.limit(1),
      ]);

      if (existing.total > 0) {
        return {
          ok: true,
          message: "Событие уже есть в вашем календаре.",
        };
      }
    }

    await databases.createDocument(DB_ID, CALENDAR_COLLECTION, ID.unique(), {
      user_id: currentUser.$id,
      title,
      event_date: eventDate,
      location,
      description,
      type: type || "site",
      source: "site",
      source_id: sourceId || undefined,
    });

    revalidatePath("/cabinet");

    return {
      ok: true,
      message: "Событие добавлено в календарь.",
    };
  } catch (error) {
    console.error("Save site event failed", error);
    return {
      ok: false,
      message: "Не удалось добавить событие. Проверьте коллекцию calendar_events_corgi.",
    };
  }
}

export async function deleteCalendarEvent(formData: FormData): Promise<CalendarActionResult> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const eventId = String(formData.get("eventId") || "").trim();

  if (!eventId) {
    return {
      ok: false,
      message: "Не удалось определить событие для удаления.",
    };
  }

  try {
    const { databases } = await createAdminClient();
    const existingEvent = await databases.getDocument(DB_ID, CALENDAR_COLLECTION, eventId);

    if (String(existingEvent.user_id) !== currentUser.$id) {
      return {
        ok: false,
        message: "Нельзя удалить чужое событие.",
      };
    }

    await databases.deleteDocument(DB_ID, CALENDAR_COLLECTION, eventId);
    revalidatePath("/cabinet");

    return {
      ok: true,
      message: "Событие удалено.",
    };
  } catch (error) {
    console.error("Calendar event delete failed", error);
    return {
      ok: false,
      message: "Не удалось удалить событие из календаря.",
    };
  }
}
