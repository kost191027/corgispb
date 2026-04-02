"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";
import { PET_DISTRICTS } from "@/lib/pets";

type CommunityGroupViewer = {
  id: string;
  name: string;
  district?: string;
  avatarUrl?: string | null;
} | null;

type AddCommunityGroupModalProps = {
  isOpen: boolean;
  viewer: CommunityGroupViewer;
  onClose: () => void;
  onCreateGroup: (formData: FormData) => Promise<void>;
};

const NAME_LIMIT = 70;
const TOPIC_LIMIT = 120;
const DESCRIPTION_LIMIT = 500;

export function AddCommunityGroupModal({
  isOpen,
  viewer,
  onClose,
  onCreateGroup,
}: AddCommunityGroupModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [district, setDistrict] = useState(viewer?.district || PET_DISTRICTS[0]);
  const [todayTopic, setTodayTopic] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
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

    setName("");
    setDistrict(viewer?.district || PET_DISTRICTS[0]);
    setTodayTopic("");
    setDescription("");
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setFeedback(null);
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

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedImage]);

  const coverPreviewUrl = imagePreviewUrl || viewer?.avatarUrl || null;

  if (!isMounted || !isOpen) {
    return null;
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
            aria-label="Закрыть модалку добавления группы"
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
                Создавать группы могут только зарегистрированные владельцы
              </h2>
              <p className="mb-8 max-w-2xl text-on-surface-variant">
                После создания группа появится в списке сообщества и будет
                сортироваться по активности района.
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
                    <span className="material-symbols-outlined text-sm">groups</span>
                    Новая группа
                  </div>
                  <h2 className="mb-3 font-display text-3xl font-black leading-tight text-on-surface">
                    Запустите свою группу
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                    Заполните карточку группы так, как она будет выглядеть в
                    превью сообщества.
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
                    className="group relative flex aspect-[1.25/1] w-full items-end overflow-hidden rounded-[1.8rem] border-2 border-dashed border-outline-variant/30 bg-surface-container-high p-5 text-left transition-colors hover:bg-surface-container-highest"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    {coverPreviewUrl ? (
                      <img
                        alt="Превью группы"
                        className="absolute inset-0 h-full w-full object-cover"
                        src={coverPreviewUrl}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="relative z-10">
                      <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
                        <span className="material-symbols-outlined">
                          add_a_photo
                        </span>
                      </div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                        Обложка группы
                      </p>
                    </div>
                  </button>

                  <div className="mt-5 rounded-[1.5rem] bg-surface-container-lowest p-5 shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                      Как это будет выглядеть
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                        {coverPreviewUrl ? (
                          <img
                            alt="Аватар группы"
                            className="h-full w-full object-cover"
                            src={coverPreviewUrl}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-primary">
                            pets
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface">
                          {name || "Название группы"}
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                          Участники автоматически считаются по району
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-on-surface-variant">
                      Сегодня обсуждают:{" "}
                      <span className="font-bold text-on-surface">
                        {todayTopic || "Тема дня группы"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-7 pt-20 md:px-8 md:pb-7 md:pt-12 lg:pr-20">
                  <div className="grid gap-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Название группы
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {name.length}/{NAME_LIMIT}
                        </span>
                      </div>
                      <input
                        className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={NAME_LIMIT}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Например, Приморские Булочки"
                        type="text"
                        value={name}
                      />
                    </div>

                    <div>
                      <label className="mb-2 ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                        Район
                      </label>
                      <div className="relative">
                        <select
                          className={`${APP_SELECT_CLASS} bg-surface-container-high py-4 text-sm`}
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
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Тема дня
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {todayTopic.length}/{TOPIC_LIMIT}
                        </span>
                      </div>
                      <input
                        className="w-full rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={TOPIC_LIMIT}
                        onChange={(event) => setTodayTopic(event.target.value)}
                        placeholder="Что сегодня обсуждаете в группе?"
                        type="text"
                        value={todayTopic}
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="ml-1 block text-[11px] font-black uppercase tracking-[0.24em] text-on-surface-variant">
                          Короткое описание
                        </label>
                        <span className="text-[11px] font-bold text-on-surface-variant">
                          {description.length}/{DESCRIPTION_LIMIT}
                        </span>
                      </div>
                      <textarea
                        className="min-h-[148px] w-full resize-none rounded-[1.5rem] border-none bg-surface-container-high px-5 py-4 text-on-surface outline-none transition-all focus:ring-2 focus:ring-primary/40"
                        maxLength={DESCRIPTION_LIMIT}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Расскажите, для кого группа, как проходят встречи и чем она будет полезна."
                        value={description}
                      />
                    </div>
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
                        formData.append("name", name);
                        formData.append("district", district);
                        formData.append("todayTopic", todayTopic);
                        formData.append("description", description);

                        if (selectedImage) {
                          formData.append("image", selectedImage);
                        }

                        startTransition(async () => {
                          try {
                            await onCreateGroup(formData);
                            onClose();
                          } catch (error) {
                            setFeedback(
                              error instanceof Error
                                ? error.message
                                : "Не удалось создать группу.",
                            );
                          }
                        });
                      }}
                      type="button"
                    >
                      Создать группу
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
