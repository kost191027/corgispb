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
}

export function mapCalendarEvent(document: CalendarEventDocument): CalendarEventRecord {
  return {
    id: document.$id,
    createdAt: document.$createdAt,
    userId: document.user_id,
    title: document.title,
    description: document.description?.trim() || "",
    eventDate: document.event_date,
    location: document.location?.trim() || undefined,
    type: document.type?.trim() || undefined,
    source: document.source?.trim() || undefined,
    sourceId: document.source_id?.trim() || undefined,
  };
}
