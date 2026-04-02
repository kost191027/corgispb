import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";
const COMMUNITY_GROUPS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUPS_COLLECTION ||
  "community_groups_corgi";
const COMMUNITY_GROUP_MEMBERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUP_MEMBERS_COLLECTION ||
  "community_group_members_corgi";

async function getViewer() {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const profile = await databases
      .getDocument(DB_ID, USERS_COLLECTION, user.$id)
      .catch(() => null);

    return {
      id: user.$id,
      name: user.name,
      district: profile?.district ? String(profile.district) : "",
      avatarUrl: profile?.avatar_url ? String(profile.avatar_url) : "",
    };
  } catch {
    return null;
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const viewer = await getViewer();

  if (!viewer) {
    return NextResponse.json(
      { ok: false, message: "Вступить в группу могут только авторизованные пользователи." },
      { status: 401 },
    );
  }

  const groupId = params.id;

  try {
    const { databases } = await createAdminClient();

    await databases.getDocument(DB_ID, COMMUNITY_GROUPS_COLLECTION, groupId);

    const existingMemberships = await databases.listDocuments(
      DB_ID,
      COMMUNITY_GROUP_MEMBERS_COLLECTION,
      [
        Query.equal("group_id", groupId),
        Query.equal("user_id", viewer.id),
        Query.limit(1),
      ],
    );

    if (!existingMemberships.total) {
      await databases.createDocument(
        DB_ID,
        COMMUNITY_GROUP_MEMBERS_COLLECTION,
        ID.unique(),
        {
          group_id: groupId,
          user_id: viewer.id,
          user_name: viewer.name,
          avatar_url: viewer.avatarUrl || "",
          district: viewer.district || "",
        },
      );
    }

    revalidatePath("/community");
    revalidatePath(`/community/groups/${groupId}`);

    return NextResponse.json({ ok: true, joinedGroupId: groupId });
  } catch (error) {
    console.error("Community group join failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось вступить в группу. Проверьте, что в Appwrite создана коллекция community_group_members_corgi.",
      },
      { status: 500 },
    );
  }
}
