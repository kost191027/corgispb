"use client";

import * as React from "react";
import Link from "next/link";
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
    { title: "Наши любимцы", href: "/pets" },
  ],
  services: [
    { title: "Потеряшки (SOS)", href: "/sos" },
    { title: "Калькулятор расходов", href: "/calculator" },
    { title: "Заводчики", href: "/breeders" },
  ],
};

type AppwriteUser = { name?: string; email?: string } | null;

export function Header({ user }: { user: AppwriteUser }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(55,47,45,0.06)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-black text-orange-700 italic font-display tracking-tighter hover:scale-105 transition-transform">
          Корги СПб
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {/* О породе */}
          <div className="relative group">
            <Link href="/about" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              О породе
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.about.map(item => (
                  <Link key={item.href} href={item.href} className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Комьюнити */}
          <div className="relative group">
            <Link href="/community" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              Комьюнити
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.community.map(item => (
                  <Link key={item.href} href={item.href} className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Сервисы */}
          <div className="relative group">
            <Link href="/services" className="flex items-center gap-1 text-stone-600 hover:text-orange-600 font-display font-bold text-sm tracking-tight px-4 py-2 hover:bg-orange-50 rounded-full transition-all active:scale-95">
              Сервисы
              <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                {routes.services.map(item => (
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
          
          <button className="p-2 text-stone-500 hover:bg-orange-50 rounded-full transition-all duration-300 active:scale-95 hidden sm:block">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          {user ? (
            <div className="relative group">
              <Link href="/cabinet" className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-surface-container-high rounded-full hover:bg-orange-100 transition-all active:scale-95">
                <span className="material-symbols-outlined text-primary">account_circle</span>
                <span className="text-sm font-bold font-display text-stone-800">Кабинет</span>
              </Link>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-56 translate-y-2 group-hover:translate-y-0">
                <div className="bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col py-2">
                  <Link href="/cabinet" className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span> Профиль
                  </Link>
                  <Link href="/cabinet/pets" className="px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center gap-2">
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
