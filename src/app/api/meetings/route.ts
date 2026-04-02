import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import {
  MEETINGS,
  mapMeetingApiDocument,
  type MeetingRecord,
} from "@/lib/meetings";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const EVENTS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION || "events_corgi";
const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET || "media_corgi";
const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "";

type EventDocument = {
  $id: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  district?: string;
  type?: string;
  photo_url?: string;
  latitude?: number;
  longitude?: number;
  max_participants?: number;
};

function buildFileUrl(fileId: string) {
  const endpoint = APPWRITE_ENDPOINT.replace(/\/$/, "");
  const project = encodeURIComponent(APPWRITE_PROJECT);
  return `${endpoint}/storage/buckets/${STORAGE_BUCKET}/files/${fileId}/view?project=${project}`;
}

function mapEventDocument(document: EventDocument): MeetingRecord | null {
  if (
    !document.title ||
    !document.date ||
    !document.location ||
    typeof document.latitude !== "number" ||
    typeof document.longitude !== "number"
  ) {
    return null;
  }

  return mapMeetingApiDocument({
    id: document.$id,
    title: String(document.title),
    district: String(document.district || "Санкт-Петербург"),
    type: String(document.type || "Прогулка"),
    location: String(document.location),
    eventDate: String(document.date),
    participants: 0,
    maxParticipants:
      typeof document.max_participants === "number"
        ? document.max_participants
        : null,
    description: String(document.description || ""),
    imageUrl: document.photo_url ? String(document.photo_url) : undefined,
    latitude: document.latitude,
    longitude: document.longitude,
  });
}

async function getViewer() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(DB_ID, EVENTS_COLLECTION, [
      Query.orderDesc("$createdAt"),
      Query.limit(100),
    ]);

    const dynamicMeetings = response.documents
      .map((document) => mapEventDocument(document as unknown as EventDocument))
      .filter((meeting): meeting is MeetingRecord => Boolean(meeting));

    return NextResponse.json({
      meetings: [...dynamicMeetings, ...MEETINGS].sort((left, right) =>
        left.eventDate.localeCompare(right.eventDate),
      ),
    });
  } catch (error) {
    console.error("Meetings load failed", error);
    return NextResponse.json({
      meetings: MEETINGS,
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
          "Добавлять события могут только зарегистрированные пользователи.",
      },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("eventDate") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const latitude = Number(formData.get("latitude"));
  const longitude = Number(formData.get("longitude"));
  const maxParticipantsRaw = String(formData.get("maxParticipants") || "").trim();
  const image = formData.get("image");

  if (!title || !description || !date || !location || !district || !type) {
    return NextResponse.json(
      { ok: false, message: "Заполните обязательные поля события." },
      { status: 400 },
    );
  }

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { ok: false, message: "Поставьте метку события на карте." },
      { status: 400 },
    );
  }

  try {
    const { databases, storage } = await createAdminClient();
    let photoUrl = "";

    if (image instanceof File && image.size > 0) {
      const uploaded = await storage.createFile(
        STORAGE_BUCKET,
        ID.unique(),
        InputFile.fromBuffer(Buffer.from(await image.arrayBuffer()), image.name),
      );
      photoUrl = buildFileUrl(uploaded.$id);
    }

    const payload: Record<string, string | number> = {
      title,
      description,
      date,
      location,
      district,
      type,
      latitude,
      longitude,
    };

    if (photoUrl) {
      payload.photo_url = photoUrl;
    }

    if (maxParticipantsRaw) {
      payload.max_participants = Number(maxParticipantsRaw);
    }

    const document = await databases.createDocument(
      DB_ID,
      EVENTS_COLLECTION,
      ID.unique(),
      payload,
    );

    revalidatePath("/community");
    revalidatePath("/meetings");

    const meeting = mapEventDocument(document as unknown as EventDocument);

    return NextResponse.json({
      ok: true,
      meeting,
    });
  } catch (error) {
    console.error("Meeting create failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Не удалось сохранить событие. Проверьте коллекцию events_corgi и bucket media_corgi.",
      },
      { status: 500 },
    );
  }
}
