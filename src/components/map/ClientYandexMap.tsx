"use client";

import dynamic from "next/dynamic";
import { MapLoadingPlaceholder } from "@/components/map/MapLoadingPlaceholder";
import type { YandexMapProps } from "@/components/map/YandexMap";

const DynamicYandexMap = dynamic(
  () => import("@/components/map/YandexMap").then((mod) => mod.YandexMap),
  {
    ssr: false,
    loading: () => <MapLoadingPlaceholder label="Подгружаем карту..." />,
  },
);

type ClientYandexMapProps = YandexMapProps & {
  loadingLabel?: string;
};

export function ClientYandexMap({
  loadingLabel = "Подгружаем карту...",
  ...props
}: ClientYandexMapProps) {
  return (
    <div data-loading-label={loadingLabel} className="contents">
      <DynamicYandexMap {...props} />
    </div>
  );
}
