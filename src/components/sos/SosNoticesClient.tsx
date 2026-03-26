"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SosNotice } from "@/actions/sos";

type SosNoticesClientProps = {
  notices: SosNotice[];
  selectedNotice?: SosNotice | null;
  onSelectNotice?: (notice: SosNotice | null) => void;
};

const SOS_PAGE_SIZE = 9;

function formatNoticeDate(value: string | null, fallback = "Недавно") {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getNoticeBadge(notice: SosNotice) {
  if (notice.reportType === "found") {
    return {
      badge: "Замечен",
      statusText: "Замечен",
      statusColor: "bg-tertiary",
      dateColor: "text-tertiary",
      buttonText: "Связаться с автором",
    };
  }

  return {
    badge: "Пропал",
    statusText: "Пропал",
    statusColor: "bg-error",
    dateColor: "text-primary",
    buttonText: "Связаться с владельцем",
  };
}

function getGallery(notice: SosNotice) {
  const images = notice.galleryUrls.filter(Boolean);
  if (images.length > 0) {
    return images;
  }

  return notice.photoUrl ? [notice.photoUrl] : [];
}

function buildPagination(currentPage: number, totalPages: number) {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages]);

  for (
    let page = Math.max(2, currentPage - 1);
    page <= Math.min(totalPages - 1, currentPage + 1);
    page += 1
  ) {
    pages.add(page);
  }

  if (currentPage <= 4) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
    pages.add(5);
  }

  if (currentPage >= totalPages - 3) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
    pages.add(totalPages - 4);
  }

  const orderedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);

  const result: Array<number | "ellipsis"> = [];

  orderedPages.forEach((page, index) => {
    if (index > 0 && page - orderedPages[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

function SosNoticeLightbox({
  gallery,
  notice,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  gallery: string[];
  notice: SosNotice;
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted || gallery.length === 0) {
    return null;
  }

  const currentImage = gallery[activeIndex] ?? gallery[0];

  return createPortal(
    <div
      className="fixed inset-0 z-[10020] bg-black/90 backdrop-blur-xl"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative flex min-h-full items-center justify-center px-3 py-8 sm:px-6">
        <button
          type="button"
          aria-label="Закрыть полноэкранную галерею"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition-colors hover:bg-white/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {gallery.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              onClick={onPrev}
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition-colors hover:bg-white/20 active:scale-95 sm:left-6"
            >
              <span className="material-symbols-outlined text-2xl">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              onClick={onNext}
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg transition-colors hover:bg-white/20 active:scale-95 sm:right-6"
            >
              <span className="material-symbols-outlined text-2xl">
                chevron_right
              </span>
            </button>
          </>
        ) : null}

        <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-display text-2xl font-black text-white sm:text-3xl">
                {notice.petName}
              </p>
              <p className="text-sm font-medium text-white/70">
                Фото {activeIndex + 1} из {gallery.length}
              </p>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white/85">
              Галерея
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[2rem] bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={(event) => {
              if (touchStartX === null || gallery.length < 2) {
                setTouchStartX(null);
                return;
              }

              const deltaX = event.changedTouches[0].clientX - touchStartX;
              if (deltaX > 40) {
                onPrev();
              } else if (deltaX < -40) {
                onNext();
              }

              setTouchStartX(null);
            }}
          >
            <img
              src={currentImage}
              alt={`${notice.petName} ${activeIndex + 1}`}
              className="max-h-[78dvh] w-full object-contain"
              crossOrigin="anonymous"
            />
          </div>

          {gallery.length > 1 ? (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {gallery.map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => onSelectIndex(index)}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    index === activeIndex
                      ? "border-white shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${notice.petName} preview ${index + 1}`}
                    className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                    crossOrigin="anonymous"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function SosNoticeDetailModal({
  notice,
  onClose,
}: {
  notice: SosNotice;
  onClose: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const gallery = useMemo(() => getGallery(notice), [notice]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [notice.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
          return;
        }

        onClose();
        return;
      }

      if (gallery.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          current === 0 ? gallery.length - 1 : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          current === gallery.length - 1 ? 0 : current + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery.length, isLightboxOpen, onClose]);

  if (!isMounted) {
    return null;
  }

  const badge = getNoticeBadge(notice);
  const activeImage = gallery[activeImageIndex] ?? null;
  const showGalleryControls = gallery.length > 1;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[10005] bg-black/65 backdrop-blur-md"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
          <div
            className="relative grid h-[min(84dvh,760px)] w-full max-w-[1040px] overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_30px_90px_rgba(25,20,16,0.35)] md:grid-cols-[1.05fr_0.95fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть детали объявления"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-on-surface-variant shadow-md transition-colors hover:bg-primary-container hover:text-on-primary active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="min-h-0 overflow-y-auto bg-surface-container-low p-4 md:p-5">
              <div className="space-y-4 pb-2">
                {activeImage ? (
                  <>
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-surface-container-high shadow-inner">
                      <button
                        type="button"
                        onClick={() => setIsLightboxOpen(true)}
                        className="group block w-full text-left"
                        aria-label="Открыть фото в полном размере"
                      >
                        <img
                          src={activeImage}
                          alt={`${notice.petName} ${activeImageIndex + 1}`}
                          className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          crossOrigin="anonymous"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 via-black/20 to-transparent px-5 pb-4 pt-10 text-white">
                          <span className="text-xs font-black uppercase tracking-widest">
                            Фото {activeImageIndex + 1} из {gallery.length}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest backdrop-blur-sm">
                            <span className="material-symbols-outlined text-sm">
                              open_in_full
                            </span>
                            Увеличить
                          </span>
                        </div>
                      </button>

                      {showGalleryControls ? (
                        <>
                          <button
                            type="button"
                            aria-label="Предыдущее фото"
                            onClick={() =>
                              setActiveImageIndex((current) =>
                                current === 0 ? gallery.length - 1 : current - 1,
                              )
                            }
                            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white shadow-md transition-colors hover:bg-black/45 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-2xl">
                              chevron_left
                            </span>
                          </button>
                          <button
                            type="button"
                            aria-label="Следующее фото"
                            onClick={() =>
                              setActiveImageIndex((current) =>
                                current === gallery.length - 1 ? 0 : current + 1,
                              )
                            }
                            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white shadow-md transition-colors hover:bg-black/45 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-2xl">
                              chevron_right
                            </span>
                          </button>
                        </>
                      ) : null}
                    </div>

                    {gallery.length > 1 ? (
                      <div className="grid grid-cols-4 gap-3">
                        {gallery.map((photo, index) => (
                          <button
                            key={`${photo}-${index}`}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            className={`overflow-hidden rounded-[1rem] border transition-all ${
                              index === activeImageIndex
                                ? "border-primary shadow-[0_14px_28px_rgba(255,140,0,0.18)]"
                                : "border-outline-variant/20 bg-surface-container-high hover:border-primary/40"
                            }`}
                          >
                            <img
                              src={photo}
                              alt={`${notice.petName} ${index + 1}`}
                              className="aspect-square h-auto w-full object-cover"
                              crossOrigin="anonymous"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-primary/15 via-secondary-container/20 to-tertiary/15 text-center">
                    <span className="material-symbols-outlined mb-3 text-6xl text-primary/70">
                      pets
                    </span>
                    <p className="max-w-[240px] text-sm font-bold text-on-surface-variant">
                      Фото к объявлению пока не добавлены
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="min-h-0 overflow-y-auto p-5 md:p-6">
              <div className="mb-4 pr-12">
                <span
                  className={`mb-3 inline-flex rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md ${badge.statusColor}`}
                >
                  {badge.badge}
                </span>
                <h3 className="mb-3 font-display text-4xl font-black text-on-surface">
                  {notice.petName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                    {notice.breed}
                  </span>
                  {notice.age ? (
                    <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                      {notice.age}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-surface-container-high px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-on-surface-variant">
                    {formatNoticeDate(notice.lostDate)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] bg-surface-container-high p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-outline-variant">
                    Локация
                  </p>
                  <p className="text-sm font-bold leading-relaxed text-on-surface">
                    {notice.address || "Локация уточняется у автора объявления"}
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-surface-container-high p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-outline-variant">
                    Описание
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                    {notice.description}
                  </p>
                </div>

                {notice.reward ? (
                  <div className="rounded-[1.5rem] bg-primary/5 p-5">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">
                      Вознаграждение
                    </p>
                    <p className="text-base font-black text-primary">
                      {notice.reward}
                    </p>
                  </div>
                ) : null}

                <div className="rounded-[1.5rem] border border-tertiary/10 bg-tertiary-container/10 p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-tertiary">
                    Контакт для связи
                  </p>
                  <a
                    href={`tel:${notice.phone.replace(/\D/g, "")}`}
                    className="inline-flex rounded-full bg-surface-container-lowest px-5 py-3 text-sm font-black text-on-surface shadow-sm transition-colors hover:bg-primary-container hover:text-on-primary-container"
                  >
                    {notice.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && gallery.length > 0 ? (
        <SosNoticeLightbox
          gallery={gallery}
          notice={notice}
          activeIndex={activeImageIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={() =>
            setActiveImageIndex((current) =>
              current === 0 ? gallery.length - 1 : current - 1,
            )
          }
          onNext={() =>
            setActiveImageIndex((current) =>
              current === gallery.length - 1 ? 0 : current + 1,
            )
          }
          onSelectIndex={setActiveImageIndex}
        />
      ) : null}
    </>,
    document.body,
  );
}

export function SosNoticesClient({
  notices,
  selectedNotice,
  onSelectNotice,
}: SosNoticesClientProps) {
  const listTopRef = useRef<HTMLDivElement>(null);
  const [internalSelectedNotice, setInternalSelectedNotice] =
    useState<SosNotice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const activeNotice =
    selectedNotice !== undefined ? selectedNotice : internalSelectedNotice;
  const totalPages = Math.max(1, Math.ceil(notices.length / SOS_PAGE_SIZE));
  const paginatedNotices = useMemo(
    () =>
      notices.slice(
        (currentPage - 1) * SOS_PAGE_SIZE,
        currentPage * SOS_PAGE_SIZE,
      ),
    [currentPage, notices],
  );
  const paginationItems = useMemo(
    () => buildPagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    listTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const setActiveNotice = (notice: SosNotice | null) => {
    if (onSelectNotice) {
      onSelectNotice(notice);
      return;
    }

    setInternalSelectedNotice(notice);
  };

  if (notices.length === 0) {
    return (
      <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-12 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-4xl">pets</span>
        </div>
        <h3 className="mb-3 font-display text-3xl font-black text-on-surface">
          Пока нет активных SOS-объявлений
        </h3>
        <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-on-surface-variant">
          Хорошая новость: сейчас в ленте тишина. Если нужно срочно
          опубликовать пропажу или найденную собаку, используйте кнопку в
          первом экране.
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={listTopRef} />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {paginatedNotices.map((notice) => {
          const badge = getNoticeBadge(notice);

          return (
            <button
              key={notice.id}
              type="button"
              onClick={() => setActiveNotice(notice)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                {notice.photoUrl ? (
                  <img
                    alt={notice.petName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={notice.photoUrl}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/15 via-secondary-container/20 to-tertiary/15 text-center">
                    <span className="material-symbols-outlined mb-3 text-6xl text-primary/70">
                      pets
                    </span>
                    <p className="max-w-[220px] text-sm font-bold text-on-surface-variant">
                      Фото еще не добавлено, но объявление уже в работе
                    </p>
                  </div>
                )}
                <span
                  className={`absolute left-5 top-5 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-md ${badge.statusColor}`}
                >
                  {badge.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 font-display text-3xl font-black text-on-surface">
                      {notice.petName}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-outline-variant/20 bg-surface-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        {notice.breed}
                      </span>
                      {notice.age ? (
                        <span className="rounded-full border border-outline-variant/20 bg-surface-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                          {notice.age}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      {badge.statusText}
                    </p>
                    <p className={`font-black ${badge.dateColor}`}>
                      {formatNoticeDate(notice.lostDate)}
                    </p>
                  </div>
                </div>
                <div className="mb-10 flex-grow space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">
                        location_on
                      </span>
                    </div>
                    <span className="text-sm font-bold leading-snug text-on-surface">
                      {notice.address || "Локация уточняется у автора объявления"}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container">
                      <span className="material-symbols-outlined text-sm text-on-surface-variant">
                        description
                      </span>
                    </div>
                    <span className="line-clamp-3 text-sm font-medium leading-snug text-on-surface-variant">
                      {notice.description}
                    </span>
                  </div>
                  {notice.reward ? (
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-container">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">
                          card_giftcard
                        </span>
                      </div>
                      <span className="text-sm font-bold leading-snug text-primary">
                        Вознаграждение: {notice.reward}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="mt-auto block w-full rounded-xl border border-outline-variant/20 bg-surface-container-high py-4 text-center font-display font-black text-on-surface transition-all hover:border-primary/20 hover:bg-primary-container hover:text-on-primary-container hover:shadow-md">
                  Подробнее
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="rounded-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-2 text-sm font-black text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-45"
          >
            Назад
          </button>

          {paginationItems.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm font-black tracking-widest text-on-surface-variant"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => setCurrentPage(item)}
                className={`min-w-11 rounded-full px-4 py-2 text-sm font-black transition-colors ${
                  item === currentPage
                    ? "bg-primary text-on-primary shadow-md"
                    : "border border-outline-variant/20 bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="rounded-full border border-outline-variant/20 bg-surface-container-lowest px-4 py-2 text-sm font-black text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-45"
          >
            Дальше
          </button>
        </div>
      ) : null}

      {activeNotice ? (
        <SosNoticeDetailModal
          notice={activeNotice}
          onClose={() => setActiveNotice(null)}
        />
      ) : null}
    </>
  );
}
