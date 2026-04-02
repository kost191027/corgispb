import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";
const COMMUNITY_GROUP_POSTS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUP_POSTS_COLLECTION ||
  "community_group_posts_corgi";
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
      { ok: false, message: "Писать на стене могут только участники сообщества." },
      { status: 401 },
    );
  }

  const groupId = params.id;
  const formData = await request.formData();
  const content = String(formData.get("content") || "").trim();

  if (!content) {
    return NextResponse.json(
      { ok: false, message: "Напишите сообщение для стены группы." },
      { status: 400 },
    );
  }

  if (content.length > 1500) {
    return NextResponse.json(
      { ok: false, message: "Сообщение слишком длинное. Максимум 1500 символов." },
      { status: 400 },
    );
  }

  try {
    const { databases } = await createAdminClient();
    const memberships = await databases.listDocuments(
      DB_ID,
      COMMUNITY_GROUP_MEMBERS_COLLECTION,
      [
        Query.equal("group_id", groupId),
        Query.equal("user_id", viewer.id),
        Query.limit(1),
      ],
    );

    if (!memberships.total) {
      return NextResponse.json(
        {
          ok: false,
          message: "Сначала вступите в группу, чтобы писать на ее стене.",
        },
        { status: 403 },
      );
    }

    const post = await databases.createDocument(
      DB_ID,
      COMMUNITY_GROUP_POSTS_COLLECTION,
      ID.unique(),
      {
        group_id: groupId,
        user_id: viewer.id,
        author_name: viewer.name,
        author_avatar_url: viewer.avatarUrl || "",
        content,
      },
    );

    revalidatePath(`/community/groups/${groupId}`);

    return NextResponse.json({
      ok: true,
      post: {
        id: post.$id,
        createdAt: post.$createdAt,
        groupId,
        userId: viewer.id,
        authorName: viewer.name,
        authorAvatarUrl: viewer.avatarUrl || undefined,
        content,
      },
    });
  } catch (error) {
    console.error("Community group post create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось отправить сообщение. Проверьте, что в Appwrite создана коллекция community_group_posts_corgi.",
      },
      { status: 500 },
    );
  }
}
