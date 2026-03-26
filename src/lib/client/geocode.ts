"use client";

type GeocodePayload = {
  address: string;
  latitude: number | null;
  longitude: number | null;
};

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

function parseGeocodeResponse(data: unknown, fallbackAddress: string) {
  const geoObject = extractFirstGeoObject(data);

  if (!geoObject || typeof geoObject !== "object") {
    throw new Error("Адрес не найден.");
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
  const longitude = Number.parseFloat(pos[0] || "");
  const latitude = Number.parseFloat(pos[1] || "");

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error("Не удалось разобрать координаты.");
  }

  return {
    address: metadata?.GeocoderMetaData?.text || fallbackAddress,
    latitude,
    longitude,
  } satisfies GeocodePayload;
}

async function fetchDirectYandexGeocode(query: string, fallbackAddress: string) {
  const publicKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY?.trim();

  if (!publicKey) {
    throw new Error("NEXT_PUBLIC_YANDEX_MAPS_KEY не настроен.");
  }

  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${publicKey}&format=json&geocode=${encodeURIComponent(
      query,
    )}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Геокодер Яндекса временно недоступен.");
  }

  const data = await response.json();
  return parseGeocodeResponse(data, fallbackAddress);
}

async function fetchViaServer(queryString: string, fallbackAddress: string) {
  const response = await fetch(`/api/geocode?${queryString}`, {
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    address?: string;
    latitude?: number;
    longitude?: number;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error || "Не удалось определить адрес.");
  }

  return {
    address: payload.address || fallbackAddress,
    latitude:
      typeof payload.latitude === "number" ? payload.latitude : null,
    longitude:
      typeof payload.longitude === "number" ? payload.longitude : null,
  } satisfies GeocodePayload;
}

export async function geocodeAddress(address: string) {
  const normalizedAddress = address.trim();
  if (!normalizedAddress) {
    throw new Error("Введите адрес.");
  }

  try {
    return await fetchDirectYandexGeocode(normalizedAddress, normalizedAddress);
  } catch {
    return fetchViaServer(`q=${encodeURIComponent(normalizedAddress)}`, normalizedAddress);
  }
}

export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number,
) {
  const fallbackAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  const query = `${longitude},${latitude}`;

  try {
    return await fetchDirectYandexGeocode(query, fallbackAddress);
  } catch {
    return fetchViaServer(
      `lat=${encodeURIComponent(String(latitude))}&lon=${encodeURIComponent(
        String(longitude),
      )}`,
      fallbackAddress,
    );
  }
}
