"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createPet } from "@/actions/pets";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { APP_SELECT_CLASS, APP_SELECT_ICON_WRAPPER_CLASS } from "@/lib/forms";
import { PET_BREEDS, PET_DISTRICTS, PET_TRAITS } from "@/lib/pets";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_PHOTOS = [null, null, null, null] as Array<File | null>;

function AddPetSubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      className="bg-gradient-to-r from-primary to-primary-container text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex-1 order-2 sm:order-1 disabled:opacity-60 disabled:hover:scale-100"
      disabled={disabled}
      type="submit"
    >
      {disabled ? "Сохраняем..." : "Добавить в профиль"}
    </button>
  );
}

export default function AddPetModal({ isOpen, onClose }: AddPetModalProps) {
  const router = useRouter();
  const fileInputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [breed, setBreed] = React.useState<(typeof PET_BREEDS)[number]>("Пемброк");
  const [district, setDistrict] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedTraits, setSelectedTraits] = React.useState<string[]>([]);
  const [photos, setPhotos] = React.useState<Array<File | null>>(INITIAL_PHOTOS);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const previewUrls = React.useMemo(
    () =>
      photos.map((file) => {
        if (!file) {
          return null;
        }

        return URL.createObjectURL(file);
      }),
    [photos],
  );

  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  function resetForm() {
    setName("");
    setAge("");
    setBreed("Пемброк");
    setDistrict("");
    setDescription("");
    setSelectedTraits([]);
    setPhotos(INITIAL_PHOTOS);
    setErrorMessage("");
    fileInputRefs.current.forEach((input) => {
      if (input) {
        input.value = "";
      }
    });
  }

  function handleClose() {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      handleClose();
    }
  }

  function handlePhotoClick(index: number) {
    fileInputRefs.current[index]?.click();
  }

  function handlePhotoChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotos((current) => {
      const next = [...current];
      next[index] = file;
      return next;
    });
  }

  function handleRemovePhoto(index: number) {
    setPhotos((current) => {
      const next = [...current];
      next[index] = null;
      return next;
    });

    const input = fileInputRefs.current[index];
    if (input) {
      input.value = "";
    }
  }

  function promotePhoto(index: number) {
    if (!photos[index]) {
      return;
    }

    setPhotos((current) => {
      const next = [...current];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  }

  function toggleTrait(trait: string) {
    setSelectedTraits((current) =>
      current.includes(trait)
        ? current.filter((item) => item !== trait)
        : [...current, trait],
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("age", age.trim());
      formData.append("breed", breed);
      formData.append("district", district);
      formData.append("description", description.trim());
      formData.append("traits", JSON.stringify(selectedTraits));

      photos.forEach((file) => {
        if (file) {
          formData.append("photos", file);
        }
      });

      const result = await createPet(formData);

      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      resetForm();
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Add pet submit failed", error);
      setErrorMessage("Не удалось отправить форму. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const mainPhotoUrl = previewUrls[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[min(1080px,calc(100vw-24px))] max-w-[1080px] max-h-[calc(100dvh-24px)] md:h-[min(88dvh,860px)] border-none bg-surface-container-lowest p-0 overflow-y-auto md:overflow-hidden sm:rounded-[2rem]">
        <div className="flex min-h-0 h-full flex-col md:flex-row font-body">
          <div className="min-h-0 w-full md:w-5/12 bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant/15 p-5 sm:p-6 md:p-8 overflow-y-auto hide-scrollbar">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold font-headline text-on-surface-variant flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    photo_camera
                  </span>
                  Фотографии
                </h3>
                <button
                  className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                  onClick={handleClose}
                  type="button"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <input
                accept="image/*"
                className="hidden"
                onChange={(event) => handlePhotoChange(0, event)}
                ref={(element) => {
                  fileInputRefs.current[0] = element;
                }}
                type="file"
              />

              <button
                className="aspect-square w-full rounded-[1.75rem] border-2 border-dashed border-outline-variant/40 bg-surface-container flex flex-col items-center justify-center gap-4 text-outline group hover:border-primary/50 transition-colors cursor-pointer overflow-hidden relative"
                onClick={() => handlePhotoClick(0)}
                type="button"
              >
                {mainPhotoUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Главное фото питомца" className="w-full h-full object-cover" src={mainPhotoUrl} />
                    <div className="absolute inset-x-4 bottom-4 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 text-center text-sm font-bold text-on-surface shadow-lg">
                      Главное фото
                    </div>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-5xl">add_a_photo</span>
                    <div className="text-center px-6">
                      <p className="font-bold text-on-surface">Главное фото</p>
                      <p className="text-sm opacity-60">Нажмите для выбора</p>
                    </div>
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-3">
                {photos.slice(1).map((file, index) => {
                  const slotIndex = index + 1;
                  const previewUrl = previewUrls[slotIndex];

                  return (
                    <div key={slotIndex} className="relative">
                      <input
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => handlePhotoChange(slotIndex, event)}
                        ref={(element) => {
                          fileInputRefs.current[slotIndex] = element;
                        }}
                        type="file"
                      />

                      {previewUrl ? (
                        <button
                          className="group relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-transparent shadow-sm hover:border-primary transition-all"
                          onClick={() => promotePhoto(slotIndex)}
                          type="button"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt={`Дополнительное фото ${slotIndex}`} className="w-full h-full object-cover" src={previewUrl} />
                          <span className="absolute inset-x-2 bottom-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface shadow-sm">
                            В главное
                          </span>
                        </button>
                      ) : (
                        <button
                          className="aspect-square w-full rounded-2xl border-2 border-dashed border-outline-variant/40 bg-surface-container flex items-center justify-center text-outline hover:border-primary/50 hover:bg-surface-container-high transition-colors"
                          onClick={() => handlePhotoClick(slotIndex)}
                          type="button"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      )}

                      {file ? (
                        <button
                          aria-label="Удалить фото"
                          className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-on-surface shadow-md hover:bg-error-container hover:text-on-error-container transition-colors"
                          onClick={() => handleRemovePhoto(slotIndex)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-surface p-5 text-sm text-tertiary border border-outline-variant/15">
                Дополнительные фото уже можно загрузить и переставить местами. В карточке питомца они будут собраны в галерею.
              </div>
            </div>
          </div>

          <div className="min-h-0 w-full md:w-7/12 p-5 sm:p-6 md:p-10 overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight flex items-center gap-3">
                  Добавить хвостика
                  <span
                    className="material-symbols-outlined text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    pets
                  </span>
                </h2>
                <p className="text-on-surface-variant">
                  Сохраним питомца в профиль и сразу подготовим данные для галереи.
                </p>
              </div>
              <button
                className="hidden md:inline-flex p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 text-outline"
                onClick={handleClose}
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-7" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Кличка
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Напр. Арчи"
                    required
                    type="text"
                    value={name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Возраст
                  </label>
                  <input
                    className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant"
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="Напр. 2 года"
                    type="text"
                    value={age}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  Порода
                </label>
                <div className="flex flex-wrap gap-3">
                  {PET_BREEDS.map((item) => {
                    const isActive = breed === item;

                    return (
                      <button
                        className={`px-6 py-3 rounded-full transition-all ${
                          isActive
                            ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm ring-2 ring-secondary/20"
                            : "bg-surface-container-high text-on-surface-variant font-medium hover:bg-surface-container-highest"
                        }`}
                        key={item}
                        onClick={() => setBreed(item)}
                        type="button"
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  Район прогулок
                </label>
                <div className="relative">
                  <select
                    className={APP_SELECT_CLASS}
                    onChange={(event) => setDistrict(event.target.value)}
                    value={district}
                  >
                    <option value="">Выберите район</option>
                    {PET_DISTRICTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <span className={APP_SELECT_ICON_WRAPPER_CLASS}>
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  Характер
                </label>
                <div className="flex flex-wrap gap-2">
                  {PET_TRAITS.map((trait) => {
                    const isActive = selectedTraits.includes(trait);

                    return (
                      <button
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                          isActive
                            ? "bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary/30"
                            : "bg-surface-container-highest hover:bg-primary-fixed"
                        }`}
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        type="button"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{trait}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  О характере
                </label>
                <textarea
                  className="w-full px-6 py-4 bg-surface-container-high rounded-[1.5rem] focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant resize-none"
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Расскажите небольшую историю о вашем корги..."
                  rows={4}
                  value={description}
                />
              </div>

              {errorMessage ? (
                <div className="rounded-2xl bg-error-container/70 px-5 py-4 text-sm font-medium text-on-error-container">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <AddPetSubmitButton disabled={isSubmitting} />
                <button
                  className="px-10 py-4 bg-surface-container-highest text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-all flex-1 order-1 sm:order-2 active:scale-95 disabled:opacity-60"
                  disabled={isSubmitting}
                  onClick={handleClose}
                  type="button"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
