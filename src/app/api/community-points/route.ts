import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import {
  COMMUNITY_MAP_SPOTS,
  buildCommunityDistrictStat,
  getCommunityCategoryMeta,
  type CommunityMapCategory,
  type CommunityMapDistrictStat,
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

type OwnerDistrictDocument = {
  $id: string;
  district?: string;
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

async function listAllCommunityPointDocuments() {
  const { databases } = await createAdminClient();
  const documents: CommunityPointDocument[] = [];
  let cursor: string | undefined;

  while (true) {
    const queries = [Query.orderDesc("$createdAt"), Query.limit(100)];

    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    const response = await databases.listDocuments(
      DB_ID,
      COMMUNITY_POINTS_COLLECTION,
      queries,
    );

    const batch = response.documents as unknown as CommunityPointDocument[];
    documents.push(...batch);

    if (batch.length < 100) {
      break;
    }

    cursor = batch[batch.length - 1]?.$id;

    if (!cursor) {
      break;
    }
  }

  return documents;
}

async function listOwnerDistrictCounts() {
  const { databases } = await createAdminClient();
  const counts = new Map<string, number>();
  let cursor: string | undefined;

  while (true) {
    const queries = [Query.orderDesc("$createdAt"), Query.limit(100)];

    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    const response = await databases.listDocuments(DB_ID, USERS_COLLECTION, queries);
    const batch = response.documents as unknown as OwnerDistrictDocument[];

    batch.forEach((document) => {
      const district = String(document.district || "").trim();

      if (!district) {
        return;
      }

      counts.set(district, (counts.get(district) || 0) + 1);
    });

    if (batch.length < 100) {
      break;
    }

    cursor = batch[batch.length - 1]?.$id;

    if (!cursor) {
      break;
    }
  }

  return counts;
}

function buildDistrictStats(
  points: CommunityMapSpot[],
  ownerDistrictCounts: Map<string, number>,
): CommunityMapDistrictStat[] {
  const pointDistrictCounts = new Map<string, number>();

  points.forEach((point) => {
    const district = String(point.district || "").trim();

    if (!district) {
      return;
    }

    pointDistrictCounts.set(district, (pointDistrictCounts.get(district) || 0) + 1);
  });

  const districts = Array.from(
    new Set([
      ...Array.from(ownerDistrictCounts.keys()),
      ...Array.from(pointDistrictCounts.keys()),
    ]),
  );

  return districts
    .map((district) =>
      buildCommunityDistrictStat(
        district,
        ownerDistrictCounts.get(district) || 0,
        pointDistrictCounts.get(district) || 0,
      ),
    )
    .sort((left, right) => {
      if (right.ownersCount !== left.ownersCount) {
        return right.ownersCount - left.ownersCount;
      }

      if (right.pointsCount !== left.pointsCount) {
        return right.pointsCount - left.pointsCount;
      }

      return left.district.localeCompare(right.district, "ru");
    });
}

export async function GET() {
  const viewer = await getViewer();

  try {
    const [pointDocuments, ownerDistrictCounts] = await Promise.all([
      listAllCommunityPointDocuments(),
      listOwnerDistrictCounts(),
    ]);

    const dynamicPoints = pointDocuments
      .map((document) => buildSpotFromDocument(document as unknown as CommunityPointDocument))
      .filter(Boolean) as CommunityMapSpot[];

    const allPoints = [...dynamicPoints, ...COMMUNITY_MAP_SPOTS];

    return NextResponse.json({
      viewer,
      points: allPoints,
      districtStats: buildDistrictStats(allPoints, ownerDistrictCounts),
    });
  } catch (error) {
    console.error("Community points load failed", error);

    return NextResponse.json({
      viewer,
      points: COMMUNITY_MAP_SPOTS,
      districtStats: buildDistrictStats(COMMUNITY_MAP_SPOTS, new Map()),
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
