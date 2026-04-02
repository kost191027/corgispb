"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { SosLocationPicker } from "@/components/sos/SosLocationPicker";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";
import { geocodeAddress } from "@/lib/client/geocode";
import { getMeetingFallbackImage, getMeetingTypes, MEETINGS } from "@/lib/meetings";
import { PET_DISTRICTS } from "@/lib/pets";

type MeetingViewer = {
  id: string;
  name: string;
  district?: string;
  avatarUrl?: string | null;
} | null;

type AddMeetingModalProps = {
  isOpen: boolean;
  viewer: MeetingViewer;
  onClose: () => void;
  onCreateMeeting: (formData: FormData) => Promise<void>;
};

const TITLE_LIMIT = 90;
const DESCRIPTION_LIMIT = 1000;
const LOCATION_LIMIT = 120;
const MEETING_TYPES = getMeetingTypes(MEETINGS).filter((type) => type !== "Все");

export function AddMeetingModal({
  isOpen,
  viewer,
  onClose,
  onCreateMeeting,
}: AddMeetingModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastResolvedAddressRef = useRef("");
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState(viewer?.district || PET_DISTRICTS[0]);
  const [type, setType] = useState(MEETING_TYPES[0] || "Прогулка");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
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

    setTitle("");
    setDistrict(viewer?.district || PET_DISTRICTS[0]);
    setType(MEETING_TYPES[0] || "Прогулка");
    setLocation("");
    setDescription("");
    setEventDate("");
    setMaxParticipants("");
    setAddress("");
    setLatitude(null);
    setLongitude(null);
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setLocationStatus(null);
    setLocationError(null);
    setFeedback(null);
    setIsResolvingAddress(false);
    lastResolvedAddressRef.current = "";
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen, viewer]);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  async function resolveAddressFromField(nextAddress: string) {
    const normalizedAddress = nextAddress.trim();

    if (!normalizedAddress || normalizedAddress === lastResolvedAddressRef.current) {
      return;
    }

    setIsResolvingAddress(true);
    setLocationError(null);
    setLocationStatus("Ищем место и ставим метку...");

    try {
      const payload = await geocodeAddress(normalizedAddress);
      const resolvedAddress = payload.address || normalizedAddress;
      setAddress(resolvedAddress);
      setLatitude(payload.latitude);
      setLongitude(payload.longitude);
      lastResolvedAddressRef.current = resolvedAddress;
      if (!location.trim()) {
        setLocation(resolvedAddress);
      }
      setLocationStatus("Точка найдена. При необходимости скорректируйте ее вручную.");
    } catch (error) {
      setLocationStatus(null);
      setLocationError(
        error instanceof Error ? error.message : "Не удалось определить адрес события.",
      );
    } finally {
      setIsResolvingAddress(false);
    }
  }

  if (!isMounted || !isOpen) {
    return null;
  }

  const coverPreviewUrl = imagePreviewUrl || getMeetingFallbackImage(type);

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
          className="relative my-4 flex w-full max-w-6xl flex-col overflow-hidden rounded-[2.2rem] bg-surface-container-lowest shadow-[0_30px_90px_rgba(25,20,16,0.35)] sm:my-0 sm:max-h-[92dvh]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            aria-label="Закрыть модалку добавления события"
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
                Добавлять события могут только зарегистрированные владельцы
              </h2>
              <p className="mb-8 max-w-2xl text-on-surface-variant">
                После публикации событие сразу появится в комьюнити, в календаре встреч и на обеих картах.
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
                    <span className="material-symbols-outlined text-sm">event</span>
                    Новое событие
                  </div>
                  <h2 className="mb-3 font-display text-3xl font-black leading-tight text-on-surface">
                    Добавьте встречу сообщества
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                    Заполните карточку события, выберите тип и поставьте точку на карте.
                  </p>

                  <input
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setSelectedImage(file || null);
                    }}
                    type="file"
                  />

                  <button
                    className="group relative flex aspect-[1.2/1] w-full items-end overflow-hidden rounded-[1.8rem] border-2 border-dashed border-outline-variant/30 bg-surface-container-high p-5 text-left transition-colors hover:bg-surface-container-highest"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    <img
                      alt="Превью события"
                      className="absolute inset-0 h-full w-full object-cover"
                      src={coverPreviewUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="relative z-10">
                      <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
                        <span className="material-symbols-outlined">add_a_photo</span>
                      </div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                        Обложка события
                      </p>
                    </div>
                  </button>
                </div>

                <div className="px-6 pb-7 pt-20 md:px-8 md:pb-7 md:pt-12 lg:pr-20">
                  <div className="grid gap-5">
                    <div>
                      <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                        Тип встречи
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {MEETING_TYPES.map((typeOption) => (
                          <button
                            key={typeOption}
                            className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                              type === typeOption
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed-dim"
                            }`}
                            onClick={() => setType(typeOption)}
                            type="button"
                          >
                            {typeOption}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Название события
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {title.length}/{TITLE_LIMIT}
                        </span>
                      </div>
                      <input
                        className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={TITLE_LIMIT}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Например, Весенняя прогулка на Елагином"
                        type="text"
                        value={title}
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Район
                        </label>
                        <div className="relative">
                          <select
                            className={APP_SELECT_CLASS}
                            onChange={(event) => setDistrict(event.target.value)}
                            value={district}
                          >
                            {PET_DISTRICTS.map((districtOption) => (
                              <option key={districtOption} value={districtOption}>
                                {districtOption}
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

                      <div>
                        <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Дата и время
                        </label>
                        <input
                          className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                          onChange={(event) => setEventDate(event.target.value)}
                          type="datetime-local"
                          value={eventDate}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-[1fr_180px]">
                      <div>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                            Название места
                          </label>
                          <span className="text-[11px] font-bold text-on-surface-variant">
                            {location.length}/{LOCATION_LIMIT}
                          </span>
                        </div>
                        <input
                          className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                          maxLength={LOCATION_LIMIT}
                          onChange={(event) => setLocation(event.target.value)}
                          placeholder="Например, Севкабель, двор у воды"
                          type="text"
                          value={location}
                        />
                      </div>

                      <div>
                        <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Мест
                        </label>
                        <input
                          className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                          min="0"
                          onChange={(event) => setMaxParticipants(event.target.value)}
                          placeholder="20"
                          type="number"
                          value={maxParticipants}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                        Адрес или ориентир
                      </label>
                      <input
                        className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        onBlur={(event) => void resolveAddressFromField(event.target.value)}
                        onChange={(event) => {
                          setAddress(event.target.value);
                          setLocationStatus(null);
                          setLocationError(null);
                        }}
                        placeholder="Елагин остров, Севкабель, Таврический сад..."
                        type="text"
                        value={address}
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Описание
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {description.length}/{DESCRIPTION_LIMIT}
                        </span>
                      </div>
                      <textarea
                        className="min-h-[144px] w-full resize-none rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={DESCRIPTION_LIMIT}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Коротко расскажите, что будет на встрече, кому она подойдет и что взять с собой."
                        value={description}
                      />
                    </div>

                    <SosLocationPicker
                      address={address}
                      addressStatus={locationStatus}
                      externalError={locationError}
                      latitude={latitude}
                      longitude={longitude}
                      onResolve={({ address: nextAddress, latitude: nextLatitude, longitude: nextLongitude }) => {
                        setAddress(nextAddress);
                        setLatitude(nextLatitude);
                        setLongitude(nextLongitude);
                        lastResolvedAddressRef.current = nextAddress.trim();
                        setLocationStatus(
                          nextLatitude && nextLongitude
                            ? "Точка события сохранена на карте."
                            : null,
                        );
                        setLocationError(null);
                        if (!location.trim() && nextAddress.trim()) {
                          setLocation(nextAddress.trim());
                        }
                      }}
                      showExpandButton
                      isResolvingAddress={isResolvingAddress}
                    />
                  </div>

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
                      disabled={isPending}
                      onClick={() => {
                        setFeedback(null);

                        const formData = new FormData();
                        formData.append("title", title);
                        formData.append("district", district);
                        formData.append("type", type);
                        formData.append("location", location || address);
                        formData.append("description", description);
                        formData.append("eventDate", eventDate);
                        formData.append("maxParticipants", maxParticipants);
                        formData.append("latitude", latitude !== null ? String(latitude) : "");
                        formData.append("longitude", longitude !== null ? String(longitude) : "");

                        if (selectedImage) {
                          formData.append("image", selectedImage);
                        }

                        startTransition(async () => {
                          try {
                            await onCreateMeeting(formData);
                            onClose();
                          } catch (error) {
                            setFeedback(
                              error instanceof Error
                                ? error.message
                                : "Не удалось создать событие.",
                            );
                          }
                        });
                      }}
                      type="button"
                    >
                      Создать событие
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
