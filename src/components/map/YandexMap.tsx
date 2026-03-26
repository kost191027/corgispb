"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps3: any;
    __ymaps3_loading?: Promise<void>;
    __ymaps3_loading_key?: string;
  }
}

export interface MapMarker {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  title: string;
  subtitle?: string;
  color?: "red" | "green" | "blue" | "orange" | "teal";
  iconName?: string;
}

export interface YandexMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: string;
  markerVariant?: "pin" | "paw";
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (coordinates: [number, number]) => void;
}

const MARKER_COLORS: Record<string, string> = {
  red: "#dc2626",
  green: "#16a34a",
  blue: "#2563eb",
  orange: "#ea580c",
  teal: "#0d9488",
};

function getPawColors(color: MapMarker["color"]) {
  if (color === "teal") {
    return {
      base: "#2a676e",
      toe: "#79b3bb",
      outline: "rgba(255,255,255,0.94)",
      shadow: "rgba(42,103,110,0.34)",
    };
  }

  if (color === "red") {
    return {
      base: "#c56400",
      toe: "#ff9f36",
      outline: "rgba(255,255,255,0.96)",
      shadow: "rgba(144,77,0,0.3)",
    };
  }

  return {
    base: "#ff8c00",
    toe: "#ffba69",
    outline: "rgba(255,255,255,0.96)",
    shadow: "rgba(144,77,0,0.3)",
  };
}

// Singleton script loader — prevents multiple script injections
function loadYmapsScript(apiKey: string): Promise<void> {
  if (window.ymaps3?.ready) {
    return window.ymaps3.ready;
  }

  if (window.__ymaps3_loading && window.__ymaps3_loading_key === apiKey) {
    return window.__ymaps3_loading;
  }

  window.__ymaps3_loading = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-ymaps3-script="true"]',
    );

    if (existingScript && !existingScript.src.includes(`apikey=${apiKey}`)) {
      existingScript.remove();
      window.__ymaps3_loading = undefined;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.dataset.ymaps3Script = "true";
    script.onload = () => {
      const readyPromise = window.ymaps3?.ready;

      if (!readyPromise || typeof readyPromise.then !== "function") {
        script.remove();
        window.__ymaps3_loading = undefined;
        reject(new Error("Yandex Maps API did not expose ready()"));
        return;
      }

      readyPromise
        .then(() => resolve())
        .catch((error: unknown) => {
          script.remove();
          window.__ymaps3_loading = undefined;
          reject(
            error instanceof Error
              ? error
              : new Error("Yandex Maps ready() failed"),
          );
        });
    };
    script.onerror = () => {
      script.remove();
      window.__ymaps3_loading = undefined;
      reject(new Error("Failed to load Yandex Maps script"));
    };
    document.head.appendChild(script);
  });
  window.__ymaps3_loading_key = apiKey;

  return window.__ymaps3_loading;
}

function createPinMarkerElement(marker: MapMarker) {
  const el = document.createElement("div");
  const iconName = marker.iconName ?? "location_on";
  el.style.cssText = `
    width: 36px;
    height: 36px;
    background: ${MARKER_COLORS[marker.color || "orange"]};
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  `;
  el.innerHTML =
    `<span style="color:white;font-size:16px;font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 1">${iconName}</span>`;
  el.title = marker.title;
  el.onmouseenter = () => {
    el.style.transform = "scale(1.3)";
  };
  el.onmouseleave = () => {
    el.style.transform = "scale(1)";
  };

  return el;
}

function createPawMarkerElement(marker: MapMarker) {
  const wrapper = document.createElement("button");
  const bubble = document.createElement("div");
  const icon = document.createElement("div");
  const colors = getPawColors(marker.color);
  const pawPath =
    "M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm109-189q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29Zm240 0q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29Zm251 189q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z";

  wrapper.type = "button";
  wrapper.setAttribute("aria-label", marker.title);
  wrapper.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 66px;
    cursor: pointer;
    border: 0;
    padding: 0;
    background: transparent;
    transform-origin: center bottom;
    transition: transform 180ms ease;
  `;

  bubble.style.cssText = `
    position: absolute;
    left: 50%;
    bottom: calc(100% - 4px);
    transform: translate(-50%, 10px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    white-space: nowrap;
    border-radius: 9999px;
    background: rgba(255,255,255,0.96);
    color: #211a18;
    box-shadow: 0 14px 28px rgba(33,26,24,0.14);
    padding: 7px 12px;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  `;
  bubble.textContent = marker.title;

  icon.style.cssText = `
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 14px 22px ${colors.shadow});
  `;
  icon.innerHTML = `
    <svg viewBox="0 -960 960 960" width="58" height="58" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="${pawPath}" fill="${colors.base}" />
      <path d="${pawPath}" fill="${colors.toe}" opacity="0.2" transform="translate(0 -18)" />
      <path d="${pawPath}" fill="none" stroke="${colors.outline}" stroke-width="38" stroke-linejoin="round" />
    </svg>
  `;

  wrapper.appendChild(bubble);
  wrapper.appendChild(icon);

  wrapper.onmouseenter = () => {
    wrapper.style.transform = "translateY(-2px) scale(1.06)";
    bubble.style.opacity = "1";
    bubble.style.transform = "translate(-50%, 0)";
  };

  wrapper.onmouseleave = () => {
    wrapper.style.transform = "translateY(0) scale(1)";
    bubble.style.opacity = "0";
    bubble.style.transform = "translate(-50%, 10px)";
  };

  return wrapper;
}

export function YandexMap({
  center = [30.315868, 59.939095], // Saint Petersburg
  zoom = 12,
  markers = [],
  className = "",
  height = "500px",
  markerVariant = "pin",
  onMarkerClick,
  onMapClick,
}: YandexMapProps) {
  const mapHost = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY?.trim();

  const initMap = useCallback(async () => {
    if (!mapHost.current || mapInstance.current) return;

    try {
      await loadYmapsScript(apiKey!);
      await window.ymaps3.ready;

      const ymaps3 = window.ymaps3;
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapListener,
        YMapMarker,
      } = ymaps3;

      const map = new YMap(mapHost.current, {
        location: { center, zoom },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      if (onMapClick) {
        const mapListener = new YMapListener({
          layer: "any",
          onClick: (_object: unknown, event: { coordinates?: [number, number] }) => {
            if (Array.isArray(event?.coordinates) && event.coordinates.length === 2) {
              onMapClick(event.coordinates);
            }
          },
        });

        map.addChild(mapListener);
      }

      markers.forEach((marker) => {
        const element =
          markerVariant === "paw"
            ? createPawMarkerElement(marker)
            : createPinMarkerElement(marker);

        if (onMarkerClick) {
          element.addEventListener("click", () => onMarkerClick(marker));
        }

        const ymapMarker = new YMapMarker(
          { coordinates: marker.coordinates },
          element,
        );
        map.addChild(ymapMarker);
      });

      mapInstance.current = map;
      setStatus("ready");
    } catch (e) {
      console.error("Yandex Maps error:", e);
      window.__ymaps3_loading = undefined;
      setStatus("error");
    }
  }, [apiKey, center, markerVariant, markers, onMapClick, onMarkerClick, zoom]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    const hostNode = mapHost.current;
    setStatus("loading");
    initMap();

    return () => {
      const map = mapInstance.current as { destroy?: () => void } | null;
      map?.destroy?.();
      mapInstance.current = null;
      if (hostNode) {
        hostNode.innerHTML = "";
      }
    };
  }, [apiKey, initMap]);

  if (!apiKey) {
    return (
      <div
        className={`flex w-full items-center justify-center overflow-hidden rounded-[2rem] bg-surface-container-high ${className}`}
        style={{ minHeight: height }}
      >
        <div className="p-8 text-center text-on-surface-variant">
          <span className="material-symbols-outlined mb-2 block text-4xl opacity-40">
            map
          </span>
          <p className="font-bold">API-ключ Яндекс.Карт не настроен</p>
          <p className="mt-1 text-sm opacity-60">
            Добавьте NEXT_PUBLIC_YANDEX_MAPS_KEY в .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[2rem] bg-surface-container-high shadow-ambient ${className}`}
      style={{ height, minHeight: height }}
    >
      <div ref={mapHost} className="absolute inset-0 h-full w-full" />
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <span className="text-sm font-bold text-on-surface-variant/60">
            Загрузка карты...
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-3xl opacity-40">
            error
          </span>
          <p className="font-bold text-sm">Не удалось загрузить карту</p>
          <p className="text-xs opacity-50">
            Проверьте API-ключ и сетевое подключение
          </p>
        </div>
      )}
    </div>
  );
}
