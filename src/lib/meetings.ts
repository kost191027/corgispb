import type { MapMarker } from "@/components/map/YandexMap";

export type MeetingRecord = {
  id: string;
  title: string;
  district: string;
  type: string;
  location: string;
  eventDate: string;
  dateLabel: string;
  timeLabel: string;
  participants: number;
  capacityLabel: string;
  description: string;
  imageUrl: string;
  coordinates: [number, number];
  accent: "orange" | "teal" | "green";
};

export const MEETINGS: MeetingRecord[] = [
  {
    id: "meeting-park-300",
    title: "Корги-забег в парке 300-летия",
    district: "Приморский",
    type: "Прогулка",
    location: "Парк 300-летия",
    eventDate: "2026-06-15T12:00",
    dateLabel: "15 июня",
    timeLabel: "12:00",
    participants: 42,
    capacityLabel: "Мест: много",
    description:
      "Традиционный летний забег на коротких лапках: фотограф, призы участникам и длинная прогулка у залива.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdybnthR7L5akZsj_bzfQa2-b6ABhTsY0j0wd-pg5byWErOq5kE6Iplfc6-r7K1f31v8UBAbOR_Av5YoN7ODDcIubtD0IWe6vVUBDRKZxW6UEp31Kp9yk5WhPj6AslV8u3A-W5QqM3R1zCnQxHV9C6R3Wf3DDHpI-Z1PdRA1tSnA1lPpI1V4QcL9M6p8G6txFipg3BB86cMZQ8Xo27D6tE7QclvvQf3r2rQ3Yt5J6r78oDhO7o78cDdzZmbmI0nY7lud8qgD6d",
    coordinates: [30.2146, 59.9722],
    accent: "orange",
  },
  {
    id: "meeting-mars-field",
    title: "Занятие с кинологом: Рядом!",
    district: "Центральный",
    type: "Уход",
    location: "Марсово поле",
    eventDate: "2026-06-18T18:30",
    dateLabel: "18 июня",
    timeLabel: "18:30",
    participants: 18,
    capacityLabel: "Осталось 6 мест",
    description:
      "Практическое занятие с кинологом: поводок, контакт и спокойствие в центре города.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCS4FGXFPm-B6JnSMSWHPp6SuHYWo5zgbV8pV0Ks3dUeykStfgWQBTdP3kOz5SslDgghwNBcLrW092hIfZAVFNyloTHZu6HIQdKi_k7s-Kcfg0G038PQWIqZxuF-pBDcgqdmUiEoltLeNlx5VUb0NwVZGdsybvuFTnuRY_jjwzdHNWUZ5qV-EO2eBpU1GToACQBFdsD2FZEESZsrogp-7KmhqY9KZtMIeROw_2i05AkEIszopKtnwV2tHh8O4fzETVegQ6P4DPH5eQ",
    coordinates: [30.3312, 59.9435],
    accent: "teal",
  },
  {
    id: "meeting-yusupov",
    title: "Корги-пикник: Начало лета",
    district: "Адмиралтейский",
    type: "Пикник",
    location: "Юсуповский сад",
    eventDate: "2026-06-22T14:00",
    dateLabel: "22 июня",
    timeLabel: "14:00",
    participants: 26,
    capacityLabel: "Мест: много",
    description:
      "Пледы, фотозона и неспешный день в саду: можно прийти всей корги-семьей.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdBHgdTvd-o0nb5XDFfydbsDpMaae2UkzhBMsJGVPltW_t5Vksl8LkS_XJnFutr5y0ce4_JffFnEVNh4M4sCpMVkVHdLQG8mSroc8DxSo4r3URXE7R_jrIlXFFwtTxkHEsfbyH5qrE0FhPdfmVIyyz8X6pdVSfWhlFh5vLKOfe32c7pVxn3Ic7BnfDo-jgvs4Sl2FFFglLUxVacKuSJmhmyotFzdHyAS_slynUXzXixQXZjcXzhUdKFnt9tROlodDTPyloP0zvxe0",
    coordinates: [30.2987, 59.9278],
    accent: "green",
  },
  {
    id: "meeting-krestovsky",
    title: "Утренняя прогулка у Елагина острова",
    district: "Петроградский",
    type: "Прогулка",
    location: "ЦПКиО",
    eventDate: "2026-06-29T09:30",
    dateLabel: "29 июня",
    timeLabel: "09:30",
    participants: 15,
    capacityLabel: "Камерная группа",
    description:
      "Спокойный маршрут без перегруза: идеально для щенков и новичков сообщества.",
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    coordinates: [30.2609, 59.9814],
    accent: "teal",
  },
];

export const MEETING_DISTRICTS = [
  "Все районы",
  ...Array.from(new Set(MEETINGS.map((meeting) => meeting.district))),
];

export const MEETING_TYPES = [
  "Все",
  ...Array.from(new Set(MEETINGS.map((meeting) => meeting.type))),
];

export function getMeetingAccentClasses(accent: MeetingRecord["accent"]) {
  switch (accent) {
    case "teal":
      return {
        border: "border-l-tertiary",
        badge: "bg-tertiary/10 text-tertiary",
      };
    case "green":
      return {
        border: "border-l-green-600",
        badge: "bg-green-100 text-green-800",
      };
    default:
      return {
        border: "border-l-primary",
        badge: "bg-primary/10 text-primary",
      };
  }
}

export function toMeetingMapMarker(meeting: MeetingRecord): MapMarker {
  return {
    id: meeting.id,
    coordinates: meeting.coordinates,
    title: meeting.title,
    badge: meeting.type,
    subtitle: `${meeting.dateLabel}, ${meeting.timeLabel}`,
    color: meeting.accent,
  };
}
