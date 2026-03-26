"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { PetRecord } from "@/lib/pets";

export function PetDetailContent({ pet }: { pet: PetRecord }) {
  const gallery = pet.gallery;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

  const showPrevious = React.useCallback(() => {
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  }, [gallery.length]);

  const showNext = React.useCallback(() => {
    setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  }, [gallery.length]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [pet.id]);

  React.useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, showNext, showPrevious]);

  return (
    <>
      <div className="bg-surface-container-lowest w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-auto md:h-[680px] rounded-[2.5rem]">
        <div className="w-full md:w-1/2 relative bg-stone-100 h-[320px] md:h-full">
          {gallery.length ? (
            <button className="h-full w-full" onClick={() => setIsLightboxOpen(true)} type="button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={pet.name} className="w-full h-full object-cover" src={gallery[activeIndex]} />
            </button>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-7xl">pets</span>
            </div>
          )}

          {gallery.length > 1 ? (
            <>
              <button
                aria-label="Предыдущее фото"
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-md shadow-lg text-on-surface hover:bg-white transition-colors"
                onClick={showPrevious}
                type="button"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                aria-label="Следующее фото"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-md shadow-lg text-on-surface hover:bg-white transition-colors"
                onClick={showNext}
                type="button"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          ) : null}

          {gallery.length ? (
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-4 gap-2">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  className={`aspect-square rounded-2xl border-2 ${
                    index === activeIndex ? "border-primary" : "border-transparent"
                  } overflow-hidden shadow-lg cursor-pointer hover:border-primary transition-all bg-white/70`}
                  key={`${pet.id}-gallery-${index}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`${pet.name} photo ${index + 1}`} className="w-full h-full object-cover" src={image} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="font-display text-4xl font-black text-on-surface tracking-tight mb-1">{pet.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-tertiary">
                {pet.district ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {pet.district}
                  </span>
                ) : null}
                {pet.age ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">cake</span>
                    {pet.age}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <span className="text-primary font-black text-sm">{pet.breed}</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-on-surface-variant leading-relaxed text-lg italic">
              {pet.description || "Хозяин пока только начал заполнять карточку, но уже можно познакомиться с хвостатым поближе."}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-primary">Особенности</h4>
            <div className="flex flex-wrap gap-2">
              {(pet.traits.length ? pet.traits : ["Новый хвостик"]).map((trait) => (
                <span
                  className="bg-surface-container-high px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                  key={trait}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">chat</span>
              Связаться с хозяином
            </button>
            <button className="w-full py-4 bg-surface-container-high text-on-surface rounded-full font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all duration-300 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">directions_walk</span>
              Позвать гулять
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isLightboxOpen && gallery.length > 0} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="w-[min(96vw,1100px)] max-w-[1100px] border-none bg-transparent p-0 shadow-none">
          <div className="relative overflow-hidden rounded-[2rem] bg-black/90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={`${pet.name} enlarged`} className="max-h-[85dvh] w-full object-contain" src={gallery[activeIndex]} />
            {gallery.length > 1 ? (
              <>
                <button
                  aria-label="Предыдущее фото"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition-colors"
                  onClick={showPrevious}
                  type="button"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  aria-label="Следующее фото"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition-colors"
                  onClick={showNext}
                  type="button"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </>
            ) : null}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-sm font-bold text-white">
              {activeIndex + 1} / {gallery.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
