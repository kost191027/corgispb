"use client";

import Link from "next/link";
import React from "react";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";
import { PET_DISTRICTS } from "@/lib/pets";
import type { OwnerProfileRecord } from "@/lib/owners";

interface OwnersGalleryClientProps {
  owners: OwnerProfileRecord[];
}

function OwnerAvatar({ owner, size = "lg" }: { owner: OwnerProfileRecord; size?: "lg" | "xl" }) {
  const classes =
    size === "xl"
      ? "w-full h-full rounded-[2rem] object-cover"
      : "w-24 h-24 rounded-full object-cover border-4 border-white shadow-md";

  if (owner.heroPhotoUrl || owner.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={`Профиль ${owner.name}`} className={classes} src={owner.heroPhotoUrl || owner.avatarUrl} />
    );
  }

  return (
    <div
      className={
        size === "xl"
          ? "w-full h-full rounded-[2rem] bg-surface-container-high text-primary flex items-center justify-center"
          : "w-24 h-24 rounded-full bg-surface-container-high text-primary flex items-center justify-center border-4 border-white shadow-md"
      }
    >
      <span className={size === "xl" ? "text-8xl font-black font-headline" : "text-3xl font-black font-headline"}>
        {owner.name.trim().charAt(0).toUpperCase() || "К"}
      </span>
    </div>
  );
}

function buildPagination(currentPage: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export function OwnersGalleryClient({ owners }: OwnersGalleryClientProps) {
  const gridRef = React.useRef<HTMLElement | null>(null);
  const [districtFilter, setDistrictFilter] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 9;

  const filteredOwners = React.useMemo(() => {
    if (!districtFilter) {
      return owners;
    }

    return owners.filter((owner) => owner.district === districtFilter);
  }, [districtFilter, owners]);

  const totalPages = Math.max(1, Math.ceil(filteredOwners.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedOwners = filteredOwners.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);
  const latestOwner = owners[0];
  const recentOwners = owners.slice(0, 3);
  const paginationItems = buildPagination(safeCurrentPage, totalPages);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [districtFilter]);

  React.useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  function handlePageChange(nextPage: number) {
    setCurrentPage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <section className="mb-16 relative overflow-hidden rounded-xl bg-surface-container-low p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="z-10 max-w-xl">
          <h1 className="font-display font-black text-5xl lg:text-7xl text-on-surface leading-tight mb-6 tracking-tighter">
            <span className="text-primary italic">Владельцы</span>
          </h1>
          <p className="text-lg text-on-surface-variant mb-10 font-medium">
            Найдите единомышленников по району, посмотрите новые профили и знакомьтесь с теми, кто тоже гуляет по Петербургу с короткими лапками.
          </p>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-5 py-3 text-sm font-bold text-on-surface shadow-lg">
            <span className="material-symbols-outlined text-primary">group</span>
            Владельцев в нашем сообществе: {owners.length}
          </div>
        </div>

        <div className="relative w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-[2rem] shadow-2xl bg-surface-container-high">
          {latestOwner ? (
            <>
              <OwnerAvatar owner={latestOwner} size="xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 rounded-[1.5rem] bg-white/96 p-5 shadow-xl backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.24em] font-black text-primary mb-2">Новый владелец</p>
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xl font-black font-headline text-on-surface">{latestOwner.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-bold text-on-surface">
                        <span className="material-symbols-outlined text-sm text-primary">location_city</span>
                        {latestOwner.city || "Санкт-Петербург"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-bold text-on-surface">
                        <span className="material-symbols-outlined text-sm text-primary">pin_drop</span>
                        {latestOwner.district || "Район не указан"}
                      </span>
                    </div>
                  </div>
                  <Link
                    className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container transition-colors"
                    href={`/owners/${latestOwner.id}`}
                  >
                    Профиль
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-7xl">group</span>
            </div>
          )}
        </div>
      </section>

      {recentOwners.length ? (
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-[2px] w-12 bg-primary" />
            <h2 className="font-display font-extrabold text-2xl uppercase tracking-widest text-primary">Счастливые владельцы коржиков</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentOwners.map((owner, index) => (
              <Link
                className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/15 flex items-center gap-6 shadow-xl relative overflow-hidden group"
                href={`/owners/${owner.id}`}
                key={`recent-owner-${owner.id}`}
              >
                <div className="relative">
                  <OwnerAvatar owner={owner} />
                  <div className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-black text-xl text-on-surface truncate">{owner.name}</h3>
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <span className="material-symbols-outlined text-sm">pets</span>
                    <span>Хвостиков: {owner.petCount}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1 truncate">
                    {[owner.city, owner.district].filter(Boolean).join(" • ") || "Санкт-Петербург"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mb-12 sticky top-20 z-40">
        <div className="bg-white/90 backdrop-blur-[20px] p-6 rounded-xl shadow-xl border border-outline-variant/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            <div className="flex w-full flex-col lg:w-1/2">
              <label className="block text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant mb-3 pl-1">Район</label>
              <div className="relative flex-1">
                <select
                  className={APP_SELECT_CLASS}
                  onChange={(event) => setDistrictFilter(event.target.value)}
                  value={districtFilter}
                >
                  <option value="">Все районы</option>
                  {PET_DISTRICTS.map((district) => (
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

            <div className="flex w-full lg:w-1/2">
              <div className="flex min-h-full w-full items-center rounded-[1.5rem] px-5 py-4 text-m text-on-surface-variant">
                Поиск владельцев корги по районам Санкт-Петербурга
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6" ref={gridRef}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-black text-3xl text-on-surface">Все владельцы</h2>
            <p className="text-on-surface-variant mt-2">
              {filteredOwners.length ? `Найдено профилей: ${filteredOwners.length}` : "Пока нет профилей в выбранном районе"}
            </p>
          </div>
        </div>

        {paginatedOwners.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedOwners.map((owner) => (
              <Link className="group" href={`/owners/${owner.id}`} key={`owner-grid-${owner.id}`}>
                <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-ambient h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
                  <div className="relative h-72 overflow-hidden flex-shrink-0 bg-surface-container-high">
                    <OwnerAvatar owner={owner} size="xl" />
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <span className="material-symbols-outlined text-primary text-lg">pin_drop</span>
                      <span className="text-xs font-bold text-on-surface">{owner.district || "Район не указан"}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-2xl text-on-surface truncate">{owner.name}</h4>
                        <p className="text-sm text-on-surface-variant mt-1">{owner.city || "Санкт-Петербург"}</p>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="material-symbols-outlined text-primary">group</span>
                        <span className="text-[10px] font-bold uppercase text-stone-400">Хвостиков: {owner.petCount}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant mb-8 min-h-[72px]">
                      {owner.bio || "Участник сообщества «Корги СПб». Открыт к знакомствам, прогулкам и новым хвостатым встречам."}
                    </p>
                    <button className="w-full py-4 rounded-full bg-secondary-container text-on-secondary-container font-black text-sm uppercase tracking-widest hover:bg-secondary-fixed-dim transition-colors">
                      Смотреть профиль
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <section className="rounded-[2rem] bg-surface-container-low p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white text-primary flex items-center justify-center shadow-sm mb-4">
              <span className="material-symbols-outlined text-3xl">search_off</span>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">В этом районе пока тихо</h3>
            <p className="text-on-surface-variant">Попробуйте выбрать другой район или обновите профиль, чтобы стать первым владельцем в списке.</p>
          </section>
        )}
      </section>

      {totalPages > 1 ? (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {paginationItems.map((item, index) =>
            item === "..." ? (
              <span className="px-3 py-2 text-sm font-bold text-on-surface-variant" key={`ellipsis-${index}`}>
                ...
              </span>
            ) : (
              <button
                className={`min-w-11 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  item === safeCurrentPage
                    ? "bg-primary text-white"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                }`}
                key={item}
                onClick={() => handlePageChange(item)}
                type="button"
              >
                {item}
              </button>
            ),
          )}
        </nav>
      ) : null}
    </main>
  );
}
