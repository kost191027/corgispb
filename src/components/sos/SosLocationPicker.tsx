"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MapLoadingPlaceholder } from "@/components/map/MapLoadingPlaceholder";
import type { MapMarker } from "@/components/map/YandexMap";
import { reverseGeocodeCoordinates } from "@/lib/client/geocode";

const YandexMap = dynamic(
  () => import("@/components/map/YandexMap").then((mod) => mod.YandexMap),
  {
    ssr: false,
    loading: () => (
      <MapLoadingPlaceholder label="Подгружаем карту для точки пропажи..." />
    ),
  },
);

type SosLocationPickerProps = {
  address: string;
  latitude: number | null;
  longitude: number | null;
  isResolvingAddress?: boolean;
  addressStatus?: string | null;
  externalError?: string | null;
  onResolve: (next: {
    address: string;
    latitude: number | null;
    longitude: number | null;
  }) => void;
};

const EMPTY_MARKERS: MapMarker[] = [];

function ExpandedMapModal({
  isOpen,
  markers,
  center,
  isManualPlacementEnabled,
  isResolving,
  hasMarker,
  onClose,
  onToggleManualPlacement,
  onClearMarker,
  onMapClick,
}: {
  isOpen: boolean;
  markers: MapMarker[];
  center?: [number, number];
  isManualPlacementEnabled: boolean;
  isResolving: boolean;
  hasMarker: boolean;
  onClose: () => void;
  onToggleManualPlacement: () => void;
  onClearMarker: () => void;
  onMapClick?: (coordinates: [number, number]) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[10015] bg-black/65 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_30px_90px_rgba(25,20,16,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Закрыть увеличенную карту"
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-on-surface-variant shadow-md transition-colors hover:bg-primary-container hover:text-on-primary active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="border-b border-outline-variant/10 px-5 py-4 pr-16">
            <p className="font-display text-2xl font-black text-on-surface">
              Точка объявления на карте
            </p>
            <p className="mt-1 text-sm font-medium text-on-surface-variant">
              Увеличенный режим нужен для точной ручной постановки метки.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isResolving}
                onClick={onToggleManualPlacement}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${
                  isManualPlacementEnabled
                    ? "bg-tertiary text-white hover:bg-tertiary/90"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isManualPlacementEnabled
                  ? "Режим размещения включен"
                  : hasMarker
                    ? "Переставить вручную"
                    : "Поставить вручную"}
              </button>

              {hasMarker ? (
                <button
                  type="button"
                  onClick={onClearMarker}
                  className="rounded-full bg-surface-container-low px-4 py-2 text-xs font-black uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-container"
                >
                  Удалить метку
                </button>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <YandexMap
              markers={markers}
              center={center}
              markerVariant="paw"
              zoom={markers.length > 0 ? 15 : 11}
              height="min(78dvh,720px)"
              className="rounded-none border-none shadow-none"
              onMapClick={isManualPlacementEnabled ? onMapClick : undefined}
            />

            {isManualPlacementEnabled ? (
              <div className="pointer-events-none absolute inset-x-4 top-4 z-20 rounded-2xl bg-white/92 px-4 py-3 text-xs font-black uppercase tracking-widest text-on-surface shadow-lg backdrop-blur-sm">
                Нажмите на карту, чтобы поставить или переставить метку
              </div>
            ) : null}

            {isResolving ? (
              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 rounded-2xl bg-primary/92 px-4 py-3 text-xs font-black uppercase tracking-widest text-on-primary shadow-lg backdrop-blur-sm">
                Определяем адрес и обновляем точку...
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function SosLocationPicker({
  address,
  latitude,
  longitude,
  isResolvingAddress = false,
  addressStatus = null,
  externalError = null,
  onResolve,
}: SosLocationPickerProps) {
  const [isManualPlacementEnabled, setIsManualPlacementEnabled] =
    useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isManualResolving, setIsManualResolving] = useState(false);

  const hasMarker =
    typeof latitude === "number" && typeof longitude === "number";

  const markers: MapMarker[] = useMemo(
    () =>
      hasMarker
        ? [
            {
              id: "sos-location",
              coordinates: [longitude, latitude],
              title: address || "Точка на карте",
              subtitle: "Метка объявления SOS",
              color: "red",
            },
          ]
        : EMPTY_MARKERS,
    [address, hasMarker, latitude, longitude],
  );

  const mapCenter = hasMarker ? ([longitude, latitude] as [number, number]) : undefined;

  const clearMarker = () => {
    onResolve({ address, latitude: null, longitude: null });
    setIsManualPlacementEnabled(false);
    setInternalError(null);
  };

  const handleManualMapClick = async ([nextLongitude, nextLatitude]: [
    number,
    number,
  ]) => {
    setIsManualResolving(true);
    setInternalError(null);

    try {
      const result = await reverseGeocodeCoordinates(
        nextLatitude,
        nextLongitude,
      );

      onResolve(result);
      setIsManualPlacementEnabled(false);
    } catch (resolveError) {
      setInternalError(
        resolveError instanceof Error
          ? resolveError.message
          : "Не удалось определить адрес по метке.",
      );
      onResolve({
        address,
        latitude: nextLatitude,
        longitude: nextLongitude,
      });
    } finally {
      setIsManualResolving(false);
    }
  };

  const combinedError = internalError || externalError;
  const isBusy = isResolvingAddress || isManualResolving;

  return (
    <div className="space-y-3">
      <div className="rounded-[1.5rem] border border-outline-variant/15 bg-surface-container-lowest p-3 shadow-sm">
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => {
              setIsManualPlacementEnabled((current) => !current);
              setInternalError(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${
              isManualPlacementEnabled
                ? "bg-tertiary text-white hover:bg-tertiary/90"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isManualPlacementEnabled
              ? "Режим размещения включен"
              : hasMarker
                ? "Переставить вручную"
                : "Поставить вручную"}
          </button>

          <button
            type="button"
            onClick={() => setIsMapExpanded(true)}
            className="rounded-full bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-on-primary transition-colors hover:bg-primary/90"
          >
            Развернуть карту
          </button>

          {hasMarker ? (
            <button
              type="button"
              onClick={clearMarker}
              className="rounded-full bg-surface-container-low px-4 py-2 text-xs font-black uppercase tracking-widest text-on-surface transition-colors hover:bg-surface-container"
            >
              Удалить метку
            </button>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-high shadow-inner">
          <div className="relative">
            <YandexMap
              markers={markers}
              center={mapCenter}
              markerVariant="paw"
              zoom={markers.length > 0 ? 14 : 11}
              height="260px"
              className="rounded-none border-none shadow-none"
              onMapClick={
                isManualPlacementEnabled ? handleManualMapClick : undefined
              }
            />

            {isManualPlacementEnabled ? (
              <div className="pointer-events-none absolute inset-x-3 top-3 z-20 rounded-2xl bg-white/92 px-4 py-3 text-xs font-black uppercase tracking-widest text-on-surface shadow-lg backdrop-blur-sm">
                Нажмите на карту, чтобы поставить или переставить метку
              </div>
            ) : null}

            {isBusy ? (
              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-primary/92 px-4 py-3 text-xs font-black uppercase tracking-widest text-on-primary shadow-lg backdrop-blur-sm">
                Определяем адрес и обновляем точку...
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {hasMarker ? (
        <div className="rounded-2xl bg-primary/5 px-4 py-3 text-xs font-bold leading-relaxed text-on-surface">
          Метка размещена. Если точка неточная, включите «Поставить вручную»
          или откройте увеличенную карту.
        </div>
      ) : isManualPlacementEnabled ? (
        <div className="rounded-2xl bg-tertiary/10 px-4 py-3 text-xs font-bold leading-relaxed text-on-surface">
          Ручной режим активен. Нажмите на карту или разверните ее для точной
          постановки.
        </div>
      ) : (
        <div className="rounded-2xl bg-surface-container-high px-4 py-3 text-xs font-bold leading-relaxed text-on-surface-variant">
          Напишите адрес в поле справа и просто выйдите из него. Метка
          поставится автоматически, а затем ее можно вручную скорректировать.
        </div>
      )}

      {addressStatus ? (
        <div className="rounded-2xl bg-surface-container-lowest px-4 py-3 text-xs font-bold leading-relaxed text-on-surface-variant shadow-sm">
          {addressStatus}
        </div>
      ) : null}

      {hasMarker ? (
        <div className="rounded-2xl bg-surface-container-lowest px-4 py-3 text-xs font-bold leading-relaxed text-on-surface-variant shadow-sm">
          Координаты: {latitude?.toFixed(6)}, {longitude?.toFixed(6)}
        </div>
      ) : null}

      {combinedError ? (
        <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-xs font-bold leading-relaxed text-error">
          {combinedError}
        </div>
      ) : null}

      <ExpandedMapModal
        isOpen={isMapExpanded}
        markers={markers}
        center={mapCenter}
        isManualPlacementEnabled={isManualPlacementEnabled}
        isResolving={isBusy}
        hasMarker={hasMarker}
        onClose={() => setIsMapExpanded(false)}
        onToggleManualPlacement={() =>
          setIsManualPlacementEnabled((current) => !current)
        }
        onClearMarker={clearMarker}
        onMapClick={handleManualMapClick}
      />
    </div>
  );
}
