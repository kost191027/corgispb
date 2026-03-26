"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { reportSosAction, type SosReportType } from "@/actions/sos";
import { SosLocationPicker } from "@/components/sos/SosLocationPicker";

type SosModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: SosReportType;
};

type CoordinatesState = {
  latitude: number | null;
  longitude: number | null;
};

export default function SosModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "lost",
}: SosModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<SosReportType>(initialMode);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<CoordinatesState>({
    latitude: null,
    longitude: null,
  });
  const [phone, setPhone] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function formatRussianPhone(value: string) {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      return "";
    }

    let normalized = digits;

    if (normalized.startsWith("9")) {
      normalized = `7${normalized}`;
    } else if (normalized.startsWith("8")) {
      normalized = `7${normalized.slice(1)}`;
    } else if (!normalized.startsWith("7")) {
      normalized = `7${normalized}`;
    }

    normalized = normalized.slice(0, 11);

    const country = normalized[0] ? "+7" : "";
    const area = normalized.slice(1, 4);
    const first = normalized.slice(4, 7);
    const second = normalized.slice(7, 9);
    const third = normalized.slice(9, 11);

    let formatted = country;

    if (area) {
      formatted += ` (${area}`;
    }

    if (area.length === 3) {
      formatted += ")";
    }

    if (first) {
      formatted += ` ${first}`;
    }

    if (second) {
      formatted += `-${second}`;
    }

    if (third) {
      formatted += `-${third}`;
    }

    return formatted.trim();
  }

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setAddress("");
      setPhone("");
      setSelectedPhotos([]);
      setCoordinates({ latitude: null, longitude: null });
      setFeedback(null);

      setPhotoPreviews((current) => {
        for (const preview of current) {
          URL.revokeObjectURL(preview);
        }
        return [];
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [initialMode, isOpen]);

  useEffect(() => {
    const previews = selectedPhotos.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);

    return () => {
      for (const preview of previews) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [selectedPhotos]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SOS форма"
          className="relative grid h-[min(84dvh,760px)] w-full max-w-[1020px] overflow-hidden rounded-[1.75rem] bg-surface-container-lowest shadow-[0_30px_90px_rgba(25,20,16,0.35)] sm:h-[min(86dvh,780px)] sm:w-[min(94vw,1020px)] md:grid-cols-[320px_minmax(0,1fr)]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-on-surface-variant shadow-md transition-colors hover:bg-primary-container hover:text-on-primary active:scale-95"
            aria-label="Закрыть модалку"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="min-h-0 overflow-y-auto overscroll-contain border-b border-outline-variant/10 bg-surface-container-low p-4 md:border-b-0 md:border-r md:p-5">
            <div className="space-y-5 pb-2">
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 font-headline text-sm font-black text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    photo_camera
                  </span>
                  Фотографии
                </h3>

                <input
                  ref={fileInputRef}
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);

                    if (files.length === 0) {
                      return;
                    }

                    setSelectedPhotos((current) => {
                      const merged = [...current];

                      for (const file of files) {
                        if (merged.length >= 4) {
                          break;
                        }

                        const exists = merged.some(
                          (item) =>
                            item.name === file.name &&
                            item.size === file.size &&
                            item.lastModified === file.lastModified,
                        );

                        if (!exists) {
                          merged.push(file);
                        }
                      }

                      return merged;
                    });

                    event.currentTarget.value = "";
                  }}
                />

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="col-span-3 flex aspect-[2.35/1] flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border-2 border-dashed border-outline-variant/30 bg-surface-container-high transition-colors hover:bg-surface-container-highest"
                  >
                    {photoPreviews[0] ? (
                      <img
                        src={photoPreviews[0]}
                        alt="Главное фото"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <span className="material-symbols-outlined mb-1 text-2xl text-outline-variant">
                          add_a_photo
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                          Загрузить главное фото
                        </span>
                      </>
                    )}
                  </button>

                  {[1, 2, 3].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex aspect-square items-center justify-center overflow-hidden rounded-[1rem] border-2 border-dashed border-outline-variant/30 bg-surface-container-high transition-colors hover:bg-surface-container-highest"
                    >
                      {photoPreviews[index] ? (
                        <img
                          src={photoPreviews[index]}
                          alt={`Фото ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-xl text-outline-variant">
                          add
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  В карточку объявления сейчас сохраняется главное фото.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-1.5 font-headline text-sm font-black text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  Где и когда
                </h3>

                <SosLocationPicker
                  address={address}
                  latitude={coordinates.latitude}
                  longitude={coordinates.longitude}
                  onResolve={(next) => {
                    setAddress(next.address);
                    setCoordinates({
                      latitude: next.latitude,
                      longitude: next.longitude,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto overscroll-contain p-4 md:p-5 md:pr-6">
            <header className="mb-4 pr-12">
              <span className="mb-2 inline-flex items-center rounded-full bg-error-container px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-on-error-container shadow-sm">
                Срочное объявление
              </span>
              <h1 className="font-headline text-xl font-black leading-[1.1] tracking-tight text-on-surface md:text-2xl">
                {mode === "found" ? "Нашли" : "SOS: Пропала"}{" "}
                <span className="italic text-primary">собака</span>
              </h1>
            </header>

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);
                formData.set("reportType", mode);
                formData.set("address", address);
                formData.set("phone", phone);

                for (const photo of selectedPhotos) {
                  formData.append("photos", photo);
                }

                if (typeof coordinates.latitude === "number") {
                  formData.set("latitude", String(coordinates.latitude));
                }

                if (typeof coordinates.longitude === "number") {
                  formData.set("longitude", String(coordinates.longitude));
                }

                setFeedback(null);

                startTransition(async () => {
                  const result = await reportSosAction(formData);
                  setFeedback(result.message);

                    if (result.success) {
                      form.reset();
                      setAddress("");
                      setPhone("");
                    setSelectedPhotos([]);
                    setCoordinates({ latitude: null, longitude: null });
                    setPhotoPreviews((current) => {
                      for (const preview of current) {
                        URL.revokeObjectURL(preview);
                      }
                      return [];
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                    onClose();
                    onSuccess?.();
                  }
                });
              }}
            >
              <input type="hidden" name="reportType" value={mode} />
              <input
                type="hidden"
                name="latitude"
                value={
                  typeof coordinates.latitude === "number"
                    ? String(coordinates.latitude)
                    : ""
                }
              />
              <input
                type="hidden"
                name="longitude"
                value={
                  typeof coordinates.longitude === "number"
                    ? String(coordinates.longitude)
                    : ""
                }
              />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("lost")}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    mode === "lost"
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  Пропала
                </button>
                <button
                  type="button"
                  onClick={() => setMode("found")}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    mode === "found"
                      ? "bg-tertiary text-white shadow-md"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  Найдена
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                    Кличка
                  </label>
                  <input
                    name="petName"
                    required
                    className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-low p-2.5 text-sm font-medium outline-none transition-all placeholder:text-stone-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
                    placeholder="Как зовут питомца?"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                    Возраст
                  </label>
                  <input
                    name="age"
                    className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-low p-2.5 text-sm font-medium outline-none transition-all placeholder:text-stone-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
                    placeholder="Напр. 2 года"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                  Порода
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Пемброк", "Кардиган", "Другая"].map((breed, index) => (
                    <label key={breed} className="group relative cursor-pointer">
                      <input
                        defaultChecked={index === 0}
                        className="peer sr-only"
                        name="breed"
                        type="radio"
                        value={breed}
                      />
                      <div className="rounded-full border border-outline-variant/10 bg-surface-container-high px-3 py-1.5 text-xs font-bold text-on-surface-variant transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary">
                        {breed}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                  Где пропала или была замечена
                </label>
                <input
                  name="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-low p-2.5 text-sm font-medium outline-none transition-all placeholder:text-stone-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
                  placeholder="Район, парк, адрес или ориентир"
                  type="text"
                />
              </div>

              <div className="space-y-1">
                <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                  Дата и время
                </label>
                <input
                  name="lostDate"
                  className="w-full rounded-lg border border-outline-variant/10 bg-surface-container-high p-2.5 text-sm text-on-surface outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
                  type="datetime-local"
                />
              </div>

              <div className="space-y-1">
                <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-outline-variant">
                  Описание примет
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full resize-none rounded-lg border border-outline-variant/20 bg-surface-container-low p-2.5 text-sm font-medium outline-none transition-all placeholder:text-stone-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
                  placeholder="Особые отметины, ошейник, характер, направление движения..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 rounded-xl border border-tertiary/10 bg-tertiary-container/10 p-3 sm:grid-cols-2">
                <div className="relative space-y-1">
                  <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-tertiary">
                    Телефон для связи
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-tertiary">
                      call
                    </span>
                    <input
                      name="phone"
                      required
                      value={phone}
                      onChange={(event) =>
                        setPhone(formatRussianPhone(event.target.value))
                      }
                      className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-2.5 pl-8 text-sm font-medium outline-none transition-all placeholder:text-stone-300 focus:border-tertiary/40 focus:ring-2 focus:ring-tertiary/40"
                      placeholder="+7 (___) ___-__-__"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="relative space-y-1">
                  <label className="block pl-1 text-[9px] font-bold uppercase tracking-widest text-tertiary">
                    Вознаграждение
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-tertiary">
                      card_giftcard
                    </span>
                    <input
                      name="reward"
                      className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-2.5 pl-8 text-sm font-medium outline-none transition-all placeholder:text-stone-300 focus:border-tertiary/40 focus:ring-2 focus:ring-tertiary/40"
                      placeholder="0 ₽"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {feedback ? (
                <div className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-medium text-on-surface">
                  {feedback}
                </div>
              ) : null}

              <div className="sticky bottom-0 bg-surface-container-lowest/96 pb-1 pt-2 backdrop-blur-sm">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container py-3 text-sm font-black text-on-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending
                    ? "Публикуем..."
                    : mode === "found"
                      ? "Опубликовать находку"
                      : "Опубликовать объявление"}
                  <span className="material-symbols-outlined text-lg font-black">
                    send
                  </span>
                </button>
                <p className="mx-auto mt-1.5 max-w-sm text-center text-[8px] font-bold uppercase tracking-widest leading-relaxed text-outline-variant">
                  Карта, координаты и главное фото сохраняются вместе с
                  объявлением. Telegram-уведомление уйдет автоматически, если
                  webhook настроен.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
