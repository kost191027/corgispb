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
  badge?: string;
  subtitle?: string;
  color?: "red" | "green" | "blue" | "orange" | "teal";
  iconName?: string;
  draggable?: boolean;
}

export interface YandexMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  height?: string;
  markerVariant?: "pin" | "paw";
  enableClustering?: boolean;
  activeMarkerId?: string | null;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (coordinates: [number, number]) => void;
  onMarkerDrag?: (marker: MapMarker, coordinates: [number, number]) => void;
  onMarkerDragEnd?: (marker: MapMarker, coordinates: [number, number]) => void;
  onViewportChange?: (next: { center?: [number, number]; zoom?: number }) => void;
}

const MARKER_COLORS: Record<string, string> = {
  red: "#dc2626",
  green: "#16a34a",
  blue: "#2563eb",
  orange: "#ea580c",
  teal: "#0d9488",
};

const CLUSTERER_CDN_PACKAGE = "@yandex/ymaps3-clusterer@0.0.1";
const CLUSTERER_SOURCE_ID = "clusterer-source";
const CLUSTERER_LAYER_ID = "clusterer-markers";

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
  const el = document.createElement("button");
  const bubble = document.createElement("div");
  const icon = document.createElement("span");
  const iconName = marker.iconName ?? "location_on";
  el.style.cssText = `
    position: relative;
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
    transform: translate(-50%, -50%) scale(1);
    padding: 0;
    appearance: none;
  `;
  if (marker.draggable) {
    el.style.touchAction = "none";
    el.style.cursor = "grab";
  }
  bubble.style.cssText = `
    position: absolute;
    left: 50%;
    bottom: calc(100% + 10px);
    min-width: 140px;
    max-width: 220px;
    transform: translate(-50%, 8px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    border-radius: 18px;
    background: rgba(255,250,245,0.98);
    color: #241b16;
    box-shadow: 0 18px 38px rgba(36,27,22,0.16);
    padding: 10px 12px;
    text-align: left;
  `;
  bubble.innerHTML = `
    <div style="font-size:11px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#ee7e0a;">${marker.badge || "Точка на карте"}</div>
    <div style="margin-top:4px;font-size:13px;line-height:1.3;font-weight:800;color:#241b16;">${marker.title}</div>
  `;

  icon.style.cssText =
    "color:white;font-size:16px;font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 1";
  icon.textContent = iconName;

  el.appendChild(bubble);
  el.appendChild(icon);
  el.title = marker.title;
  el.onmouseenter = () => {
    if (el.dataset.previewOpen === "true") {
      el.style.transform = "translate(-50%, calc(-50% - 2px)) scale(1.12)";
      return;
    }

    el.style.transform = "translate(-50%, -50%) scale(1.12)";
  };
  el.onmouseleave = () => {
    if (el.dataset.previewOpen === "true") {
      el.style.transform = "translate(-50%, calc(-50% - 2px)) scale(1.12)";
      return;
    }

    el.style.transform = "translate(-50%, -50%) scale(1)";
  };

  return {
    element: el,
    openPreview: () => {
      el.dataset.previewOpen = "true";
      el.style.transform = "translate(-50%, calc(-50% - 2px)) scale(1.12)";
      bubble.style.opacity = "1";
      bubble.style.transform = "translate(-50%, 0)";
    },
    closePreview: () => {
      el.dataset.previewOpen = "false";
      el.style.transform = "translate(-50%, -50%) scale(1)";
      bubble.style.opacity = "0";
      bubble.style.transform = "translate(-50%, 8px)";
    },
  };
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
    width: 54px;
    height: 54px;
    cursor: pointer;
    border: 0;
    padding: 0;
    background: transparent;
    transform-origin: center bottom;
    transition: transform 180ms ease;
    transform: translate(-50%, -50%) scale(1);
  `;
  if (marker.draggable) {
    wrapper.style.touchAction = "none";
    wrapper.style.cursor = "grab";
  }

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
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 14px 22px ${colors.shadow});
  `;
  icon.innerHTML = `
    <svg viewBox="0 -960 960 960" width="46" height="46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="${pawPath}" fill="${colors.base}" />
      <path d="${pawPath}" fill="${colors.toe}" opacity="0.2" transform="translate(0 -18)" />
      <path d="${pawPath}" fill="none" stroke="${colors.outline}" stroke-width="38" stroke-linejoin="round" />
    </svg>
  `;

  wrapper.appendChild(bubble);
  wrapper.appendChild(icon);

  wrapper.onmouseenter = () => {
    wrapper.style.transform = "translate(-50%, calc(-50% - 2px)) scale(1.06)";
    bubble.style.opacity = "1";
    bubble.style.transform = "translate(-50%, 0)";
  };

  wrapper.onmouseleave = () => {
    wrapper.style.transform = "translate(-50%, -50%) scale(1)";
    bubble.style.opacity = "0";
    bubble.style.transform = "translate(-50%, 10px)";
  };

  return wrapper;
}

function createClusterMarkerElement(count: number) {
  const element = document.createElement("button");
  const halo = document.createElement("div");
  const core = document.createElement("div");
  const icon = document.createElement("span");
  const value = document.createElement("span");
  const caption = document.createElement("span");

  element.type = "button";
  element.setAttribute("aria-label", `Кластер из ${count} точек`);
  element.style.cssText = `
    position: relative;
    width: 68px;
    height: 68px;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 160ms ease;
  `;

  halo.style.cssText = `
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background:
      radial-gradient(circle at 32% 28%, rgba(255,255,255,0.62), transparent 34%),
      linear-gradient(180deg, #ffbb62 0%, #f28a00 100%);
    box-shadow:
      0 18px 36px rgba(242,138,0,0.28),
      inset 0 1px 0 rgba(255,255,255,0.45);
  `;

  core.style.cssText = `
    position: absolute;
    inset: 7px;
    border-radius: 9999px;
    background: rgba(255,249,242,0.96);
    border: 1px solid rgba(242,138,0,0.18);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
  `;

  icon.className = "material-symbols-outlined";
  icon.textContent = "pets";
  icon.style.cssText = `
    font-size: 14px;
    line-height: 1;
    color: #f28a00;
    font-variation-settings: 'FILL' 1;
  `;

  value.textContent = String(count);
  value.style.cssText = `
    font-size: 18px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #1f1713;
  `;

  caption.textContent = count === 1 ? "точка" : "точек";
  caption.style.cssText = `
    font-size: 8px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(90,62,41,0.72);
  `;

  core.appendChild(icon);
  core.appendChild(value);
  core.appendChild(caption);
  element.appendChild(halo);
  element.appendChild(core);

  element.onmouseenter = () => {
    element.style.transform = "translate(-50%, -50%) scale(1.05)";
    halo.style.boxShadow =
      "0 22px 42px rgba(242,138,0,0.32), inset 0 1px 0 rgba(255,255,255,0.45)";
  };
  element.onmouseleave = () => {
    element.style.transform = "translate(-50%, -50%) scale(1)";
    halo.style.boxShadow =
      "0 18px 36px rgba(242,138,0,0.28), inset 0 1px 0 rgba(255,255,255,0.45)";
  };

  return element;
}

export function YandexMap({
  center = [30.315868, 59.939095], // Saint Petersburg
  zoom = 12,
  markers = [],
  className = "",
  height = "500px",
  markerVariant = "pin",
  enableClustering = false,
  activeMarkerId = null,
  onMarkerClick,
  onMapClick,
  onMarkerDragEnd,
  onViewportChange,
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
        YMapFeatureDataSource,
        YMapLayer,
        YMapListener,
        YMapMarker,
      } = ymaps3;

      const map = new YMap(mapHost.current, {
        location: { center, zoom },
      });
      let closeActivePinPreview: (() => void) | null = null;
      let activePreviewMarkerId: string | null = activeMarkerId ?? null;
      let suppressNextMapClick = false;

      const closePreview = () => {
        closeActivePinPreview?.();
        closeActivePinPreview = null;
        activePreviewMarkerId = null;
      };

      const togglePreview = (
        markerId: string,
        pinMarker: { openPreview: () => void; closePreview: () => void },
      ) => {
        if (activePreviewMarkerId === markerId) {
          closePreview();
          return;
        }

        closePreview();
        pinMarker.openPreview();
        closeActivePinPreview = pinMarker.closePreview;
        activePreviewMarkerId = markerId;
      };

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      if (onMapClick || onViewportChange || markerVariant === "pin") {
        const mapListener = new YMapListener({
          layer: "any",
          ...((onMapClick || markerVariant === "pin")
            ? {
                onClick: (
                  _object: unknown,
                  event: { coordinates?: [number, number] },
                ) => {
                  if (suppressNextMapClick) {
                    suppressNextMapClick = false;
                    return;
                  }

                  closePreview();

                  if (
                    onMapClick &&
                    Array.isArray(event?.coordinates) &&
                    event.coordinates.length === 2
                  ) {
                    onMapClick(event.coordinates);
                  }
                },
              }
            : {}),
          ...(onViewportChange
            ? {
                onUpdate: (event: {
                  location?: { center?: [number, number]; zoom?: number };
                }) => {
                  onViewportChange({
                    center: Array.isArray(event.location?.center)
                      ? event.location?.center
                      : undefined,
                    zoom:
                      typeof event.location?.zoom === "number"
                        ? event.location.zoom
                        : undefined,
                  });
                },
              }
            : {}),
        });

        map.addChild(mapListener);
      }

      if (enableClustering && markerVariant === "pin" && markers.length > 1) {
        ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", [
          CLUSTERER_CDN_PACKAGE,
        ]);

        const { YMapClusterer, clusterByGrid } = await ymaps3.import(
          "@yandex/ymaps3-clusterer",
        );

        map.addChild(new YMapFeatureDataSource({ id: CLUSTERER_SOURCE_ID }));
        map.addChild(
          new YMapLayer({
            id: CLUSTERER_LAYER_ID,
            source: CLUSTERER_SOURCE_ID,
            type: "markers",
            zIndex: 1800,
          }),
        );

        const features = markers.map((marker) => ({
          type: "Feature",
          id: marker.id,
          geometry: {
            type: "Point",
            coordinates: marker.coordinates,
          },
          properties: {
            marker,
          },
        }));

        const clusterer = new YMapClusterer({
          method: clusterByGrid({ gridSize: 64 }),
          features,
          marker: (feature: {
            geometry: { coordinates: [number, number] };
            properties?: { marker?: MapMarker };
          }) => {
            const clusterMarker = feature.properties?.marker;

            if (!clusterMarker) {
              const fallbackMarker = createPinMarkerElement({
                id: String(Math.random()),
                coordinates: feature.geometry.coordinates,
                title: "Точка на карте",
              });

              return new YMapMarker(
                {
                  coordinates: feature.geometry.coordinates,
                  source: CLUSTERER_SOURCE_ID,
                },
                fallbackMarker.element,
              );
            }

            const pinMarker = createPinMarkerElement(clusterMarker);
            const element = pinMarker.element;
            element.addEventListener("click", () => {
              suppressNextMapClick = true;
              togglePreview(clusterMarker.id, pinMarker);
            });
            if (activeMarkerId === clusterMarker.id) {
              pinMarker.openPreview();
              closeActivePinPreview = pinMarker.closePreview;
              activePreviewMarkerId = clusterMarker.id;
            }
            if (onMarkerClick) {
              element.addEventListener("click", () => onMarkerClick(clusterMarker));
            }

            return new YMapMarker(
              {
                coordinates: feature.geometry.coordinates,
                source: CLUSTERER_SOURCE_ID,
              },
              element,
            );
          },
          cluster: (
            coordinates: [number, number],
            featuresInCluster: Array<{ properties?: { marker?: MapMarker } }>,
          ) => {
            const element = createClusterMarkerElement(featuresInCluster.length);
            element.onclick = () => {
              const nextZoom =
                typeof (map as { zoom?: number }).zoom === "number"
                  ? Math.min((map as { zoom: number }).zoom + 2, 18)
                  : Math.min(zoom + 2, 18);
              map.setLocation({ center: coordinates, zoom: nextZoom, duration: 250 });
            };

            return new YMapMarker(
              {
                coordinates,
                source: CLUSTERER_SOURCE_ID,
              },
              element,
            );
          },
        });

        map.addChild(clusterer);
      } else {
        markers.forEach((marker) => {
          const pinMarker =
            markerVariant === "paw" ? null : createPinMarkerElement(marker);
          const element =
            markerVariant === "paw"
              ? createPawMarkerElement(marker)
              : pinMarker!.element;

          if (pinMarker) {
            element.addEventListener("click", () => {
              suppressNextMapClick = true;
              togglePreview(marker.id, pinMarker);
            });
            if (activeMarkerId === marker.id) {
              pinMarker.openPreview();
              closeActivePinPreview = pinMarker.closePreview;
              activePreviewMarkerId = marker.id;
            }
          }

          if (onMarkerClick) {
            element.addEventListener("click", () => onMarkerClick(marker));
          }

          const ymapMarker = new YMapMarker(
            {
              coordinates: marker.coordinates,
              ...(marker.draggable
                ? {
                    draggable: true,
                    mapFollowsOnDrag: true,
                    onDragEnd: (coordinates: [number, number]) => {
                      onMarkerDragEnd?.(marker, coordinates);
                    },
                  }
                : {}),
            },
            element,
          );
          map.addChild(ymapMarker);
        });
      }

      mapInstance.current = map;
      setStatus("ready");
    } catch (e) {
      console.error("Yandex Maps error:", e);
      window.__ymaps3_loading = undefined;
      setStatus("error");
    }
  }, [
    apiKey,
    center,
    enableClustering,
    activeMarkerId,
    markerVariant,
    markers,
    onMapClick,
    onMarkerClick,
    onMarkerDragEnd,
    onViewportChange,
    zoom,
  ]);

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
