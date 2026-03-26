import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "@/actions/auth";
import { CabinetPageClient } from "@/components/cabinet/CabinetPageClient";
import { getCalendarEventsByUser } from "@/lib/server/calendar";
import { getPetsByUser } from "@/lib/server/pets";

export default async function CabinetPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  const [pets, calendarEvents] = await Promise.all([
    getPetsByUser(profile.$id),
    getCalendarEventsByUser(profile.$id),
  ]);

  return <CabinetPageClient calendarEvents={calendarEvents} pets={pets} user={{ ...profile, id: profile.$id }} />;
}
