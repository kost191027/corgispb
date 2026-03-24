"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps3: any;
    __ymaps3_loading?: Promise<void>;
  }
}

export interface MapMarker {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  title: string;
  subtitle?: string;
  color?: "red" | "green" | "blue" | "orange" | "teal";
}

interface YandexMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: string;
}

const MARKER_COLORS: Record<string, string> = {
  red: "#dc2626",
  green: "#16a34a",
  blue: "#2563eb",
  orange: "#ea580c",
  teal: "#0d9488",
};

// Singleton script loader — prevents multiple script injections
function loadYmapsScript(apiKey: string): Promise<void> {
  if (window.ymaps3) return Promise.resolve();
  if (window.__ymaps3_loading) return window.__ymaps3_loading;

  window.__ymaps3_loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Yandex Maps script"));
    document.head.appendChild(script);
  });

  return window.__ymaps3_loading;
}

export function YandexMap({
  center = [30.315868, 59.939095], // Saint Petersburg
  zoom = 12,
  markers = [],
  className = "",
  height = "500px",
}: YandexMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;

  const initMap = useCallback(async () => {
    if (!mapContainer.current || mapInstance.current) return;

    try {
      await loadYmapsScript(apiKey!);
      await window.ymaps3.ready;

      const ymaps3 = window.ymaps3;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

      const map = new YMap(mapContainer.current, {
        location: { center, zoom },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      // Add markers
      markers.forEach((marker) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 36px; height: 36px;
          background: ${MARKER_COLORS[marker.color || "orange"]};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        `;
        el.innerHTML = `<span style="color:white;font-size:16px;font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 1">location_on</span>`;
        el.title = marker.title;
        el.onmouseenter = () => { el.style.transform = "scale(1.3)"; };
        el.onmouseleave = () => { el.style.transform = "scale(1)"; };

        const ymapMarker = new YMapMarker(
          { coordinates: marker.coordinates },
          el
        );
        map.addChild(ymapMarker);
      });

      mapInstance.current = map;
      setStatus("ready");
    } catch (e) {
      console.error("Yandex Maps error:", e);
      setStatus("error");
    }
  }, [center, zoom, markers, apiKey]);

  useEffect(() => {
    if (apiKey) {
      initMap();
    }
  }, [initMap, apiKey]);

  if (!apiKey) {
    return (
      <div
        className={`w-full rounded-[2rem] overflow-hidden bg-surface-container-high flex items-center justify-center ${className}`}
        style={{ minHeight: height }}
      >
        <div className="text-center text-on-surface-variant p-8">
          <span className="material-symbols-outlined text-4xl mb-2 block opacity-40">map</span>
          <p className="font-bold">API-ключ Яндекс.Карт не настроен</p>
          <p className="text-sm mt-1 opacity-60">Добавьте NEXT_PUBLIC_YANDEX_MAPS_KEY в .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className={`w-full rounded-[2rem] overflow-hidden shadow-ambient bg-surface-container-high relative ${className}`}
      style={{ minHeight: height }}
    >
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 z-10">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-on-surface-variant/60">Загрузка карты...</span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant flex-col gap-2 z-10">
          <span className="material-symbols-outlined text-3xl opacity-40">error</span>
          <p className="font-bold text-sm">Не удалось загрузить карту</p>
          <p className="text-xs opacity-50">Проверьте API-ключ и сетевое подключение</p>
        </div>
      )}
    </div>
  );
}
