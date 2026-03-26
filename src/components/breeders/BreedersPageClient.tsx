"use client";

import { useDeferredValue, useMemo, useState } from "react";

type BreederRecord = {
  id: number;
  name: string;
  type: "Пемброк" | "Кардиган";
  badge: string;
  rating: number;
  location: string;
  district: string;
  puppyStatus: "Есть щенки" | "Ожидаются пометы" | "Набор закрыт";
  puppyStatusLabel: string;
  puppyDate?: string;
  imageUrl: string;
};

const BREEDERS: BreederRecord[] = [
  {
    id: 1,
    name: "Royal Tails",
    type: "Пемброк",
    badge: "Клубный эксперт",
    rating: 4.9,
    location: "Приморский район",
    district: "Приморский",
    puppyStatus: "Есть щенки",
    puppyStatusLabel: "Доступны щенки: 3",
    puppyDate: "д.р. 12.12.23",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFBwOpcTL8QqM22XfnvKzPmNp9glJlA2dODFqHR-_PMbLGjKY5hRxhaI_h_mksfolxmjXhkhrUZj-iSykth47YkdbaFPjfhlBOF-OD4EEi0uusa-VKcYMa_bd9mzcmynRmGZ_f3Ms3OREAR4B-209cygyTUePdaiTCPg2f9FTve3yKvNs9oXk84kyYbEA8gId1z2Ml3ib3hVgbm9wpeKBSeD9VKZ77ESd9oxJybLFIhVqzy5s4xLrPll-zWi8QVvHeQYjsmvcmVYE",
  },
  {
    id: 2,
    name: "Baltic Guardians",
    type: "Кардиган",
    badge: "Проверено РКФ",
    rating: 5,
    location: "Пушкин",
    district: "Пушкин",
    puppyStatus: "Ожидаются пометы",
    puppyStatusLabel: "Ожидаются пометы в марте 2026",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApmGiZallCRRlJljOw_QwlXipu2ED5bfNhdbVf2Uqr9979CFSCCtxdTnCM3K2THyvhex4sIk1Qdlm4Dz7D3AAbPgPz4x8-HANpxDyZ63cc3wTVvaZ0ekLuqdPy3cZiD_YOcL2mF-cvyvydgBZwvDn7-Yq0lTnBXw6_TEjUFOsNx77Vl177AUG_JIkpxCKZRU2MAk0IciAT2SjUWnR8QluhRc4BuvyRueIpo4AI2qgTthLgnlQvJXB2DMj6e5boDyuPv5zPaFkqURU",
  },
  {
    id: 3,
    name: "Northern Fox",
    type: "Пемброк",
    badge: "Клубный эксперт",
    rating: 4.8,
    location: "Курортный район",
    district: "Курортный",
    puppyStatus: "Есть щенки",
    puppyStatusLabel: "Доступны щенки: 1",
    puppyDate: "д.р. 05.01.24",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqZTbOW6Mre4IOtpKskY0Yywy-4Y56JLx81FIVV4Y1Zg5ZqvjWW5pF6iBOyF1wYLTsvbSyonfbWLV3miViWcrMC_bk6UQYiLx6zaT6qzZdl7Olcu4Q8C-jIYWcivkcJ8xM1GuGG_m8W7pwUh3y4Rto53Z_Os_CQKeOFCjQBLcJHx_s6MLL19Z670B3hTMcLVdrL9JdZHNv_VcGll0XUsdluszJ8TpbUErlhdaKSw4CibZ7D21rqXKyndpIWr9piha1TRgPl72KNw",
  },
  {
    id: 4,
    name: "Amber Corgis",
    type: "Пемброк",
    badge: "Семейный питомник",
    rating: 4.7,
    location: "Василеостровский район",
    district: "Василеостровский",
    puppyStatus: "Набор закрыт",
    puppyStatusLabel: "Лист ожидания заполнен",
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  },
];

const DISTRICTS = ["Все районы", ...Array.from(new Set(BREEDERS.map((breeder) => breeder.district)))];

export function BreedersPageClient() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<"Все" | "Пемброк" | "Кардиган">("Все");
  const [selectedStatus, setSelectedStatus] = useState<"Все" | BreederRecord["puppyStatus"]>("Все");
  const [selectedDistrict, setSelectedDistrict] = useState("Все районы");
  const deferredSearch = useDeferredValue(search);

  const filteredBreeders = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return BREEDERS.filter((breeder) => {
      const matchesQuery =
        query.length === 0 ||
        [breeder.name, breeder.location, breeder.badge, breeder.district]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesType = selectedType === "Все" || breeder.type === selectedType;
      const matchesStatus = selectedStatus === "Все" || breeder.puppyStatus === selectedStatus;
      const matchesDistrict = selectedDistrict === "Все районы" || breeder.district === selectedDistrict;

      return matchesQuery && matchesType && matchesStatus && matchesDistrict;
    }).sort((a, b) => {
      if (a.puppyStatus === "Есть щенки" && b.puppyStatus !== "Есть щенки") {
        return -1;
      }
      if (a.puppyStatus !== "Есть щенки" && b.puppyStatus === "Есть щенки") {
        return 1;
      }
      return b.rating - a.rating;
    });
  }, [deferredSearch, selectedDistrict, selectedStatus, selectedType]);

  const clearFilters = () => {
    setSearch("");
    setSelectedType("Все");
    setSelectedStatus("Все");
    setSelectedDistrict("Все районы");
  };

  return (
    <main className="min-h-screen bg-background pb-12 pt-24">
      <section className="relative mx-auto max-w-7xl px-6 py-12 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="z-10">
            <span className="mb-6 inline-block rounded-full bg-primary-container px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-on-primary-container shadow-sm">
              Элитные питомники
            </span>
            <h1 className="mb-8 font-display text-5xl font-black leading-[0.95] tracking-tight text-on-surface md:text-7xl">
              Проверенные <br />
              <span className="italic text-primary">заводчики СПб</span>
            </h1>
            <p className="mb-10 max-w-lg text-lg font-medium leading-relaxed text-tertiary">
              Ищите заводчиков по типу корги, району и доступности пометов. Приоритет у тех, у кого уже есть щенки или активный лист ожидания.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-5 font-bold text-on-primary shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 active:scale-95"
                onClick={() => {
                  document.getElementById("breeders-filters")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                type="button"
              >
                Найти щенка
              </button>
              <button className="rounded-full border border-outline-variant/30 bg-surface-container-high px-8 py-5 font-bold text-on-surface-variant transition-colors hover:bg-surface-variant" type="button">
                Правила клуба
              </button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="group aspect-[4/5] rotate-2 overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-2xl transition-transform duration-700 hover:rotate-0">
              <img
                alt="Happy Corgi dog looking at the camera in a park"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                crossOrigin="anonymous"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNfhR0z0CvzGs60_Ln1udzeymPR672ioNEvLffdR1BiI9xnuJZXRPkmGx-QA8wo04dM2QZz0Oc-Q6eUU8W-pC-yomHwgjrn_cWuNMDGydZhGugWevRnOQHisyccs7QvSl6QXfqKUTWiW5KJvxdIWUjbL11vONBY6hQTunv2fuQ5QJh4GulnsXIWcx7KynMqS8zvXkCL1qZiy351RHHLvkGYFI4IN7EIrekRUpyIa-WkcsGpK8hiUdCicy359Ht0vpA3pLx6Oi7peo"
              />
            </div>
            <div className="absolute -bottom-6 -left-2 max-w-[220px] -rotate-3 rounded-2xl border border-secondary/10 bg-secondary-container p-6 shadow-xl md:-left-6">
              <p className="text-center font-display text-sm font-black leading-tight text-on-secondary-container">
                Гарантия здоровья и породности каждого щенка
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant/10 bg-surface-container-low px-6 py-12" id="breeders-filters">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="relative mx-auto max-w-2xl">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant">
              search
            </span>
            <input
              className="w-full rounded-full border border-outline-variant/20 bg-surface-container-lowest py-5 pl-14 pr-6 font-medium text-on-surface outline-none transition-all placeholder:text-stone-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/40"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по названию, району или статусу"
              type="text"
              value={search}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(["Все", "Пемброк", "Кардиган"] as const).map((type) => (
              <button
                key={type}
                className={`rounded-full px-6 py-3 text-sm font-bold shadow-sm transition-all active:scale-95 ${
                  selectedType === type
                    ? "bg-primary text-on-primary shadow-md"
                    : "border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:border-primary/30"
                }`}
                onClick={() => setSelectedType(type)}
                type="button"
              >
                {type}
              </button>
            ))}
            {(["Есть щенки", "Ожидаются пометы", "Набор закрыт"] as const).map((status) => (
              <button
                key={status}
                className={`rounded-full px-6 py-3 text-sm font-bold shadow-sm transition-all active:scale-95 ${
                  selectedStatus === status
                    ? "bg-tertiary text-white"
                    : "border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:border-primary/30"
                }`}
                onClick={() => setSelectedStatus((current) => (current === status ? "Все" : status))}
                type="button"
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-on-surface-variant">
              <span>{filteredBreeders.length} питомников по текущим фильтрам</span>
              <span className="hidden h-1 w-1 rounded-full bg-outline-variant md:block" />
              <span>Сначала показываем тех, у кого есть щенки</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  className="min-w-[220px] rounded-full border border-outline-variant/20 bg-surface-container-lowest px-5 py-3 pr-12 text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary/40"
                  onChange={(event) => setSelectedDistrict(event.target.value)}
                  value={selectedDistrict}
                >
                  {DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
                  expand_more
                </span>
              </div>
              <button
                className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-primary hover:text-white"
                onClick={clearFilters}
                type="button"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {filteredBreeders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-outline-variant/30 bg-surface-container-low px-8 py-16 text-center">
            <h2 className="mb-3 text-2xl font-black text-on-surface">По фильтрам ничего не найдено</h2>
            <p className="mb-6 text-on-surface-variant">Попробуйте убрать район или переключить доступность пометов.</p>
            <button className="rounded-full bg-primary px-6 py-3 font-bold text-on-primary" onClick={clearFilters} type="button">
              Показать всех заводчиков
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBreeders.map((breeder) => {
              const isAvailable = breeder.puppyStatus === "Есть щенки";
              const isPlanned = breeder.puppyStatus === "Ожидаются пометы";

              return (
                <article
                  key={breeder.id}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img
                      alt={breeder.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      crossOrigin="anonymous"
                      src={breeder.imageUrl}
                    />
                    <div className="absolute left-5 top-5">
                      <span
                        className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          breeder.type === "Пемброк"
                            ? "bg-surface-container-highest/80 text-primary backdrop-blur-sm"
                            : "bg-surface-container-highest/80 text-tertiary backdrop-blur-sm"
                        }`}
                      >
                        {breeder.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col space-y-5 p-8">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="mb-1 font-display text-2xl font-black leading-tight text-on-surface transition-colors group-hover:text-primary">
                          {breeder.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-tertiary">
                          <span
                            className="material-symbols-outlined text-[16px] text-secondary-container"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wide">{breeder.badge}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-xl border border-outline-variant/10 bg-surface-container px-2.5 py-1.5">
                        <span className="material-symbols-outlined text-[16px] text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="text-sm font-black">{breeder.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {breeder.location}
                    </div>

                    <div
                      className={`mt-auto rounded-2xl border border-outline-variant/10 p-4 shadow-inner ${
                        isAvailable
                          ? "bg-surface-container-low"
                          : isPlanned
                            ? "bg-surface-container-high"
                            : "bg-surface-container"
                      }`}
                    >
                      {breeder.puppyDate ? (
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="font-bold text-on-surface">{breeder.puppyStatusLabel}</span>
                          <span className="font-medium text-stone-500">{breeder.puppyDate}</span>
                        </div>
                      ) : (
                        <p className="flex min-h-[16px] items-center justify-center text-center text-xs font-bold text-on-surface-variant">
                          {breeder.puppyStatusLabel}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3 pt-3">
                      <button className="flex-1 rounded-xl border border-outline-variant/30 py-3.5 text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-high" type="button">
                        Подробнее
                      </button>
                      <button
                        className={`flex-1 rounded-xl py-3.5 text-sm font-bold transition-all ${
                          isAvailable
                            ? "bg-primary-container text-on-primary-container shadow-primary-container/20 hover:shadow-lg"
                            : isPlanned
                              ? "bg-tertiary-container text-on-tertiary-container hover:shadow-lg"
                              : "cursor-not-allowed bg-surface-container-highest text-on-surface opacity-60"
                        }`}
                        type="button"
                      >
                        {isAvailable ? "Смотреть" : isPlanned ? "В лист ожидания" : "Нет щенков"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
