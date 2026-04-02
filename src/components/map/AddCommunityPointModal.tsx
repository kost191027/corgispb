"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { SosLocationPicker } from "@/components/sos/SosLocationPicker";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";
import {
  COMMUNITY_MAP_CATEGORIES,
  type CommunityMapCategory,
} from "@/lib/map-spots";
import { geocodeAddress } from "@/lib/client/geocode";
import { PET_DISTRICTS } from "@/lib/pets";

type CommunityMapViewer = {
  id: string;
  name: string;
  district?: string;
  avatarUrl?: string;
} | null;

type AddCommunityPointModalProps = {
  isOpen: boolean;
  viewer: CommunityMapViewer;
  onClose: () => void;
  onCreatePoint: (payload: {
    category: "parks" | "cafes" | "community";
    district: string;
    title: string;
    subtitle: string;
    description: string;
    latitude: number | null;
    longitude: number | null;
  }) => Promise<void>;
};

const TITLE_LIMIT = 70;
const SUBTITLE_LIMIT = 90;
const DESCRIPTION_LIMIT = 500;

export function AddCommunityPointModal({
  isOpen,
  viewer,
  onClose,
  onCreatePoint,
}: AddCommunityPointModalProps) {
  const lastResolvedAddressRef = useRef("");
  const [isMounted, setIsMounted] = useState(false);
  const [category, setCategory] = useState<"parks" | "cafes" | "community">(
    "parks",
  );
  const [district, setDistrict] = useState(viewer?.district || PET_DISTRICTS[0]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isResolvingAddress, setIsResolvingAddress] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setDistrict(viewer?.district || PET_DISTRICTS[0]);
    setCategory("parks");
    setTitle("");
    setSubtitle("");
    setDescription("");
    setAddress("");
    setLatitude(null);
    setLongitude(null);
    setLocationStatus(null);
    setLocationError(null);
    setFeedback(null);
    setIsResolvingAddress(false);
    lastResolvedAddressRef.current = "";
  }, [isOpen, viewer]);

  if (!isMounted || !isOpen) {
    return null;
  }

  const categoryOptions = COMMUNITY_MAP_CATEGORIES.filter(
    (item): item is (typeof COMMUNITY_MAP_CATEGORIES)[number] & {
      id: Exclude<CommunityMapCategory, "all">;
    } => item.id !== "all",
  );

  async function resolveAddressFromField(nextAddress: string) {
    const normalizedAddress = nextAddress.trim();

    if (!normalizedAddress) {
      setLocationStatus(null);
      setLocationError(null);
      return;
    }

    if (normalizedAddress === lastResolvedAddressRef.current) {
      return;
    }

    setIsResolvingAddress(true);
    setLocationError(null);
    setLocationStatus("Ищем адрес и ставим метку на карте...");

    try {
      const payload = await geocodeAddress(normalizedAddress);
      const resolvedAddress = payload.address || normalizedAddress;

      setAddress(resolvedAddress);
      setLatitude(payload.latitude);
      setLongitude(payload.longitude);
      lastResolvedAddressRef.current = resolvedAddress;
      setLocationStatus(
        "Точка найдена. Если место неточное, скорректируйте метку вручную ниже.",
      );
    } catch (error) {
      setLocationStatus(null);
      setLocationError(
        error instanceof Error ? error.message : "Не удалось найти адрес.",
      );
    } finally {
      setIsResolvingAddress(false);
    }
  }

  const modal = (
    <div
      className="fixed inset-0 z-[10020] overflow-y-auto bg-black/65 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-start justify-center p-3 sm:items-center sm:p-5">
        <div
          className="relative my-4 flex w-full max-w-5xl flex-col overflow-hidden rounded-[2.2rem] bg-surface-container-lowest shadow-[0_30px_90px_rgba(25,20,16,0.35)] sm:my-0 sm:max-h-[92dvh]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            aria-label="Закрыть модалку добавления точки"
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-on-surface-variant shadow-md transition-colors hover:bg-primary-container hover:text-on-primary active:scale-95"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {!viewer ? (
            <div className="overflow-y-auto p-8 sm:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-primary">
                <span className="material-symbols-outlined text-sm">lock</span>
                Только для участников
              </div>
              <h2 className="mb-4 font-display text-4xl font-black leading-tight text-on-surface">
                Добавлять точки могут только зарегистрированные владельцы
              </h2>
              <p className="mb-8 max-w-2xl text-on-surface-variant">
                Авторство у каждой точки публичное: мы показываем профиль автора или бейдж администратора, если точку добавила редакция.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600"
                  href="/login"
                >
                  Войти
                </Link>
                <Link
                  className="rounded-full bg-surface-container-high px-6 py-3 font-bold text-on-surface transition-colors hover:bg-surface-container"
                  href="/register"
                >
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-outline-variant/10 bg-surface-container-low px-6 py-7 md:border-b-0 md:border-r md:px-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                  <span className="material-symbols-outlined text-sm">add_location_alt</span>
                  Новая точка на карте
                </div>
                <h2 className="mb-3 font-display text-3xl font-black leading-tight text-on-surface">
                  Добавьте свою точку
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                  Сначала заполните карточку, затем найдите место по адресу или поставьте метку вручную на карте.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="mb-3 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                      Тип точки
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((option) => {
                        const isActive = category === option.id;

                        return (
                          <button
                            key={option.id}
                            className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                              isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed-dim"
                            }`}
                            onClick={() => setCategory(option.id)}
                            type="button"
                          >
                            {option.badge}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                      Район
                    </label>
                    <div className="relative">
                      <select
                        className={APP_SELECT_CLASS}
                        onChange={(event) => setDistrict(event.target.value)}
                        value={district}
                      >
                        {PET_DISTRICTS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <span className={APP_SELECT_ICON_WRAPPER_CLASS}>
                        <span className="material-symbols-outlined text-[20px]">
                          expand_more
                        </span>
                      </span>
                    </div>
                  </div>

                  {[
                    {
                      label: "Заголовок точки",
                      value: title,
                      setValue: setTitle,
                      limit: TITLE_LIMIT,
                      placeholder: "Например, Полянка у Смоленки",
                    },
                    {
                      label: "Подзаголовок",
                      value: subtitle,
                      setValue: setSubtitle,
                      limit: SUBTITLE_LIMIT,
                      placeholder: "Коротко: зачем сюда идти с корги",
                    },
                  ].map((field) => (
                    <div key={field.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          {field.label}
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {field.value.length}/{field.limit}
                        </span>
                      </div>
                      <input
                        className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={field.limit}
                        onChange={(event) => field.setValue(event.target.value)}
                        placeholder={field.placeholder}
                        type="text"
                        value={field.value}
                      />
                    </div>
                  ))}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                        Подробное описание
                      </label>
                      <span className="text-[11px] font-bold text-on-surface-variant">
                        {description.length}/{DESCRIPTION_LIMIT}
                      </span>
                    </div>
                    <textarea
                      className="min-h-[132px] w-full resize-none rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                      maxLength={DESCRIPTION_LIMIT}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Почему это место полезно, для кого оно подойдет и что важно знать перед визитом."
                      value={description}
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-7 md:px-8">
                <div className="mb-5 rounded-[1.8rem] bg-primary/6 p-5">
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-lg">person_pin_circle</span>
                    <span className="text-xs font-black uppercase tracking-[0.24em]">
                      Автор точки
                    </span>
                  </div>
                  <p className="text-lg font-black text-on-surface">{viewer.name}</p>
                  <p className="text-sm text-on-surface-variant">
                    После публикации точка будет подписана вашим профилем.
                  </p>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                      Адрес или ориентир
                    </label>
                    <span className="text-[11px] font-bold text-on-surface-variant">
                      До 120 символов
                    </span>
                  </div>
                  <input
                    className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                    maxLength={120}
                    onBlur={(event) => {
                      void resolveAddressFromField(event.target.value);
                    }}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Например, Елагин остров, центральный вход"
                    type="text"
                    value={address}
                  />
                  <p className="mt-2 text-xs font-medium text-on-surface-variant">
                    Можно ввести адрес и дать карте поставить точку автоматически, а затем скорректировать ее вручную.
                  </p>
                </div>

                <SosLocationPicker
                  address={address}
                  latitude={latitude}
                  longitude={longitude}
                  isResolvingAddress={isResolvingAddress}
                  addressStatus={locationStatus}
                  externalError={locationError}
                  showExpandButton={false}
                  onResolve={(next) => {
                    setAddress(next.address);
                    setLatitude(next.latitude);
                    setLongitude(next.longitude);
                    if (next.address) {
                      lastResolvedAddressRef.current = next.address;
                    }
                    setLocationError(null);
                  }}
                />

                {feedback ? (
                  <div className="mt-4 rounded-[1.5rem] bg-error/10 px-4 py-3 text-sm font-bold text-error">
                    {feedback}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="rounded-full bg-surface-container-high px-5 py-3 font-bold text-on-surface transition-colors hover:bg-surface-container"
                    onClick={onClose}
                    type="button"
                  >
                    Отмена
                  </button>
                  <button
                    className="rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isPending || isResolvingAddress}
                    onClick={() => {
                      setFeedback(null);

                      startTransition(async () => {
                        try {
                          await onCreatePoint({
                            category,
                            district,
                            title,
                            subtitle,
                            description,
                            latitude,
                            longitude,
                          });
                          onClose();
                        } catch (error) {
                          setFeedback(
                            error instanceof Error
                              ? error.message
                              : "Не удалось сохранить точку.",
                          );
                        }
                      });
                    }}
                    type="button"
                  >
                    {isPending ? "Публикуем..." : "Опубликовать точку"}
                  </button>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
