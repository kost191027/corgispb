import Link from "next/link";
import type { MapMarker } from "@/components/map/YandexMap";
import { SosBoardClient } from "@/components/sos/SosBoardClient";
import { SosHeroActions } from "@/components/sos/SosHeroActions";
import { getSosNotices, type SosNotice } from "@/actions/sos";

export const dynamic = "force-dynamic";

function formatNoticeDate(value: string | null, fallback = "Недавно") {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function buildMarkers(notices: SosNotice[]): MapMarker[] {
  return notices
    .filter(
      (notice): notice is SosNotice & { latitude: number; longitude: number } =>
        typeof notice.latitude === "number" &&
        typeof notice.longitude === "number",
    )
    .map((notice) => ({
      id: notice.id,
      coordinates: [notice.longitude, notice.latitude],
      title: `${notice.petName} — ${notice.address || "точка на карте"}`,
      subtitle: formatNoticeDate(notice.lostDate),
      color: notice.reportType === "found" ? "teal" : "red",
    }));
}

export default async function LostAndFoundPage() {
  const notices = await getSosNotices();
  const markers = buildMarkers(notices);

  return (
    <main className="min-h-screen bg-background pb-12 pt-24">
      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-12 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="z-10 order-2 md:order-1">
            <span className="mb-6 inline-block rounded-full bg-tertiary-container px-5 py-2 text-xs font-black uppercase tracking-widest text-on-tertiary-container shadow-sm">
              Потеряшки СПб
            </span>
            <h1 className="mb-8 font-display text-5xl font-black leading-[0.95] tracking-tight text-on-surface md:text-7xl lg:text-[5rem]">
              Верните <br />
              <span className="italic text-primary">хвостика</span> домой.
            </h1>
            <p className="mb-12 max-w-md text-lg font-medium leading-relaxed text-on-surface-variant md:text-xl">
              Если ваш корги потерялся или вы нашли чье-то сокровище на улицах
              Петербурга, мы поможем быстро опубликовать объявление и собрать
              отклики сообщества.
            </p>

            <SosHeroActions />

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface">
                Активных объявлений: {notices.length}
              </div>
              <div className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface">
                На карте: {markers.length} точек
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="group relative aspect-square rotate-2 overflow-hidden rounded-[3rem] border border-outline-variant/10 bg-surface-container-high shadow-2xl transition-transform duration-700 hover:rotate-0">
              <img
                alt="Sad looking corgi"
                className="h-full w-full object-cover grayscale-[30%] transition-transform duration-1000 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaLMAnG2K3F4ws9T7QhsMDFP5OPJcOiubik5Y4YytG6Sm2nY4TmDBsN6x0sV5dYuVaEOIfAOOBwfnX7sQXX_1JZ_ZtuPjollmylBCGZc-3ntDErz7FI1q4b_hEfccLx8oaPaIqrCkD0Ucm_BKR9aGVH8Asv7yIzAxU44Kcq0dSCdIj1JP3EIUJSYVlCzgPyWTQtRFriMikMDmkBW71BiN74sVO-NH06PWbuhqVNbR1CwfAWPuUW7bzdHQ6pAyYlCeRdUFvmOUbFAk"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-4 z-20 max-w-[240px] -rotate-3 rounded-2xl border-l-4 border-primary bg-surface-container-lowest p-6 shadow-xl transition-transform hover:-translate-y-[5px] md:-left-8">
              <p className="text-sm font-black leading-snug text-on-surface">
                Каждое новое объявление сразу видно сообществу на странице SOS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-6 overflow-hidden rounded-[2rem] bg-primary py-8 shadow-xl shadow-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:px-10 md:flex-row">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
            <span
              className="material-symbols-outlined text-2xl text-secondary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              error
            </span>
            <span className="font-display text-lg font-black uppercase tracking-widest text-white">
              Экстренные шаги:
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-around gap-6 text-sm font-bold text-white/90 md:flex-row md:gap-10 md:text-base">
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-primary shadow-sm">
                1
              </span>
              <span>Опубликуйте объявление на этой странице</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-primary shadow-sm">
                2
              </span>
              <span>Проверьте районные чаты и приюты</span>
            </div>
            <div className="flex items-center gap-4 rounded-full bg-primary-container px-6 py-2 whitespace-nowrap text-on-primary-container shadow-sm">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-black">
                3
              </span>
              <span>Оставьте контактный телефон для связи</span>
            </div>
          </div>
        </div>
      </section>

      <SosBoardClient notices={notices} markers={markers} />

      <section className="relative overflow-hidden bg-background py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-display text-5xl font-black text-on-surface md:text-6xl">
              Нашлись!
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-on-surface-variant">
              Истории счастливых возвращений напоминают, почему важно быстро
              публиковать объявление и подключать сообщество.
            </p>
          </div>

          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="relative w-full md:w-1/2">
              <div className="absolute -left-12 -top-12 -z-10 aspect-square w-full rounded-full bg-secondary-container opacity-30 blur-3xl mix-blend-multiply" />
              <div className="relative rotate-3 rounded-[2.5rem] border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-2xl transition-transform duration-500 hover:rotate-0">
                <img
                  alt="Happy corgi with owner"
                  className="aspect-square h-auto w-full rounded-[2rem] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNissoJ3u67xFh4p-xt5UME7c0Pm9FEIyUGeKxm7UM0rhNrA_5z9ETnCrxcQiHAUgoJZCMo-eTnAU6ZUKMCqvbBpA8LupEND_k1ROhcA7AHY75HczgW3JEKDneejIJ1gk5znRmM_PFqR4PUd19WV-5EsEU71V8a9uC4LJ3s06p9gc8g87zOFwrt_8h5h4eHEyQofblQ574U5AcK2jRss7_zDlwuG11kKv6F90r97MTMsbtGze2eMkIyBjJ7N7Y3WbR6tZcmZfvnTM"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="space-y-8">
                <div className="relative rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-10 shadow-lg transition-transform hover:-translate-y-1">
                  <span
                    className="material-symbols-outlined absolute right-5 top-5 text-[60px] text-primary/10"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    format_quote
                  </span>
                  <h4 className="mb-4 pr-12 font-display text-2xl font-black">
                    Коржик дома!
                  </h4>
                  <p className="mb-8 text-lg font-medium italic leading-relaxed text-on-surface-variant">
                    &quot;Мы уже не знали, что делать, но благодаря репосту в
                    группе Корги СПб Коржика нашли в соседнем квартале через
                    три дня. Спасибо всем неравнодушным!&quot;
                  </p>
                  <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary-container shadow-sm" />
                    <div>
                      <p className="text-base font-black">Семья Ивановых</p>
                      <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Октябрь 2024
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 sm:gap-6">
                  <div className="aspect-square flex-1 cursor-pointer overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-high transition-shadow hover:shadow-md">
                    <img
                      alt="Reunited dog 1"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7wXEicpxT9mUVSnq4cC4Eh8AwKa3Keytjl_l-7LuW-TVfSmc9iyk5PpbheSXPOx21gcBL03L3ibCYOSS5nuxiHj_CupHbeTy325crp_DRyP7EhZKOUIC5ig3vgEZyCbYAAQQ-XXpTlfuJoz2aHfTm2iBfJ6f4bSCr34GVIBlgVFlVq7duxSDFPB59Od0OWTdDhuz8mjT-JgYkmorN-wue-WWNs5lWkvXTYQ5B_50xO9eK1ZtVgBauGUKcqwNxrRG2LbmJH5lf4uc"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="aspect-square flex-1 cursor-pointer overflow-hidden rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-high transition-shadow hover:shadow-md">
                    <img
                      alt="Reunited dog 2"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFOPCQDM-IwLsnqFVHMoZcf53K8sXxiSvNX_rnvpUhrWNHPNSHCl_a9ZUSkUEsVpambZeFWO2N2rpqmSNTU6SPSqgM1HkooYuRUmxUt-7-0nIsaml0YCeJS3qYkfQJXAbJ4_cKZyXOSIOIISMhucf1noHkK8qXfRssb0x24ofobq6tsniIX95RU0VFxO_ceuyqIE-n0sTJBkuAU6nB9i4AaNUgSPkZj-BytkUEVqqCdFjEBcKYLFQhTIGLD64KzUhE4EoXbmlX9Uc"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="group flex aspect-square flex-1 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-primary/30 bg-surface-container-high transition-colors hover:border-primary/50 hover:bg-primary/5">
                    <span className="font-display text-2xl font-black text-primary transition-transform group-hover:scale-110">
                      +140
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary opacity-80">
                      историй
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-tertiary p-12 shadow-2xl shadow-tertiary/30 transition-transform duration-500 hover:-translate-y-1 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/2 flex h-full w-1/3 -translate-y-1/2 items-center justify-end pr-10 opacity-[0.05]">
              <span
                className="material-symbols-outlined text-[300px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                Вместе мы сильнее
              </span>
              <h2 className="mb-10 font-display text-4xl font-black leading-tight text-white md:text-5xl">
                Как еще вы можете <br />
                <span className="italic opacity-90">помочь?</span>
              </h2>

              <div className="mb-12 grid gap-10 text-white/90 md:grid-cols-2">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform hover:scale-110">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      share
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-display text-xl font-black text-white">
                      Делайте репосты
                    </h4>
                    <p className="text-sm font-medium leading-relaxed text-white/90 opacity-80">
                      Каждый пост в VK или Telegram увеличивает шансы на
                      возвращение собаки домой.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-lg transition-transform hover:scale-110">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      volunteer_activism
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-display text-xl font-black text-white">
                      Станьте волонтером
                    </h4>
                    <p className="text-sm font-medium leading-relaxed text-white/90 opacity-80">
                      Присоединяйтесь к группе быстрого реагирования в вашем
                      районе.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/community"
                  className="group flex items-center gap-3 rounded-full bg-surface-container-lowest px-10 py-5 text-sm font-black text-tertiary shadow-lg transition-colors hover:bg-secondary-fixed active:scale-95"
                >
                  Сообщество
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/community/forum"
                  className="rounded-full border border-white/30 bg-white/10 px-10 py-5 text-sm font-black text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-95"
                >
                  Форум
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
