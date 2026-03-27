"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { SaveMeetingButton } from "@/components/cabinet/SaveMeetingButton";
import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import type { MapMarker } from "@/components/map/YandexMap";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";

type MeetingRecord = {
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

const MEETINGS: MeetingRecord[] = [
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
    description: "Традиционный летний забег на коротких лапках: фотограф, призы участникам и длинная прогулка у залива.",
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
    description: "Практическое занятие с кинологом: поводок, контакт и спокойствие в центре города.",
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
    description: "Пледы, фотозона и неспешный день в саду: можно прийти всей корги-семьей.",
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
    description: "Спокойный маршрут без перегруза: идеально для щенков и новичков сообщества.",
    imageUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    coordinates: [30.2609, 59.9814],
    accent: "teal",
  },
];

const DISTRICTS = ["Все районы", ...Array.from(new Set(MEETINGS.map((meeting) => meeting.district)))];
const TYPES = ["Все", ...Array.from(new Set(MEETINGS.map((meeting) => meeting.type)))];

function getAccentClasses(accent: MeetingRecord["accent"]) {
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

export function MeetingsPageClient() {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Все районы");
  const [selectedType, setSelectedType] = useState("Все");
  const deferredSearch = useDeferredValue(search);

  const filteredMeetings = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return MEETINGS.filter((meeting) => {
      const matchesSearch =
        query.length === 0 ||
        [meeting.title, meeting.location, meeting.description, meeting.district]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesDistrict = selectedDistrict === "Все районы" || meeting.district === selectedDistrict;
      const matchesType = selectedType === "Все" || meeting.type === selectedType;

      return matchesSearch && matchesDistrict && matchesType;
    }).sort((a, b) => a.eventDate.localeCompare(b.eventDate));
  }, [deferredSearch, selectedDistrict, selectedType]);

  const featuredMeeting = filteredMeetings[0] ?? null;
  const secondaryMeetings = filteredMeetings.slice(1);

  const markers = useMemo<MapMarker[]>(
    () =>
      filteredMeetings.map((meeting) => ({
        id: meeting.id,
        coordinates: meeting.coordinates,
        title: meeting.title,
        subtitle: `${meeting.dateLabel}, ${meeting.timeLabel}`,
        color: meeting.accent,
      })),
    [filteredMeetings],
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedDistrict("Все районы");
    setSelectedType("Все");
  };

  return (
    <main className="pt-24 pb-32">
      <section className="mx-auto mb-16 max-w-7xl px-6">
        <div className="relative flex min-h-[500px] items-end overflow-hidden rounded-xl p-8 md:p-16">
          <div className="absolute inset-0 z-0">
            <img
              alt="Happy corgi running in a green park in Saint Petersburg"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fNsE7YgTpsjV0d3oCzXb2BR2xs_QohM8o8eAv40GoTPwnJt93gTQ6m_ydf9Q6wbBB-hAPiOC62ZO3AGSiLJc3zcIU9bsCgjBazSmjSlzcv8OKaXjcKJZdsdn0F0FIfDJm3shCFpwKeBRY5nwp0skexR1LKilcQ7bDe4Ft4uMNOHwzX-ZwGAvfwJ6q3k3yv0FDbg3R9f4d1YNbJaxv18AsP8_oz2upL5j2Q2EypcgFtcDZ4USuLQwUoUIBgvE20USLd3V2ANSqEs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 w-full text-white md:max-w-2xl">
            <h1 className="mb-6 font-headline text-4xl font-extrabold leading-tight text-white md:text-6xl">
              События и встречи
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Фильтруйте прогулки, пикники и практические встречи по району, чтобы быстро находить своих рядом.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
                {filteredMeetings.length} событий по текущим фильтрам
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">Связано с картой внизу</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-12 max-w-7xl px-6">
        <div className="rounded-xl border-none bg-surface-container-low p-6 shadow-sm md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <label className="mb-2 block pl-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Поиск
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-full bg-surface-container-lowest px-6 py-3 text-sm text-on-surface transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/40"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Название, место, описание..."
                  type="text"
                  value={search}
                />
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
                  search
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block pl-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Район
              </label>
              <div className="relative">
                <select
                  className={`${APP_SELECT_CLASS} cursor-pointer bg-surface-container-lowest py-3 text-sm`}
                  onChange={(event) => setSelectedDistrict(event.target.value)}
                  value={selectedDistrict}
                >
                  {DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <span className={APP_SELECT_ICON_WRAPPER_CLASS}>
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block pl-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Тип встречи
              </label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((type) => {
                  const isActive = selectedType === type;

                  return (
                    <button
                      key={type}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-highest text-on-surface-variant hover:bg-primary-fixed-dim"
                      }`}
                      onClick={() => setSelectedType(type)}
                      type="button"
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-end">
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full bg-tertiary-container py-3 text-sm font-bold text-on-tertiary-container transition-all active:scale-95 hover:bg-tertiary hover:text-white"
                onClick={clearFilters}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6 font-body">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-tight text-primary">Предстоящие</span>
            <h2 className="text-3xl font-extrabold text-on-surface">Ближайшие встречи</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant md:block">
            Карточки и карта показывают один и тот же отфильтрованный набор.
          </p>
        </div>

        {!featuredMeeting ? (
          <div className="rounded-[2rem] border border-dashed border-outline-variant/40 bg-surface-container-low px-8 py-16 text-center">
            <h3 className="mb-3 text-2xl font-black text-on-surface">Ничего не нашли по этим фильтрам</h3>
            <p className="mx-auto mb-6 max-w-xl text-on-surface-variant">
              Попробуйте убрать район, сменить тип встречи или очистить поиск. Самые свежие прогулки сразу вернутся в ленту.
            </p>
            <button
              className="rounded-full bg-primary px-6 py-3 font-bold text-on-primary transition-transform hover:scale-[1.02]"
              onClick={clearFilters}
              type="button"
            >
              Показать все события
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <article className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl md:col-span-7">
              <div className="relative h-64 shrink-0 overflow-hidden md:h-80">
                <img
                  alt={featuredMeeting.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  crossOrigin="anonymous"
                  src={featuredMeeting.imageUrl}
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary">
                    {featuredMeeting.dateLabel}
                  </span>
                  <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-800">
                    {featuredMeeting.capacityLabel}
                  </span>
                  <span className="rounded-full bg-surface-container px-4 py-1.5 text-xs font-bold text-on-surface-variant">
                    {featuredMeeting.type}
                  </span>
                </div>
                <h3 className="mb-4 text-3xl font-black leading-tight text-on-surface">{featuredMeeting.title}</h3>
                <div className="mb-6 flex flex-wrap gap-4 text-sm font-medium text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-primary">location_on</span>
                    {featuredMeeting.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-primary">schedule</span>
                    {featuredMeeting.timeLabel}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-primary">group</span>
                    {featuredMeeting.participants} участника
                  </div>
                </div>
                <p className="mt-2 flex-1 text-on-surface-variant">{featuredMeeting.description}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <button
                    className="rounded-full bg-primary py-4 font-bold text-on-primary transition-colors active:scale-95 hover:bg-primary-container hover:text-on-primary-container"
                    type="button"
                  >
                    Я пойду
                  </button>
                  <SaveMeetingButton
                    className="w-full rounded-full bg-white py-4 font-bold text-primary transition-colors hover:bg-primary-fixed"
                    event={{
                      id: featuredMeeting.id,
                      title: featuredMeeting.title,
                      eventDate: featuredMeeting.eventDate,
                      location: featuredMeeting.location,
                      type: featuredMeeting.type,
                      description: featuredMeeting.description,
                    }}
                  />
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-6 md:col-span-5">
              {secondaryMeetings.map((meeting) => {
                const accent = getAccentClasses(meeting.accent);

                return (
                  <article
                    key={meeting.id}
                    className={`group cursor-pointer rounded-xl border-l-4 bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-lg ${accent.border}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                        <img
                          alt={meeting.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          crossOrigin="anonymous"
                          src={meeting.imageUrl}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${accent.badge}`}>
                            {meeting.type}
                          </span>
                          <span className="text-xs font-bold text-on-surface-variant">{meeting.dateLabel}</span>
                        </div>
                        <h3 className="mb-2 text-lg font-extrabold leading-tight text-on-surface transition-colors group-hover:text-primary">
                          {meeting.title}
                        </h3>
                        <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                          {meeting.location}
                        </p>
                        <div className="flex items-center justify-between gap-4">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            {meeting.timeLabel}
                          </span>
                          <SaveMeetingButton
                            className="text-sm font-bold text-tertiary transition-colors hover:text-tertiary-container"
                            event={{
                              id: meeting.id,
                              title: meeting.title,
                              eventDate: meeting.eventDate,
                              location: meeting.location,
                              type: meeting.type,
                              description: meeting.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-xl bg-gradient-to-br from-tertiary to-teal-800 p-8 text-white shadow-lg">
                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-bold">Больше встреч в Telegram</h3>
                  <p className="mb-6 max-w-[220px] text-sm leading-relaxed text-white/90">
                    Спонтанные прогулки и срочные сборы публикуем в чате раньше всего.
                  </p>
                  <a
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-tertiary transition-all hover:bg-tertiary-container hover:text-on-tertiary-container"
                    href="#"
                  >
                    Присоединиться
                  </a>
                </div>
                <span
                  className="material-symbols-outlined pointer-events-none absolute -bottom-6 -right-6 text-9xl text-white/10"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat_bubble
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6 font-body">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-on-surface">Карта встреч</h2>
          <p className="mx-auto max-w-xl text-lg text-on-surface-variant">
            Выбранные фильтры сразу отражаются на карте. Так проще понять, где сейчас самая живая корги-активность.
          </p>
        </div>

        <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-outline-variant/20">
          <ClientYandexMap
            center={[30.3158, 59.9391]}
            enableClustering
            loadingLabel="Подгружаем карту ближайших встреч..."
            markers={markers}
            zoom={10.8}
          />
        </div>
      </section>
    </main>
  );
}
