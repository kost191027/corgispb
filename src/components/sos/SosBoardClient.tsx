"use client";

import { useMemo, useState } from "react";
import type { SosNotice } from "@/actions/sos";
import type { MapMarker } from "@/components/map/YandexMap";
import { SosMap } from "@/components/sos/SosMap";
import { SosNoticesClient } from "@/components/sos/SosNoticesClient";

type SosBoardClientProps = {
  notices: SosNotice[];
  markers: MapMarker[];
};

export function SosBoardClient({ notices, markers }: SosBoardClientProps) {
  const [selectedNotice, setSelectedNotice] = useState<SosNotice | null>(null);

  const noticeById = useMemo(
    () => new Map(notices.map((notice) => [notice.id, notice])),
    [notices],
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-4 font-display text-4xl font-black tracking-tight text-on-surface md:text-5xl">
              Карта происшествий
            </h2>
            <p className="text-lg font-medium text-on-surface-variant">
              Метки появляются, когда в объявлении будут координаты из Яндекс
              Карт.
            </p>
          </div>
          <div className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface-variant shadow-sm">
            {markers.length > 0
              ? `Найдено ${markers.length} точек на карте`
              : "Пока нет точек с координатами"}
          </div>
        </div>

        <SosMap
          markers={markers}
          onMarkerClick={(marker) => {
            const notice = noticeById.get(marker.id);
            if (notice) {
              setSelectedNotice(notice);
            }
          }}
        />
      </section>

      <section className="border-y border-outline-variant/10 bg-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-3 inline-block rounded-full bg-error-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-error-container shadow-sm">
                Актуальное
              </span>
              <h2 className="font-display text-4xl font-black tracking-tight text-on-surface md:text-5xl">
                Нужна помощь прямо сейчас
              </h2>
            </div>
            <div className="rounded-xl border border-primary/10 bg-surface-container px-6 py-3 font-bold text-primary">
              Помогите найти потеряшек
            </div>
          </div>

          <SosNoticesClient
            notices={notices}
            selectedNotice={selectedNotice}
            onSelectNotice={setSelectedNotice}
          />
        </div>
      </section>
    </>
  );
}
