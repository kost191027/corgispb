import { getCurrentUserProfile } from "@/actions/auth";
import { MeetingsPageClient } from "@/components/meetings/MeetingsPageClient";

export default async function MeetingsPage() {
  const viewer = await getCurrentUserProfile();

  return (
    <MeetingsPageClient
      viewer={
        viewer
          ? {
              id: viewer.$id,
              name: viewer.name,
              district: viewer.district,
              avatarUrl: viewer.avatarUrl,
            }
          : null
      }
    />
  );
}
