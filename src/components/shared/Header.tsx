"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CurrentUserProfile } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";

const routes = {
  about: [
    { title: "Гид «Как выбрать щенка»", href: "/about/how-to-choose" },
    { title: "О породе", href: "/about" },
    { title: "Здоровье", href: "/about/health" },
  ],
  community: [
    { title: "Карта прогулок", href: "/community/map" },
    { title: "Форум", href: "/community/forum" },
    { title: "Владельцы", href: "/owners" },
    { title: "Наши любимцы", href: "/pets" },
  ],
  services: [
    { title: "Потеряшки (SOS)", href: "/sos" },
    { title: "Калькулятор расходов", href: "/calculator" },
    { title: "Заводчики", href: "/breeders" },
  ],
};

type HeaderNotification = {
  id: string;
  title: string;
  eventDate: string;
  type?: string;
};

type HeaderProps = {
  user: CurrentUserProfile | null;
  notifications?: HeaderNotification[];
  isLoadingUser?: boolean;
};

function formatNotificationTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function Header({ user, notifications, isLoadingUser = false }: HeaderProps) {
  const router = useRouter();
  const profileName = user?.name?.trim() || user?.email?.split("@")[0] || "Кабинет";
  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() ?? "К";
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [activeNotifications, setActiveNotifications] = React.useState(notifications || []);
  const notificationsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const routesToPrefetch = [
      "/",
      "/about",
      "/about/how-to-choose",
      "/about/health",
      "/community",
      "/community/map",
      "/community/forum",
      "/owners",
      "/pets",
      "/sos",
      "/calculator",
      "/breeders",
      user ? "/cabinet" : "/login",
    ];

    const uniqueRoutes = Array.from(new Set(routesToPrefetch));
    const prefetch = () => {
      uniqueRoutes.forEach((href) => router.prefetch(href));
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetch);
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(prefetch, 250);
    return () => globalThis.clearTimeout(timeoutId);
  }, [router, user]);

  React.useEffect(() => {
    setActiveNotifications(notifications || []);
  }, [notifications]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    let isMounted = true;

    async function refreshNotifications() {
      try {
        const response = await fetch("/api/notifications", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { notifications?: HeaderNotification[] };

        if (isMounted) {
          setActiveNotifications(data.notifications || []);
        }
      } catch (error) {
        console.error("Notifications refresh failed", error);
      }
    }

    refreshNotifications();
    const intervalId = window.setInterval(refreshNotifications, 60_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [user]);

  React.useEffect(() => {
    if (!isNotificationsOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isNotificationsOpen]);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(55,47,45,0.06)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-black text-orange-700 italic font-display tracking-tighter hover:scale-105 transition-transform">
          Корги СПб
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <div className="relative group">
            <Link href="/about" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              О породе
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.about.map((item) => (
                  <Link key={item.href} href={item.href} className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link href="/community" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              Комьюнити
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.community.map((item) => (
                  <Link key={item.href} href={item.href} className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <Link href="/services" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              Сервисы
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.services.map((item) => (
                  <Link key={item.href} href={item.href} className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/sos">SOS</Link>
          </Button>

          <div className="relative hidden sm:block" ref={notificationsRef}>
            <button
              className="relative p-2 text-stone-500 hover:bg-orange-50 rounded-full transition-all duration-300 active:scale-95"
              onClick={() => setIsNotificationsOpen((current) => !current)}
              type="button"
            >
              <span className="material-symbols-outlined">notifications</span>
              {activeNotifications.length ? <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" /> : null}
            </button>
            {isNotificationsOpen ? (
              <div className="absolute top-full right-0 mt-2 w-[320px] rounded-2xl bg-white shadow-2xl border border-stone-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-stone-100">
                  <p className="text-sm font-bold text-stone-900">Уведомления</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {activeNotifications.length ? "Напоминания за час до события" : "Пока все спокойно"}
                  </p>
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  {activeNotifications.length ? (
                    activeNotifications.map((notification) => (
                      <div className="px-5 py-4 border-b border-stone-100 last:border-b-0" key={notification.id}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-stone-900 truncate">{notification.title}</p>
                            <p className="text-xs text-stone-500 mt-1">{formatNotificationTime(notification.eventDate)}</p>
                            {notification.type ? <p className="text-xs text-primary mt-1">{notification.type}</p> : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-6 text-sm text-stone-500">Напоминаний на ближайший час нет.</div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {isLoadingUser ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-surface-container-high md:w-[148px]" />
          ) : user ? (
            <div className="relative group">
              <Link href="/cabinet" className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-surface-container-high rounded-full hover:bg-orange-100 transition-all active:scale-95">
                {user.avatarUrl ? (
                  <img alt={user.name} className="h-8 w-8 rounded-full object-cover" src={user.avatarUrl} />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-black text-white">
                    {userInitial}
                  </span>
                )}
                <span className="max-w-[132px] truncate text-sm font-bold font-display text-stone-800">{profileName}</span>
              </Link>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-56 translate-y-2 group-hover:translate-y-0">
                <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                  <div className="px-6 py-3 border-b border-stone-100">
                    <p className="text-sm font-bold text-stone-900 truncate">{profileName}</p>
                    {user.email ? <p className="text-xs text-stone-500 truncate mt-0.5">{user.email}</p> : null}
                  </div>
                  <Link href="/cabinet" className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span> Профиль
                  </Link>
                  <Link href="/cabinet#my-pets" className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">pets</span> Мои корги
                  </Link>
                  <div className="border-t border-stone-100 my-1"></div>
                  <form action={signOut}>
                    <button type="submit" className="w-full text-left px-6 py-3 text-sm font-semibold text-error hover:bg-red-50 transition-colors flex items-center gap-2 outline-none">
                      <span className="material-symbols-outlined text-sm">logout</span> Выход
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Button size="sm" className="rounded-full font-bold px-6" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
