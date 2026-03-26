"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const PRESETS = {
  puppy: {
    label: "Щенок дома",
    values: {
      bedPrice: 4500,
      bowlsPrice: 1200,
      leashPrice: 3200,
      cratePrice: 8500,
      foodWeight: 10,
      toysPrice: 2200,
      trainingMonthly: 3000,
      emergencyFund: 2500,
    },
  },
  city: {
    label: "Городской корги",
    values: {
      bedPrice: 3500,
      bowlsPrice: 1200,
      leashPrice: 2800,
      cratePrice: 5500,
      foodWeight: 12,
      toysPrice: 1500,
      trainingMonthly: 1800,
      emergencyFund: 2000,
    },
  },
  active: {
    label: "Активный хвост",
    values: {
      bedPrice: 5500,
      bowlsPrice: 1800,
      leashPrice: 4200,
      cratePrice: 9000,
      foodWeight: 15,
      toysPrice: 3000,
      trainingMonthly: 2500,
      emergencyFund: 2800,
    },
  },
} as const;

export default function CalculatorPage() {
  const [bedPrice, setBedPrice] = useState<number>(PRESETS.city.values.bedPrice);
  const [bowlsPrice, setBowlsPrice] = useState<number>(PRESETS.city.values.bowlsPrice);
  const [leashPrice, setLeashPrice] = useState<number>(PRESETS.city.values.leashPrice);
  const [cratePrice, setCratePrice] = useState<number>(PRESETS.city.values.cratePrice);
  const [foodWeight, setFoodWeight] = useState<number>(PRESETS.city.values.foodWeight);
  const [toysPrice, setToysPrice] = useState<number>(PRESETS.city.values.toysPrice);
  const [trainingMonthly, setTrainingMonthly] = useState<number>(PRESETS.city.values.trainingMonthly);
  const [emergencyFund, setEmergencyFund] = useState<number>(PRESETS.city.values.emergencyFund);
  const [activePreset, setActivePreset] = useState<keyof typeof PRESETS>("city");

  const foodPricePerKg = 566.67;
  const VACCINE_YEARLY = 3000;
  const PARASITES_YEARLY = 8000;
  const GROOMING_PRICE = 2500;
  const GROOMING_YEARLY_COUNT = 4;
  const groomingYearly = GROOMING_PRICE * GROOMING_YEARLY_COUNT;

  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey].values;
    setActivePreset(presetKey);
    setBedPrice(preset.bedPrice);
    setBowlsPrice(preset.bowlsPrice);
    setLeashPrice(preset.leashPrice);
    setCratePrice(preset.cratePrice);
    setFoodWeight(preset.foodWeight);
    setToysPrice(preset.toysPrice);
    setTrainingMonthly(preset.trainingMonthly);
    setEmergencyFund(preset.emergencyFund);
  };

  const summary = useMemo(() => {
    const foodPrice = Math.round(foodWeight * foodPricePerKg);
    const initialCost = bedPrice + bowlsPrice + leashPrice + cratePrice;
    const monthlyCost = foodPrice + toysPrice + trainingMonthly + emergencyFund;
    const healthYearly = VACCINE_YEARLY + PARASITES_YEARLY + groomingYearly;
    const firstYearTotal = initialCost + monthlyCost * 12 + healthYearly;
    const averageMonthly = Math.round(firstYearTotal / 12);
    const breakdown = [
      { label: "Первичный старт", value: initialCost },
      { label: "Ежемесячный ритм", value: monthlyCost * 12 },
      { label: "Здоровье и уход", value: healthYearly },
    ];
    const topCategory = breakdown.slice().sort((a, b) => b.value - a.value)[0];

    return {
      foodPrice,
      initialCost,
      monthlyCost,
      healthYearly,
      firstYearTotal,
      averageMonthly,
      topCategory,
    };
  }, [bedPrice, bowlsPrice, leashPrice, cratePrice, foodWeight, toysPrice, trainingMonthly, emergencyFund, groomingYearly]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-background px-6 pb-12 pt-24">
      <section className="relative mb-12 overflow-hidden rounded-[2.5rem] bg-surface-container-low shadow-sm">
        <div className="flex flex-col items-center md:flex-row">
          <div className="z-10 flex-1 p-8 md:p-16">
            <span className="mb-6 inline-block rounded-full bg-secondary-container px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-on-secondary-container shadow-sm">
              Интерактивный гид
            </span>
            <h1 className="mb-6 font-display text-5xl font-black leading-[0.9] tracking-tight text-on-surface md:text-7xl">
              Калькулятор <br />
              <span className="italic text-primary">расходов</span> на корги
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-on-surface-variant">
              Выберите жизненный сценарий, подвигайте ползунки и сразу увидите реалистичный бюджет на первого хвостика в Петербурге.
            </p>
          </div>
          <div className="relative h-80 w-full flex-1 md:h-[500px]">
            <img
              alt="Happy Welsh Corgi"
              className="absolute inset-0 h-full w-full object-cover"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg_BgByfw4ssTHOSeahzZku3e76El-w1uobbmoeFt3P6zp0-8zqFHKvjDIiSeFnTOLTinQr0ekQaYaUuJaqK5UVrFmZQFdiedJvf-rPKxou9GnZMGwXd-Az19hbQNrzvI4VsmLKcWl05Vt6IjUW1Dg562Qn5Omrp81N7z8CojiiJG4-7KogncgGECjLP6kGLP7qyMuGM_gbDt4sMg72lfPTIuDUsocrBmm2iPKCE0o5TGVKarM5Un3M3618LdXWPi_Neadh5Xh5UM"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/60 to-transparent" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-black tracking-tight text-on-surface">Быстрые сценарии</h2>
                <p className="text-sm text-on-surface-variant">Выберите базовый стиль жизни и уже потом докручивайте цифры вручную.</p>
              </div>
              <button
                className="rounded-full bg-surface-container-high px-5 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-primary hover:text-white"
                onClick={() => applyPreset("city")}
                type="button"
              >
                Сбросить к базовому
              </button>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {(Object.entries(PRESETS) as Array<[keyof typeof PRESETS, (typeof PRESETS)[keyof typeof PRESETS]]>).map(([key, preset]) => (
                <button
                  key={key}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition-all ${
                    activePreset === key
                      ? "bg-primary text-on-primary shadow-md"
                      : "border border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:border-primary/30"
                  }`}
                  onClick={() => applyPreset(key)}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm transition-shadow hover:shadow-md md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed shadow-sm">
                <span className="material-symbols-outlined text-on-primary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shopping_cart
                </span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Первичные покупки</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  label: "Лежанка (S/M)",
                  value: bedPrice,
                  setValue: setBedPrice,
                  min: 1500,
                  max: 8000,
                  step: 100,
                  note: "От бюджетных до ортопедических",
                },
                {
                  label: "Миски (керамика)",
                  value: bowlsPrice,
                  setValue: setBowlsPrice,
                  min: 400,
                  max: 3000,
                  step: 100,
                  note: "Лучше тяжелые и устойчивые",
                },
                {
                  label: "Ошейник и поводок",
                  value: leashPrice,
                  setValue: setLeashPrice,
                  min: 800,
                  max: 6000,
                  step: 100,
                  note: "С учетом мягкой шлейки",
                },
                {
                  label: "Клетка/переноска",
                  value: cratePrice,
                  setValue: setCratePrice,
                  min: 2000,
                  max: 15000,
                  step: 500,
                  note: "Особенно полезно на старте",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col gap-3 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-5 transition-colors hover:bg-surface-container-high"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-on-surface">{item.label}</span>
                    <span className="text-lg font-black text-primary">{item.value.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <input
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-outline-variant accent-primary"
                    max={item.max}
                    min={item.min}
                    onChange={(event) => item.setValue(Number(event.target.value))}
                    step={item.step}
                    type="range"
                    value={item.value}
                  />
                  <p className="text-xs font-medium text-on-surface-variant">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm transition-shadow hover:shadow-md md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-fixed shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
                  calendar_month
                </span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Ежемесячные расходы</h2>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-black text-on-surface">Премиум корм</h3>
                  <p className="text-sm font-medium text-on-surface-variant">Качественный холистик для корги</p>
                </div>
                <div className="flex w-full flex-col gap-3 md:w-64">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="rounded-full bg-white px-3 py-1 shadow-sm">Вес: {foodWeight} кг</span>
                    <span className="text-lg font-black text-primary">{summary.foodPrice.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <input
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-outline-variant accent-primary"
                    max="20"
                    min="2"
                    onChange={(event) => setFoodWeight(Number(event.target.value))}
                    step="1"
                    type="range"
                    value={foodWeight}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-black text-on-surface">Лакомства и игрушки</h3>
                  <p className="text-sm font-medium text-on-surface-variant">Погрызушки, нюхательные коврики и мотивация</p>
                </div>
                <div className="flex w-full flex-col gap-3 md:w-64">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="rounded-full bg-white px-3 py-1 shadow-sm">Интенсивность</span>
                    <span className="text-lg font-black text-primary">{toysPrice.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <input
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-outline-variant accent-primary"
                    max="5000"
                    min="500"
                    onChange={(event) => setToysPrice(Number(event.target.value))}
                    step="500"
                    type="range"
                    value={toysPrice}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6">
                  <div>
                    <h3 className="text-xl font-black text-on-surface">Кинолог и занятия</h3>
                    <p className="text-sm font-medium text-on-surface-variant">Групповые занятия или мягкий курс послушания.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="rounded-full bg-white px-3 py-1 shadow-sm">В месяц</span>
                      <span className="text-lg font-black text-primary">{trainingMonthly.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <input
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-outline-variant accent-primary"
                      max="6000"
                      min="0"
                      onChange={(event) => setTrainingMonthly(Number(event.target.value))}
                      step="300"
                      type="range"
                      value={trainingMonthly}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6">
                  <div>
                    <h3 className="text-xl font-black text-on-surface">Подушка на сюрпризы</h3>
                    <p className="text-sm font-medium text-on-surface-variant">Резерв на срочные осмотры, лекарства, такси или передержку.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="rounded-full bg-white px-3 py-1 shadow-sm">В месяц</span>
                      <span className="text-lg font-black text-primary">{emergencyFund.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <input
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-outline-variant accent-primary"
                      max="5000"
                      min="0"
                      onChange={(event) => setEmergencyFund(Number(event.target.value))}
                      step="250"
                      type="range"
                      value={emergencyFund}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm transition-shadow hover:shadow-md md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tertiary-fixed shadow-sm">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>
                  medical_services
                </span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Здоровье и уход</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  icon: "vaccines",
                  title: "Прививки",
                  value: VACCINE_YEARLY,
                },
                {
                  icon: "bug_report",
                  title: "Паразиты",
                  value: PARASITES_YEARLY,
                },
                {
                  icon: "content_cut",
                  title: "Груминг",
                  value: GROOMING_PRICE,
                  suffix: " / сеанс",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-tertiary-container/10 p-6 text-center transition-all hover:border-tertiary/20"
                >
                  <span className="material-symbols-outlined mb-2 text-4xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {card.icon}
                  </span>
                  <span className="text-lg font-black">{card.title}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-on-surface-variant shadow-sm">
                    ~{card.value.toLocaleString("ru-RU")} ₽{card.suffix ?? " / год"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-on-primary shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
              <h3 className="mb-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest opacity-90">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  calculate
                </span>
                Итоговый расчет
              </h3>

              <div className="relative z-10 space-y-8">
                <div>
                  <p className="mb-1 text-sm font-bold tracking-wide opacity-80">Итого в первый год</p>
                  <p className="font-display text-5xl font-black tracking-tight">{summary.firstYearTotal.toLocaleString("ru-RU")} ₽</p>
                </div>
                <div className="border-t border-white/20 pt-8">
                  <p className="mb-1 text-sm font-bold tracking-wide opacity-80">Средний расход в месяц</p>
                  <p className="text-3xl font-black">{summary.averageMonthly.toLocaleString("ru-RU")} ₽</p>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-xs font-medium leading-relaxed opacity-95">
                    В расчет включена стоимость базового набора, еды, обучения, резерва и ежегодных процедур. Цена самого щенка не учитывается.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <h4 className="mb-5 font-display text-2xl font-black">Что сильнее всего влияет на бюджет</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="font-semibold text-on-surface">Стартовые покупки</span>
                  <span className="font-black text-primary">{summary.initialCost.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="font-semibold text-on-surface">Ежемесячный ритм</span>
                  <span className="font-black text-primary">{summary.monthlyCost.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                  <span className="font-semibold text-on-surface">Годовое здоровье</span>
                  <span className="font-black text-primary">{summary.healthYearly.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant">
                Сейчас основная статья расходов: <span className="font-bold text-on-surface">{summary.topCategory.label}</span>.
              </p>
            </div>

            <div className="space-y-6 rounded-[2rem] border border-outline-variant/20 bg-surface-container-high p-8 transition-shadow hover:shadow-lg">
              <h4 className="font-display text-2xl font-black">Готовы к пополнению?</h4>
              <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                Мы собрали список проверенных питомников Санкт-Петербурга и ЛО с отличной репутацией.
              </p>
              <Link
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-6 py-4 font-bold text-primary shadow-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
                href="/breeders"
              >
                <span>Посмотреть заводчиков</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-tertiary p-8 text-white shadow-lg shadow-tertiary/20 transition-transform hover:-translate-y-1">
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lightbulb
                  </span>
                </div>
                <div>
                  <h5 className="mb-2 text-lg font-black">Совет эксперта</h5>
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    У корги часто бывают проблемы со спиной. Не экономьте на качественной шлейке и закладывайте небольшой резерв на непредвиденные траты уже с первого месяца.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <span className="material-symbols-outlined text-[100px]">pest_control_rodent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
