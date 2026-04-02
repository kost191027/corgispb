export const PET_BREEDS = ["Пемброк", "Кардиган", "Другая"] as const;
export const PET_DISTRICTS = [
  "Адмиралтейский",
  "Василеостровский",
  "Выборгский",
  "Калининский",
  "Кировский",
  "Колпинский",
  "Красногвардейский",
  "Красносельский",
  "Кронштадтский",
  "Курортный",
  "Московский",
  "Невский",
  "Петроградский",
  "Петродворцовый",
  "Приморский",
  "Пушкинский",
  "Фрунзенский",
  "Центральный",
] as const;
export const PET_TRAITS = [
  "Игривый",
  "Любит мяч",
  "Мастер сна",
  "Модник",
  "Бегун",
  "Дружелюбный",
] as const;

const PET_META_PATTERN = /<!--corgi-pet-meta:([\s\S]*?)-->$/;

export interface PetMeta {
  age?: string;
  district?: string;
  traits?: string[];
  gallery?: string[];
}

export interface PetDocument {
  $id: string;
  $createdAt?: string;
  user_id: string;
  name: string;
  breed?: string;
  gender?: string;
  birth_date?: string;
  color?: string;
  weight?: number;
  description?: string;
  photo_url?: string;
  is_public?: boolean;
}

export interface PetRecord {
  id: string;
  createdAt?: string;
  ownerId: string;
  name: string;
  breed: string;
  description: string;
  mainPhotoUrl: string | null;
  gallery: string[];
  age?: string;
  district?: string;
  traits: string[];
  isPublic: boolean;
}

function uniqueStrings(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

export function serializePetDescription(description: string, meta: PetMeta) {
  const cleanDescription = description.trim();
  const hasMeta =
    Boolean(meta.age) ||
    Boolean(meta.district) ||
    Boolean(meta.traits?.length) ||
    Boolean(meta.gallery?.length);

  if (!hasMeta) {
    return cleanDescription;
  }

  const payload = encodeURIComponent(
    JSON.stringify({
      age: meta.age?.trim() || undefined,
      district: meta.district?.trim() || undefined,
      traits: meta.traits?.filter(Boolean) || [],
      gallery: uniqueStrings(meta.gallery || []),
    }),
  );

  return `${cleanDescription}${cleanDescription ? "\n\n" : ""}<!--corgi-pet-meta:${payload}-->`;
}

export function parsePetDescription(rawDescription?: string | null) {
  const source = rawDescription || "";
  const match = source.match(PET_META_PATTERN);

  if (!match) {
    return {
      description: source.trim(),
      meta: {} as PetMeta,
    };
  }

  try {
    const meta = JSON.parse(decodeURIComponent(match[1])) as PetMeta;
    return {
      description: source.replace(PET_META_PATTERN, "").trim(),
      meta: {
        age: meta.age?.trim(),
        district: meta.district?.trim(),
        traits: meta.traits?.filter(Boolean) || [],
        gallery: uniqueStrings(meta.gallery || []),
      },
    };
  } catch {
    return {
      description: source.replace(PET_META_PATTERN, "").trim(),
      meta: {} as PetMeta,
    };
  }
}

export function mapPetDocument(document: PetDocument): PetRecord {
  const parsed = parsePetDescription(document.description);
  const gallery = uniqueStrings([document.photo_url, ...(parsed.meta.gallery || [])]);

  return {
    id: document.$id,
    createdAt: document.$createdAt,
    ownerId: document.user_id,
    name: document.name,
    breed: document.breed?.trim() || "Пемброк",
    description: parsed.description,
    mainPhotoUrl: gallery[0] || null,
    gallery,
    age: parsed.meta.age || document.birth_date?.trim() || undefined,
    district: parsed.meta.district || undefined,
    traits: parsed.meta.traits || [],
    isPublic: document.is_public !== false,
  };
}
