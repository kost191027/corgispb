import type { Metadata } from "next";
import { getCurrentUserProfile } from "@/actions/auth";
import { CommunityMeetingsExplorer } from "@/components/community/CommunityMeetingsExplorer";
import { getOwnerProfiles } from "@/lib/server/owners";

export const metadata: Metadata = {
  title: "Комьюнити — Корги СПб",
  description:
    "Встречи сообщества, районы города и карта мероприятий для владельцев корги в Санкт-Петербурге.",
};

export default async function CommunityPage() {
  const [owners, viewer] = await Promise.all([
    getOwnerProfiles(200),
    getCurrentUserProfile(),
  ]);

  return (
    <CommunityMeetingsExplorer
      owners={owners}
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
