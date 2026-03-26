import { NextResponse } from "next/server";

const YANDEX_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY || "";

function extractFirstGeoObject(data: unknown) {
  if (!data || typeof data !== "object") {
    return null;
  }

  const response = (data as { response?: unknown }).response;
  if (!response || typeof response !== "object") {
    return null;
  }

  const collection = (response as { GeoObjectCollection?: unknown })
    .GeoObjectCollection;
  if (!collection || typeof collection !== "object") {
    return null;
  }

  const featureMember = (collection as { featureMember?: unknown }).featureMember;
  if (!Array.isArray(featureMember) || featureMember.length === 0) {
    return null;
  }

  const member = featureMember[0];
  if (!member || typeof member !== "object") {
    return null;
  }

  return (member as { GeoObject?: unknown }).GeoObject ?? null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const latitudeParam = searchParams.get("lat")?.trim();
  const longitudeParam = searchParams.get("lon")?.trim();
  const latitude = latitudeParam ? Number.parseFloat(latitudeParam) : null;
  const longitude = longitudeParam ? Number.parseFloat(longitudeParam) : null;
  const isReverseLookup =
    Number.isFinite(latitude) && Number.isFinite(longitude);

  if (!query && !isReverseLookup) {
    return NextResponse.json(
      { error: "Передайте адрес через параметр q или координаты lat/lon." },
      { status: 400 },
    );
  }

  if (!YANDEX_KEY) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_YANDEX_MAPS_KEY не настроен." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_KEY}&format=json&geocode=${encodeURIComponent(
        isReverseLookup
          ? `${longitude},${latitude}`
          : (query as string),
      )}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Геокодер Яндекса недоступен." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const geoObject = extractFirstGeoObject(data);

    if (!geoObject || typeof geoObject !== "object") {
      return NextResponse.json(
        { error: "Адрес не найден." },
        { status: 404 },
      );
    }

    const point = (geoObject as { Point?: { pos?: string } }).Point;
    const metadata = (
      geoObject as {
        metaDataProperty?: {
          GeocoderMetaData?: { text?: string };
        };
      }
    ).metaDataProperty;

    const pos = point?.pos?.split(" ") || [];
    const resolvedLongitude = Number.parseFloat(pos[0] || "");
    const resolvedLatitude = Number.parseFloat(pos[1] || "");

    if (!Number.isFinite(resolvedLatitude) || !Number.isFinite(resolvedLongitude)) {
      return NextResponse.json(
        { error: "Не удалось разобрать координаты." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      address:
        metadata?.GeocoderMetaData?.text ||
        query ||
        `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`,
      latitude: resolvedLatitude,
      longitude: resolvedLongitude,
    });
  } catch (error) {
    console.error("Yandex geocode route error", error);
    return NextResponse.json(
      { error: "Не удалось выполнить геокодирование." },
      { status: 500 },
    );
  }
}
