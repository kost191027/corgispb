import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import type { CommunityGroup } from "@/lib/community-groups";
import { listCommunityGroups } from "@/lib/server/community-groups";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";
const COMMUNITY_GROUPS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUPS_COLLECTION ||
  "community_groups_corgi";
const COMMUNITY_GROUP_MEMBERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUP_MEMBERS_COLLECTION ||
  "community_group_members_corgi";
const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET || "media_corgi";
const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "";

type CommunityGroupDocument = {
  $id: string;
  $createdAt?: string;
  name?: string;
  district?: string;
  today_topic?: string;
  description?: string;
  image_url?: string;
  author_id?: string;
  author_name?: string;
};

function buildFileUrl(fileId: string) {
  const endpoint = APPWRITE_ENDPOINT.replace(/\/$/, "");
  const project = encodeURIComponent(APPWRITE_PROJECT);
  return `${endpoint}/storage/buckets/${STORAGE_BUCKET}/files/${fileId}/view?project=${project}`;
}

function buildGroupFromDocument(
  document: CommunityGroupDocument,
): CommunityGroup {
  return {
    id: document.$id,
    name: String(document.name || "Новая группа"),
    district: String(document.district || "Санкт-Петербург"),
    todayTopic: String(document.today_topic || "Обсуждаем районные новости"),
    description: String(document.description || ""),
    imageUrl: document.image_url ? String(document.image_url) : undefined,
    source: "community",
    authorId: document.author_id ? String(document.author_id) : undefined,
    authorName: document.author_name ? String(document.author_name) : undefined,
    createdAt: document.$createdAt,
  };
}

async function getViewer() {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const profile = await databases.getDocument(DB_ID, USERS_COLLECTION, user.$id).catch(
      () => null,
    );

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

export async function GET() {
  try {
    const [groups, viewer] = await Promise.all([
      listCommunityGroups(),
      getViewer(),
    ]);
    let joinedGroupIds: string[] = [];

    if (viewer) {
      const { databases } = await createAdminClient();
      const memberships = await databases
        .listDocuments(DB_ID, COMMUNITY_GROUP_MEMBERS_COLLECTION, [
          Query.equal("user_id", viewer.id),
          Query.limit(200),
        ])
        .catch(() => ({ documents: [] }));

      joinedGroupIds = memberships.documents
        .map((document) => String(document.group_id || "").trim())
        .filter(Boolean);
    }

    return NextResponse.json({
      groups,
      joinedGroupIds,
    });
  } catch (error) {
    console.error("Community groups load failed", error);

    return NextResponse.json({
      groups: [],
      joinedGroupIds: [],
    });
  }
}

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Создавать группы могут только зарегистрированные пользователи.",
      },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const todayTopic = String(formData.get("todayTopic") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image = formData.get("image");

  if (!name || !district || !todayTopic || !description) {
    return NextResponse.json(
      { ok: false, message: "Заполните все поля группы." },
      { status: 400 },
    );
  }

  if (name.length > 70 || todayTopic.length > 120 || description.length > 500) {
    return NextResponse.json(
      {
        ok: false,
        message: "Один из текстовых блоков превышает допустимую длину.",
      },
      { status: 400 },
    );
  }

  try {
    const { databases, storage } = await createAdminClient();
    let imageUrl = viewer.avatarUrl || "";

    if (image instanceof File && image.size > 0) {
      const uploaded = await storage.createFile(
        STORAGE_BUCKET,
        ID.unique(),
        InputFile.fromBuffer(Buffer.from(await image.arrayBuffer()), image.name),
      );
      imageUrl = buildFileUrl(uploaded.$id);
    }

    const document = await databases.createDocument(
      DB_ID,
      COMMUNITY_GROUPS_COLLECTION,
      ID.unique(),
      {
        name,
        district,
        today_topic: todayTopic,
        description,
        image_url: imageUrl,
        author_id: viewer.id,
        author_name: viewer.name,
      },
    );

    await databases
      .createDocument(DB_ID, COMMUNITY_GROUP_MEMBERS_COLLECTION, ID.unique(), {
        group_id: document.$id,
        user_id: viewer.id,
        user_name: viewer.name,
        avatar_url: viewer.avatarUrl || "",
        district,
      })
      .catch((error) => {
        console.error("Community group author membership create failed", error);
      });

    revalidatePath("/community");
    revalidatePath(`/community/groups/${document.$id}`);

    return NextResponse.json({
      ok: true,
      group: buildGroupFromDocument(
        document as unknown as CommunityGroupDocument,
      ),
      joinedGroupId: document.$id,
    });
  } catch (error) {
    console.error("Community group create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось сохранить группу. Проверьте, что в Appwrite создана коллекция community_groups_corgi.",
      },
      { status: 500 },
    );
  }
}
