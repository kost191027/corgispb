"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AddCommunityPointModal } from "@/components/map/AddCommunityPointModal";
import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import {
  COMMUNITY_MAP_CATEGORIES,
  type CommunityMapCategory,
  toCommunityMapMarker,
} from "@/lib/map-spots";
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
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-on-secondary-container">
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
      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
      href={author.profileHref || `/owners/${author.id}`}
    >
      <span className="material-symbols-outlined text-sm">person</span>
      {author.name}
    </Link>
  );
}

export function HomeCommunityMapSection() {
  const { viewer, points, createPoint } = useCommunityMapData();
  const [selectedCategory, setSelectedCategory] = useState<CommunityMapCategory>("all");
  const [selectedSpotId, setSelectedSpotId] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredSpots = useMemo(() => {
    if (selectedCategory === "all") {
      return points;
    }

    return points.filter((spot) => spot.category === selectedCategory);
  }, [points, selectedCategory]);

  const selectedSpot =
    filteredSpots.find((spot) => spot.id === selectedSpotId) ??
    filteredSpots[0] ??
    null;

  const markers = useMemo(() => filteredSpots.map(toCommunityMapMarker), [filteredSpots]);

  return (
    <section className="bg-white px-6 py-24" id="map">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:items-center">
        <div className="order-2 h-full min-h-[400px] lg:col-span-7 lg:order-1">
          <ClientYandexMap
            enableClustering
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
                    setSelectedSpotId(category.id === "all" ? points[0]?.id ?? "" : points.find((spot) => spot.category === category.id)?.id ?? "");
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
              <SpotAuthorMeta author={selectedSpot.author} />
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/community/map"
              className="inline-block rounded-full bg-primary px-8 py-4 font-display text-lg font-bold text-white transition-all hover:bg-orange-600"
            >
              Открыть полную карту
            </Link>
            <div className="group relative">
              <button
                className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                onClick={() => setIsAddModalOpen(true)}
                title="Добавить точку"
                type="button"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-full bg-on-surface px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-surface opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Добавить точку
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCommunityPointModal
        isOpen={isAddModalOpen}
        viewer={viewer}
        onClose={() => setIsAddModalOpen(false)}
        onCreatePoint={createPoint}
      />
    </section>
  );
}
