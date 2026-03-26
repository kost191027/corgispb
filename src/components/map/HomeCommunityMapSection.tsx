"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import {
  COMMUNITY_MAP_CATEGORIES,
  COMMUNITY_MAP_SPOTS,
  type CommunityMapCategory,
  toCommunityMapMarker,
} from "@/lib/map-spots";

export function HomeCommunityMapSection() {
  const [selectedCategory, setSelectedCategory] = useState<CommunityMapCategory>("all");
  const [selectedSpotId, setSelectedSpotId] = useState(COMMUNITY_MAP_SPOTS[0]?.id ?? "");

  const filteredSpots = useMemo(() => {
    if (selectedCategory === "all") {
      return COMMUNITY_MAP_SPOTS;
    }

    return COMMUNITY_MAP_SPOTS.filter((spot) => spot.category === selectedCategory);
  }, [selectedCategory]);

  const selectedSpot =
    filteredSpots.find((spot) => spot.id === selectedSpotId) ?? filteredSpots[0] ?? COMMUNITY_MAP_SPOTS[0];

  const markers = useMemo(() => filteredSpots.map(toCommunityMapMarker), [filteredSpots]);

  return (
    <section className="bg-white px-6 py-24" id="map">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">
        <div className="order-2 h-full min-h-[400px] lg:col-span-7 lg:order-1">
          <ClientYandexMap
            markers={markers}
            loadingLabel="Подгружаем карту прогулок..."
            onMarkerClick={(marker) => setSelectedSpotId(marker.id)}
          />
        </div>

        <div className="order-1 lg:col-span-5 lg:order-2">
          <h2 className="mb-8 font-display text-4xl font-black leading-tight text-on-surface lg:text-5xl">
            Где погулять пушистым?
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
            Мы отметили лучшие dog-friendly парки, уютные кафе и точки районных встреч, где корги всегда рады.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {COMMUNITY_MAP_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedSpotId(
                      (category.id === "all"
                        ? COMMUNITY_MAP_SPOTS[0]
                        : COMMUNITY_MAP_SPOTS.find((spot) => spot.category === category.id))?.id ?? "",
                    );
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">{category.iconName}</span>
                  {category.label}
                </button>
              );
            })}
          </div>

          {selectedSpot ? (
            <div className="rounded-[2rem] border border-primary/10 bg-surface-container-low p-6 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-primary">
                  {selectedSpot.badge}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {selectedSpot.district}
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-black text-on-surface">{selectedSpot.title}</h3>
              <p className="mb-2 text-sm font-bold text-primary">{selectedSpot.subtitle}</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">{selectedSpot.description}</p>
            </div>
          ) : null}

          <div className="mt-8">
            <Link
              href="/community/map"
              className="inline-block rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-white transition-all hover:bg-orange-600"
            >
              Открыть полную карту
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
