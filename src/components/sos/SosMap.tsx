"use client";

import dynamic from "next/dynamic";
import { MapLoadingPlaceholder } from "@/components/map/MapLoadingPlaceholder";
import type { MapMarker } from "@/components/map/YandexMap";

const YandexMap = dynamic(
  () => import("@/components/map/YandexMap").then((mod) => mod.YandexMap),
  {
    ssr: false,
    loading: () => (
      <MapLoadingPlaceholder label="Собираем карту SOS-объявлений..." />
    ),
  },
);

type SosMapProps = {
  markers: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
};

export function SosMap({ markers, onMarkerClick }: SosMapProps) {
  return (
    <YandexMap
      markers={markers}
      zoom={11}
      height="600px"
      className="rounded-[2.5rem] border border-outline-variant/10"
      markerVariant="paw"
      onMarkerClick={onMarkerClick}
    />
  );
}
