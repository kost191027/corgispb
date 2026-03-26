"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { updateCurrentUserProfile } from "@/actions/profile";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    city?: string;
    bio?: string;
    avatarUrl?: string;
    email: string;
  };
}

export function ProfileEditModal({ isOpen, onClose, user }: ProfileEditModalProps) {
  const router = useRouter();
  const [name, setName] = React.useState(user.name);
  const [city, setCity] = React.useState(user.city || "Санкт-Петербург");
  const [bio, setBio] = React.useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = React.useState(user.avatarUrl || "");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(user.name);
    setCity(user.city || "Санкт-Петербург");
    setBio(user.bio || "");
    setAvatarUrl(user.avatarUrl || "");
    setErrorMessage("");
  }, [isOpen, user.avatarUrl, user.bio, user.city, user.name]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("city", city);
        formData.append("bio", bio);
        formData.append("avatarUrl", avatarUrl);

        const result = await updateCurrentUserProfile(formData);

        if (!result.ok) {
          setErrorMessage(result.message);
          return;
        }

        onClose();
        router.refresh();
      } catch (error) {
        console.error("Profile edit failed", error);
        setErrorMessage("Не удалось сохранить профиль. Попробуйте еще раз.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[min(640px,calc(100vw-24px))] max-w-[640px] max-h-[calc(100dvh-24px)] overflow-y-auto border-none bg-surface-container-lowest p-0 sm:rounded-[2rem]">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight">Редактировать профиль</h2>
              <p className="text-on-surface-variant mt-2">Имя, город и короткая история появятся в кабинете и в публичной ссылке профиля.</p>
            </div>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors" onClick={onClose} type="button">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Имя</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setName(event.target.value)}
                required
                type="text"
                value={name}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email</label>
              <input className="w-full px-6 py-4 bg-surface-container-high rounded-full text-on-surface-variant" readOnly type="email" value={user.email} />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Город</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setCity(event.target.value)}
                type="text"
                value={city}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Ссылка на аватар</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setAvatarUrl(event.target.value)}
                placeholder="https://..."
                type="url"
                value={avatarUrl}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">О себе</label>
              <textarea
                className="w-full px-6 py-4 bg-surface-container-high rounded-[1.5rem] focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all resize-none"
                onChange={(event) => setBio(event.target.value)}
                rows={4}
                value={bio}
              />
            </div>

            {errorMessage ? (
              <div className="rounded-2xl bg-error-container/70 px-5 py-4 text-sm font-medium text-on-error-container">{errorMessage}</div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                className="bg-gradient-to-r from-primary to-primary-container text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex-1"
                disabled={isPending}
                type="submit"
              >
                {isPending ? "Сохраняем..." : "Сохранить профиль"}
              </button>
              <button
                className="px-10 py-4 bg-surface-container-highest text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-all flex-1 active:scale-95"
                disabled={isPending}
                onClick={onClose}
                type="button"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
