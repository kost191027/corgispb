import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import {
  COMMUNITY_MAP_SPOTS,
  getCommunityCategoryMeta,
  type CommunityMapCategory,
  type CommunityMapSpot,
} from "@/lib/map-spots";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";
const COMMUNITY_POINTS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_POINTS_COLLECTION ||
  "community_points_corgi";

type CommunityPointDocument = {
  $id: string;
  $createdAt?: string;
  category?: string;
  district?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  author_id?: string;
  author_name?: string;
  author_avatar_url?: string;
  author_is_admin?: boolean;
};

function buildSpotFromDocument(document: CommunityPointDocument): CommunityMapSpot | null {
  const category = String(document.category || "") as Exclude<
    CommunityMapCategory,
    "all"
  >;

  if (!["parks", "cafes", "community"].includes(category)) {
    return null;
  }

  const latitude = Number(document.latitude);
  const longitude = Number(document.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const categoryMeta = getCommunityCategoryMeta(category);

  return {
    id: document.$id,
    title: String(document.title || "Новая точка"),
    subtitle: String(document.subtitle || ""),
    description: String(document.description || ""),
    district: String(document.district || "Санкт-Петербург"),
    category,
    coordinates: [longitude, latitude],
    color: categoryMeta.color,
    iconName: categoryMeta.iconName,
    badge: categoryMeta.badge,
    source: "community",
    author: {
      id: document.author_id ? String(document.author_id) : undefined,
      name: String(document.author_name || "Участник сообщества"),
      profileHref: document.author_is_admin
        ? undefined
        : document.author_id
          ? `/owners/${String(document.author_id)}`
          : undefined,
      isAdmin: Boolean(document.author_is_admin),
    },
  };
}

async function getViewer() {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    let district = "";
    let avatarUrl = "";

    try {
      const profile = await databases.getDocument(DB_ID, USERS_COLLECTION, user.$id);
      district = String(profile.district || "");
      avatarUrl = String(profile.avatar_url || "");
    } catch {
      district = "";
    }

    return {
      id: user.$id,
      name: user.name,
      district,
      avatarUrl,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const viewer = await getViewer();

  try {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(DB_ID, COMMUNITY_POINTS_COLLECTION, [
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);

    const dynamicPoints = response.documents
      .map((document) => buildSpotFromDocument(document as unknown as CommunityPointDocument))
      .filter(Boolean) as CommunityMapSpot[];

    return NextResponse.json({
      viewer,
      points: [...dynamicPoints, ...COMMUNITY_MAP_SPOTS],
    });
  } catch (error) {
    console.error("Community points load failed", error);

    return NextResponse.json({
      viewer,
      points: COMMUNITY_MAP_SPOTS,
    });
  }
}

export async function POST(request: Request) {
  const viewer = await getViewer();

  if (!viewer) {
    return NextResponse.json(
      { ok: false, message: "Добавлять точки могут только зарегистрированные пользователи." },
      { status: 401 },
    );
  }

  const payload = (await request.json()) as {
    category?: string;
    district?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    latitude?: number | null;
    longitude?: number | null;
  };

  const category = String(payload.category || "") as Exclude<CommunityMapCategory, "all">;
  const district = String(payload.district || "").trim();
  const title = String(payload.title || "").trim();
  const subtitle = String(payload.subtitle || "").trim();
  const description = String(payload.description || "").trim();
  const latitude = typeof payload.latitude === "number" ? payload.latitude : null;
  const longitude = typeof payload.longitude === "number" ? payload.longitude : null;

  if (!["parks", "cafes", "community"].includes(category)) {
    return NextResponse.json({ ok: false, message: "Выберите системный бейдж для точки." }, { status: 400 });
  }

  if (!district || !title || !subtitle || !description) {
    return NextResponse.json({ ok: false, message: "Заполните все поля формы." }, { status: 400 });
  }

  if (title.length > 70 || subtitle.length > 90 || description.length > 500) {
    return NextResponse.json(
      { ok: false, message: "Один из текстовых блоков превышает допустимую длину." },
      { status: 400 },
    );
  }

  if (latitude === null || longitude === null) {
    return NextResponse.json(
      { ok: false, message: "Поставьте метку на карте или уточните адрес." },
      { status: 400 },
    );
  }

  try {
    const adminClient = await createAdminClient();
    const profile = await adminClient.databases
      .getDocument(DB_ID, USERS_COLLECTION, viewer.id)
      .catch(() => null);
    const appwriteUser = await adminClient.users.get(viewer.id).catch(() => null);
    const isAdmin =
      Array.isArray(appwriteUser?.labels) &&
      appwriteUser.labels.includes("superadmin");

    const document = await adminClient.databases.createDocument(
      DB_ID,
      COMMUNITY_POINTS_COLLECTION,
      ID.unique(),
      {
        category,
        district,
        title,
        subtitle,
        description,
        latitude,
        longitude,
        author_id: viewer.id,
        author_name: viewer.name,
        author_avatar_url: profile?.avatar_url ? String(profile.avatar_url) : viewer.avatarUrl || "",
        author_is_admin: isAdmin,
      },
    );

    revalidatePath("/");
    revalidatePath("/community/map");

    return NextResponse.json({
      ok: true,
      point: buildSpotFromDocument(document as unknown as CommunityPointDocument),
    });
  } catch (error) {
    console.error("Community point create failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось сохранить точку. Проверьте, что в Appwrite создана коллекция community_points_corgi.",
      },
      { status: 500 },
    );
  }
}
