"use client";

import Link from "next/link";
import React from "react";
import AddPetModal from "@/components/shared/AddPetModal";
import type { PetRecord } from "@/lib/pets";

interface PetsGalleryClientProps {
  pets: PetRecord[];
  canAddPet: boolean;
}

export function PetsGalleryClient({ pets, canAddPet }: PetsGalleryClientProps) {
  const [isAddPetModalOpen, setIsAddPetModalOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [breedFilter, setBreedFilter] = React.useState<"Все" | string>("Все");

  const filteredPets = React.useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        !searchValue ||
        pet.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        pet.traits.some((trait) => trait.toLowerCase().includes(searchValue.toLowerCase()));

      const matchesBreed = breedFilter === "Все" || pet.breed === breedFilter;

      return matchesSearch && matchesBreed;
    });
  }, [breedFilter, pets, searchValue]);

  const featuredPets = pets.slice(0, 3);
  const heroPet = pets[0];

  return (
    <>
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <section className="mb-16 relative overflow-hidden rounded-xl bg-surface-container-low p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="z-10 max-w-xl">
            <h1 className="font-display font-black text-5xl lg:text-7xl text-on-surface leading-tight mb-6 tracking-tighter">
              Наши <span className="text-primary italic">любимцы</span>
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 font-medium">
              Познакомьтесь с живой галереей сообщества. Новые корги из кабинета сразу появляются здесь со своими фото, районом прогулок и характером.
            </p>
            {canAddPet ? (
              <button
                className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => setIsAddPetModalOpen(true)}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  add_circle
                </span>
                Добавить хвостика
              </button>
            ) : (
              <Link className="inline-flex bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300" href="/login">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  login
                </span>
                Войти и добавить питомца
              </Link>
            )}
          </div>
          <div className="relative w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-xl shadow-2xl bg-surface-container-high">
            {heroPet?.mainPhotoUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`Галерея корги ${heroPet.name}`} className="w-full h-full object-cover" src={heroPet.mainPhotoUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-on-surface shadow-lg">
                  Новый хвостик: {heroPet.name}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-7xl">pets</span>
              </div>
            )}
          </div>
        </section>

        {featuredPets.length ? (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[2px] w-12 bg-primary" />
              <h2 className="font-display font-extrabold text-2xl uppercase tracking-widest text-primary">Недавно добавлены</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPets.map((pet, index) => (
                <Link
                  className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/15 flex items-center gap-6 shadow-xl relative overflow-hidden group"
                  href={`/pets/${pet.id}`}
                  key={`featured-${pet.id}`}
                  scroll={false}
                >
                  <div className="relative">
                    {pet.mainPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={pet.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" src={pet.mainPhotoUrl} />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center text-outline border-4 border-white shadow-md">
                        <span className="material-symbols-outlined text-3xl">pets</span>
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl">{pet.name}</h3>
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        pets
                      </span>
                      <span>{pet.breed}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">{pet.district || "Санкт-Петербург"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-12 sticky top-20 z-40">
          <div className="bg-white/90 backdrop-blur-[20px] p-6 rounded-xl shadow-xl border border-outline-variant/10">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-1/3 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400">search</span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-high rounded-full border-none focus:ring-2 focus:ring-primary/40 text-on-surface font-medium"
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Искать по имени или характеру..."
                  type="text"
                  value={searchValue}
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-wrap gap-3 items-center">
                {["Все", "Пемброк", "Кардиган", "Другая"].map((item) => {
                  const isActive = breedFilter === item;
                  return (
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                      }`}
                      key={item}
                      onClick={() => setBreedFilter(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {filteredPets.length ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <Link className="group" href={`/pets/${pet.id}`} key={`grid-${pet.id}`} scroll={false}>
                <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-ambient h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
                  <div className="relative h-72 overflow-hidden flex-shrink-0 bg-surface-container-high">
                    {pet.mainPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={`Корги ${pet.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={pet.mainPhotoUrl} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-6xl">pets</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        location_on
                      </span>
                      <span className="text-xs font-bold text-on-surface">{pet.district || "Санкт-Петербург"}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div>
                        <h4 className="font-display font-black text-2xl text-on-surface pr-2">{pet.name}</h4>
                        <p className="text-sm text-on-surface-variant mt-1">{pet.age || pet.breed}</p>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          pets
                        </span>
                        <span className="text-[10px] font-bold uppercase text-stone-400">{pet.gallery.length} фото</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {(pet.traits.length ? pet.traits : [pet.breed]).slice(0, 3).map((tag) => (
                        <span
                          className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface-variant"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-4 rounded-full bg-secondary-container text-on-secondary-container font-black text-sm uppercase tracking-widest hover:bg-secondary-fixed-dim transition-colors">
                      Подробнее
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <section className="rounded-[2rem] bg-surface-container-low p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white text-primary flex items-center justify-center shadow-sm mb-4">
              <span className="material-symbols-outlined text-3xl">search_off</span>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">Пока ничего не нашлось</h3>
            <p className="text-on-surface-variant">Попробуйте другой запрос или добавьте нового корги в галерею.</p>
          </section>
        )}

        {canAddPet ? (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              className="w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              onClick={() => setIsAddPetModalOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </button>
          </div>
        ) : null}
      </main>

      <AddPetModal isOpen={isAddPetModalOpen} onClose={() => setIsAddPetModalOpen(false)} />
    </>
  );
}
