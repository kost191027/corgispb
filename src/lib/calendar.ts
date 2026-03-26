export const CALENDAR_EVENT_TYPES = [
  "Прогулка",
  "Ветеринар",
  "Уход",
  "Питание",
  "Игры",
  "Покупки",
] as const;

export const CALENDAR_EVENT_TYPE_STYLES: Record<string, string> = {
  "Прогулка": "bg-orange-100 text-orange-800",
  "Ветеринар": "bg-rose-100 text-rose-700",
  "Уход": "bg-amber-100 text-amber-800",
  "Питание": "bg-lime-100 text-lime-800",
  "Игры": "bg-teal-100 text-teal-800",
  "Покупки": "bg-sky-100 text-sky-800",
};

const CALENDAR_META_PATTERN = /<!--corgi-calendar-meta:([\s\S]*?)-->$/;

export interface CalendarEventDocument {
  $id: string;
  $createdAt?: string;
  user_id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  type?: string;
  source?: string;
  source_id?: string;
}

export interface CalendarEventRecord {
  id: string;
  createdAt?: string;
  userId: string;
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  type?: string;
  source?: string;
  sourceId?: string;
  remindEnabled: boolean;
}

function parseCalendarDescription(rawDescription?: string | null) {
  const source = rawDescription || "";
  const match = source.match(CALENDAR_META_PATTERN);

  if (!match) {
    return {
      description: source.trim(),
      remindEnabled: false,
    };
  }

  try {
    const meta = JSON.parse(decodeURIComponent(match[1])) as { remindEnabled?: boolean };
    return {
      description: source.replace(CALENDAR_META_PATTERN, "").trim(),
      remindEnabled: Boolean(meta.remindEnabled),
    };
  } catch {
    return {
      description: source.replace(CALENDAR_META_PATTERN, "").trim(),
      remindEnabled: false,
    };
  }
}

export function serializeCalendarDescription(description: string, options?: { remindEnabled?: boolean }) {
  const cleanDescription = description.trim();

  if (!options?.remindEnabled) {
    return cleanDescription;
  }

  const payload = encodeURIComponent(JSON.stringify({ remindEnabled: true }));
  return `${cleanDescription}${cleanDescription ? "\n\n" : ""}<!--corgi-calendar-meta:${payload}-->`;
}

export function mapCalendarEvent(document: CalendarEventDocument): CalendarEventRecord {
  const parsed = parseCalendarDescription(document.description);

  return {
    id: document.$id,
    createdAt: document.$createdAt,
    userId: document.user_id,
    title: document.title,
    description: parsed.description,
    eventDate: document.event_date,
    location: document.location?.trim() || undefined,
    type: document.type?.trim() || undefined,
    source: document.source?.trim() || undefined,
    sourceId: document.source_id?.trim() || undefined,
    remindEnabled: parsed.remindEnabled,
  };
}
