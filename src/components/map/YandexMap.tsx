"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps3: any;
  }
}

export function YandexMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapLoaded && mapContainer.current) {
      initMap();
    }
  }, [mapLoaded]);

  async function initMap() {
    try {
      await window.ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;
      
      const map = new YMap(mapContainer.current!, {
        location: {
          center: [30.315868, 59.939095], // Saint Petersburg
          zoom: 12
        }
      });
      
      // Использование светлой/темной темы в зависимости от дизайна проекта
      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Script 
        src="https://api-maps.yandex.ru/3.0/?apikey=e3188981-ca48-4cb1-807a-948ff0c31327&lang=ru_RU" 
        onReady={() => setMapLoaded(true)}
      />
      <div 
        ref={mapContainer} 
        className="w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden shadow-ambient bg-surface-container-high relative"
      >
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-primary/50 flex-col gap-2">
            <span className="animate-pulse">Загрузка карты...</span>
          </div>
        )}
      </div>
    </>
  );
}
