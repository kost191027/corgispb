import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/auth";
import { getReminderNotificationsByUser } from "@/lib/server/calendar";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ notifications: [] });
  }

  const notifications = await getReminderNotificationsByUser(user.$id);

  return NextResponse.json({ notifications });
}
