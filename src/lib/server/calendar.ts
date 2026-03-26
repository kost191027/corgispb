import { Query } from "node-appwrite";
import { mapCalendarEvent, type CalendarEventDocument, type CalendarEventRecord } from "@/lib/calendar";
import { createAdminClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const CALENDAR_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_CALENDAR_COLLECTION || "calendar_events_corgi";

async function cleanupExpiredCalendarEvents(userId: string) {
  const thresholdDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString();

  try {
    const { databases } = await createAdminClient();
    const expired = await databases.listDocuments(DB_ID, CALENDAR_COLLECTION, [
      Query.equal("user_id", userId),
      Query.lessThan("event_date", thresholdDate),
      Query.limit(100),
    ]);

    if (!expired.documents.length) {
      return;
    }

    await Promise.allSettled(
      expired.documents.map((document) =>
        databases.deleteDocument(DB_ID, CALENDAR_COLLECTION, document.$id),
      ),
    );
  } catch (error) {
    console.error("Calendar cleanup failed", error);
  }
}

export async function getCalendarEventsByUser(userId: string): Promise<CalendarEventRecord[]> {
  try {
    await cleanupExpiredCalendarEvents(userId);
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(DB_ID, CALENDAR_COLLECTION, [
      Query.equal("user_id", userId),
      Query.limit(100),
    ]);

    return response.documents
      .map((document) => mapCalendarEvent(document as unknown as CalendarEventDocument))
      .sort((left, right) => new Date(left.eventDate).getTime() - new Date(right.eventDate).getTime());
  } catch (error) {
    console.error("Calendar events load failed", error);
    return [];
  }
}

export async function getReminderNotificationsByUser(userId: string) {
  const events = await getCalendarEventsByUser(userId);
  const now = Date.now();
  const inOneHour = now + 1000 * 60 * 60;

  return events.filter((event) => {
    if (!event.remindEnabled) {
      return false;
    }

    const eventTime = new Date(event.eventDate).getTime();
    return !Number.isNaN(eventTime) && eventTime >= now && eventTime <= inOneHour;
  });
}
