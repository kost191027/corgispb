"use client";

import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import type { MapMarker } from "@/components/map/YandexMap";

type SosMapProps = {
  markers: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
};

export function SosMap({ markers, onMarkerClick }: SosMapProps) {
  return (
    <ClientYandexMap
      loadingLabel="Собираем карту SOS-объявлений..."
      markers={markers}
      zoom={11}
      height="600px"
      className="rounded-[2.5rem] border border-outline-variant/10"
      markerVariant="paw"
      onMarkerClick={onMarkerClick}
    />
  );
}
