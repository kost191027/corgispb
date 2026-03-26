"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCalendarEvent } from "@/actions/calendar";
import { CalendarEventModal } from "@/components/cabinet/CalendarEventModal";
import { ProfileEditModal } from "@/components/cabinet/ProfileEditModal";
import AddPetModal from "@/components/shared/AddPetModal";
import { CALENDAR_EVENT_TYPE_STYLES } from "@/lib/calendar";
import type { CalendarEventRecord } from "@/lib/calendar";
import { formatPetAge, type PetRecord } from "@/lib/pets";

interface CabinetPageClientProps {
  pets: PetRecord[];
  calendarEvents: CalendarEventRecord[];
  user: {
    id: string;
    name: string;
    email: string;
    city?: string;
    district?: string;
    avatarUrl?: string;
    bio?: string;
  };
}

function UserAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={`Аватар пользователя ${name}`}
        className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl"
        src={avatarUrl}
      />
    );
  }

  return (
    <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-primary">
      <span className="text-4xl md:text-6xl font-black font-headline">{name.trim().charAt(0).toUpperCase() || "К"}</span>
    </div>
  );
}

function formatCalendarLabel(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function CabinetPageClient({ pets, calendarEvents, user }: CabinetPageClientProps) {
  const router = useRouter();
  const [isAddPetModalOpen, setIsAddPetModalOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = React.useState(false);
  const [shareMessage, setShareMessage] = React.useState("");
  const [calendarTooltip, setCalendarTooltip] = React.useState("");

  React.useEffect(() => {
    if (!shareMessage) {
      return;
    }

    const timer = window.setTimeout(() => setShareMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [shareMessage]);

  React.useEffect(() => {
    if (!calendarTooltip) {
      return;
    }

    const timer = window.setTimeout(() => setCalendarTooltip(""), 2200);
    return () => window.clearTimeout(timer);
  }, [calendarTooltip]);

  async function handleShareProfile() {
    const shareUrl = `${window.location.origin}/owners/${user.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Профиль ${user.name} — Корги СПб`,
          text: "Публичная карточка владельца и его корги",
          url: shareUrl,
        });
        setShareMessage("Ссылка готова к отправке.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Ссылка на публичный профиль скопирована.");
    } catch (error) {
      console.error("Profile share failed", error);
      setShareMessage("Не удалось поделиться ссылкой.");
    }
  }

  async function handleDeleteCalendarEvent(eventId: string) {
    setCalendarTooltip("");

    try {
      const formData = new FormData();
      formData.append("eventId", eventId);
      const result = await deleteCalendarEvent(formData);
      setCalendarTooltip(result.message);
      if (result.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Calendar delete failed", error);
      setCalendarTooltip("Не удалось удалить событие.");
    }
  }

  const upcomingEvents = calendarEvents.filter((event) => {
    const eventTime = new Date(event.eventDate).getTime();
    return Number.isNaN(eventTime) || eventTime >= Date.now() - 1000 * 60 * 60 * 24;
  });

  return (
    <>
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto font-body">
        <section className="relative mb-12">
          <div className="bg-surface-container-low rounded-xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 border-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-container blur-2xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity" />
              <UserAvatar avatarUrl={user.avatarUrl} name={user.name} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black font-headline text-on-surface mb-2 tracking-tight">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-tertiary mb-4">
                <span className="inline-flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-base">mail</span>
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  {user.city || "Санкт-Петербург"}
                </span>
                {user.district ? (
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span className="material-symbols-outlined text-base">pin_drop</span>
                    {user.district}
                  </span>
                ) : null}
              </div>
              <p className="text-on-surface-variant max-w-2xl mb-6">
                {user.bio || "Здесь живут ваши корги, заметки о характере и любимые маршруты прогулок по Петербургу."}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                  onClick={() => setIsEditProfileOpen(true)}
                >
                  Редактировать
                </button>
                <button
                  className="bg-white text-primary border border-primary/20 px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-all"
                  onClick={handleShareProfile}
                >
                  Поделиться профилем
                </button>
              </div>
              {shareMessage ? <p className="mt-4 text-sm font-medium text-tertiary">{shareMessage}</p> : null}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex justify-between items-end px-2 gap-4">
              <div>
                <h2 className="text-2xl font-black font-headline text-on-surface">Мои корги</h2>
                <p className="text-on-surface-variant">
                  {pets.length ? `Хвостика в семье: ${pets.length}` : "Пора добавить первого хвостика"}
                </p>
              </div>
              <button
                className="flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors active:scale-95"
                onClick={() => setIsAddPetModalOpen(true)}
              >
                <span className="material-symbols-outlined text-xl">add_circle</span>
                Добавить питомца
              </button>
            </div>

            {pets.length ? (
              <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
                {pets.map((pet) => (
                  <Link
                    className="min-w-[300px] md:min-w-[340px] snap-start bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group border-none cursor-pointer"
                    href={`/pets/${pet.id}`}
                    key={pet.id}
                    scroll={false}
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-surface-container-high">
                      {pet.mainPhotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt={`Корги ${pet.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={pet.mainPhotoUrl} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-outline">
                          <span className="material-symbols-outlined text-5xl">pets</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {pet.breed}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-1">{pet.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-3">
                      {formatPetAge(pet.age) ? `${formatPetAge(pet.age)} • ` : ""}
                      {pet.district || "Район прогулок пока не указан"}
                    </p>
                    <p className="text-sm text-tertiary font-medium bg-tertiary/5 p-3 rounded-lg italic min-h-[88px]">
                      {pet.description || "Хозяин скоро допишет историю о характере и привычках этого корги."}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] bg-surface-container-lowest p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10">
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    pets
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black font-headline mb-2">Профиль почти готов</h3>
                  <p className="text-on-surface-variant mb-5">
                    Добавьте первого корги в кабинет. Фото, район прогулок и характер сразу пригодятся для галереи и будущих карточек знакомств.
                  </p>
                  <button
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                    onClick={() => setIsAddPetModalOpen(true)}
                  >
                    Добавить первого питомца
                  </button>
                </div>
              </div>
            )}

            <div className="bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden mt-2 border-none">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  pets
                </span>
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-80 tracking-widest leading-loose">Статус профиля</p>
                    <h4 className="text-xl font-bold font-headline leading-tight">{pets.length ? "Профиль активен" : "Ждем первого корги"}</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black font-headline">{pets.length}</span>
                  <span className="text-sm opacity-80 pt-1">Питомцев в кабинете</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black font-headline">{pets.reduce((count, pet) => count + pet.gallery.length, 0)}</span>
                  <span className="text-sm opacity-80 pt-1">Фотографий в галереях</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff4ee] via-white to-[#eef8f7] p-6 shadow-[0_30px_60px_rgba(55,47,45,0.08)] border border-white/80">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-tertiary/10 blur-2xl" />

              {calendarTooltip ? (
                <div className="absolute right-6 top-6 z-20 rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-xl">
                  {calendarTooltip}
                </div>
              ) : null}

              <div className="relative z-10 flex items-center justify-between mb-6 gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary mb-2">Мой ритм</p>
                  <h2 className="text-2xl font-black font-headline text-on-surface">Календарь ухода</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Личные события и встречи, сохраненные с сайта.</p>
                </div>
                <button
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white transition-colors active:scale-95"
                  onClick={() => setIsAddEventOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>

              {upcomingEvents.length ? (
                <div className="relative z-10 max-h-[37.5rem] space-y-4 overflow-y-auto pr-2">
                  {upcomingEvents.map((event) => (
                    <div className="rounded-[1.5rem] bg-white/92 backdrop-blur-md p-5 shadow-[0_18px_30px_rgba(55,47,45,0.07)]" key={event.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          {event.type ? (
                            <span className={`inline-flex mb-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${CALENDAR_EVENT_TYPE_STYLES[event.type] || "bg-surface-container-high text-on-surface-variant"}`}>
                              {event.type}
                            </span>
                          ) : null}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-black font-headline text-lg text-on-surface">{event.title}</h4>
                            {event.remindEnabled ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">
                                <span className="material-symbols-outlined text-sm">notifications_active</span>
                                Напомнить
                              </span>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant font-medium">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                              {formatCalendarLabel(event.eventDate)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                              {event.location || "Без указания места"}
                            </span>
                          </div>
                          {event.description ? <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{event.description}</p> : null}
                        </div>
                        <button
                          className="mt-1 h-9 w-9 shrink-0 rounded-full bg-surface-container-high text-outline hover:text-error hover:bg-error-container transition-colors"
                          onClick={() => handleDeleteCalendarEvent(event.id)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative z-10 rounded-[1.75rem] bg-white/92 p-7 text-center shadow-[0_18px_30px_rgba(55,47,45,0.07)]">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">event_available</span>
                  </div>
                  <h3 className="font-black font-headline text-xl text-on-surface mb-2">Пока пусто</h3>
                  <p className="text-sm text-on-surface-variant mb-5">
                    Добавьте свое напоминание или сохраните событие со страницы встреч. Здесь будет ваш персональный ритм прогулок, ухода и покупок.
                  </p>
                  <button
                    className="w-full py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary-container transition-colors"
                    onClick={() => setIsAddEventOpen(true)}
                    type="button"
                  >
                    Создать событие
                  </button>
                </div>
              )}

              <div className="relative z-10 mt-5 flex items-center justify-between rounded-[1.25rem] bg-white/75 px-4 py-3 text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  События с портала тоже можно добавлять сюда
                </div>
                <Link className="font-bold text-primary hover:underline" href="/meetings">
                  Ко встречам
                </Link>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-6 border-none">
              <h2 className="text-xl font-black font-headline mb-4">Сообщества</h2>
              <div className="space-y-3">
                <a className="block p-3 rounded-lg hover:bg-white transition-colors group" href="#">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-tertiary text-white rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">groups</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">Петроградские корги</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Районная группа • 42 участника</p>
                    </div>
                  </div>
                </a>
                <a className="block p-3 rounded-lg hover:bg-white transition-colors group" href="#">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">forum</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">Лучший корм для щенков</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Активно сейчас: 12 ответов</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddPetModal isOpen={isAddPetModalOpen} onClose={() => setIsAddPetModalOpen(false)} />
      <ProfileEditModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} user={{ name: user.name, email: user.email, city: user.city, district: user.district, bio: user.bio, avatarUrl: user.avatarUrl }} />
      <CalendarEventModal isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} />
    </>
  );
}
