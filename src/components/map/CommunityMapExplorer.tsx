"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import {
  COMMUNITY_MAP_CATEGORIES,
  type CommunityMapCategory,
  toCommunityMapMarker,
} from "@/lib/map-spots";
import {
  incrementCommunityMapClickCount,
  readCommunityMapClickCounts,
  type CommunityMapClickCounts,
} from "@/lib/community-map-clicks";
import { useCommunityMapData } from "@/components/map/useCommunityMapData";

function SpotAuthorMeta({
  author,
}: {
  author?: {
    id?: string;
    name: string;
    profileHref?: string;
    isAdmin?: boolean;
  };
}) {
  if (!author) {
    return null;
  }

  if (author.isAdmin) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-on-secondary-container">
        <span className="relative flex h-5 w-6 items-center justify-center">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
        </span>
        Администратор
      </div>
    );
  }

  return (
    <Link
      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
      href={author.profileHref || `/owners/${author.id}`}
    >
      <span className="material-symbols-outlined text-sm">person</span>
      {author.name}
    </Link>
  );
}

export function CommunityMapExplorer() {
  const { points, districtStats } = useCommunityMapData();
  const [selectedCategory, setSelectedCategory] = useState<CommunityMapCategory>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedSpotId, setSelectedSpotId] = useState("");
  const [clickCounts, setClickCounts] = useState<CommunityMapClickCounts>({});

  useEffect(() => {
    setClickCounts(readCommunityMapClickCounts());
  }, []);

  const filteredSpots = useMemo(() => {
    return points.filter((spot) => {
      const matchesCategory =
        selectedCategory === "all" || spot.category === selectedCategory;
      const matchesDistrict = !selectedDistrict || spot.district === selectedDistrict;

      return matchesCategory && matchesDistrict;
    });
  }, [points, selectedCategory, selectedDistrict]);

  const selectedSpot =
    filteredSpots.find((spot) => spot.id === selectedSpotId) ??
    filteredSpots[0] ??
    null;

  const markers = useMemo(() => filteredSpots.map(toCommunityMapMarker), [filteredSpots]);
  const activeSpots = useMemo(() => {
    return [...filteredSpots]
      .sort((left, right) => {
        const rightCount = clickCounts[right.id] || 0;
        const leftCount = clickCounts[left.id] || 0;

        if (rightCount !== leftCount) {
          return rightCount - leftCount;
        }

        return left.title.localeCompare(right.title, "ru");
      })
      .slice(0, 7);
  }, [clickCounts, filteredSpots]);

  function handleMapMarkerClick(spotId: string) {
    setSelectedSpotId(spotId);
    setClickCounts(incrementCommunityMapClickCount(spotId));
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-6 pb-12 pt-28">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-tertiary-container/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-tertiary-container">
            <span className="material-symbols-outlined text-sm">location_on</span>
            Районы города
          </div>
          <h1 className="mb-3 font-display text-4xl font-black text-on-surface md:text-5xl">
            Где мы гуляем?
          </h1>
          <p className="max-w-3xl text-lg text-on-surface-variant">
            Единая карта сообщества: парки, кафе и районные точки, где проще всего найти своих рядом.
          </p>
        </div>
        <div className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface-variant">
          {filteredSpots.length} точек по выбранным фильтрам
        </div>
      </div>

      <section className="mb-8 flex flex-col gap-12 md:flex-row md:items-start">
        <div className="w-full space-y-6 md:w-1/3">
          <p className="leading-relaxed text-on-surface-variant">
            Выберите район и сразу увидите, где уже есть свои: мы учитываем и владельцев корги, и отмеченные на карте места для прогулок, встреч и дог-френдли остановок.
          </p>
          <div className="max-h-[29rem] space-y-3 overflow-y-auto pr-1 md:max-h-[504px]">
            {districtStats.map((districtStat) => {
              const isActive = selectedDistrict === districtStat.district;

              return (
                <button
                  key={districtStat.district}
                  className={`flex min-h-[74px] w-full items-center justify-between gap-3 rounded-[1.35rem] p-4 text-left transition-colors ${
                    isActive
                      ? "border-l-4 border-primary bg-surface-container-low shadow-sm"
                      : "bg-surface-container-lowest hover:bg-surface-container"
                  }`}
                  onClick={() =>
                    setSelectedDistrict((current) =>
                      current === districtStat.district ? null : districtStat.district,
                    )
                  }
                  type="button"
                >
                  <div className="min-w-0">
                    <p className={`truncate ${isActive ? "font-bold text-on-surface" : "font-medium text-on-surface"}`}>
                      {districtStat.district}
                    </p>
                    <p className="mt-1 text-xs font-medium text-on-surface-variant">
                      {districtStat.pointsLabel} на карте
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${
                      isActive
                        ? "bg-primary/10 font-bold text-primary"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {districtStat.ownersLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-[520px] w-full md:w-2/3">
          <ClientYandexMap
            activeMarkerId={selectedSpot?.id ?? null}
            height="520px"
            enableClustering
            loadingLabel="Открываем полную карту прогулок..."
            markers={markers}
            onMarkerClick={(marker) => handleMapMarkerClick(marker.id)}
          />
        </div>
      </section>

      <section className="mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 border-y border-stone-100 py-4">
          <span className="mr-4 text-xs font-bold uppercase tracking-widest text-stone-400">Фильтры:</span>
          {COMMUNITY_MAP_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-stone-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
                type="button"
              >
                {category.label}
              </button>
            );
          })}
          {(selectedDistrict || selectedCategory !== "all") && (
            <button
              className="whitespace-nowrap rounded-full bg-surface-container-low px-6 py-2.5 text-sm font-bold text-primary"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDistrict(null);
              }}
              type="button"
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <h3 className="flex items-center gap-2 text-2xl font-bold">
            <span className="material-symbols-outlined text-primary">groups</span>
            Активные точки
          </h3>
          {activeSpots.map((spot) => {
            const isActive = selectedSpot?.id === spot.id;

            return (
              <button
                key={spot.id}
                className={`w-full rounded-xl p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-surface-container-low shadow-lg ring-2 ring-primary/20"
                    : "bg-surface-container-low hover:shadow-lg"
                }`}
                onClick={() => setSelectedSpotId(spot.id)}
                type="button"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{spot.iconName}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{spot.title}</h4>
                    <p className="text-xs text-on-surface-variant">{spot.district}</p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-on-surface-variant">{spot.subtitle}</p>
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
                  {spot.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-6 lg:col-span-2">
          {selectedSpot ? (
            <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-primary">
                  {selectedSpot.badge}
                </span>
                <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {selectedSpot.district}
                </span>
              </div>
              <h2 className="mb-2 text-3xl font-black text-on-surface">{selectedSpot.title}</h2>
              <p className="mb-4 text-sm font-bold text-primary">{selectedSpot.subtitle}</p>
              <p className="max-w-3xl leading-relaxed text-on-surface-variant">{selectedSpot.description}</p>
              <div className="mt-5">
                <SpotAuthorMeta author={selectedSpot.author} />
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {filteredSpots.map((spot) => (
              <div key={spot.id} className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">{spot.iconName}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{spot.title}</h4>
                    <p className="text-xs text-on-surface-variant">{spot.district}</p>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant">{spot.description}</p>
                <div className="mt-4">
                  <SpotAuthorMeta author={spot.author} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
