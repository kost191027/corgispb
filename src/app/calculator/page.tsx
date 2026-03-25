"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CalculatorPage() {
  // States for calculator
  const [bedPrice, setBedPrice] = useState(3500);
  const [bowlsPrice, setBowlsPrice] = useState(1200);
  const [leashPrice, setLeashPrice] = useState(2800);
  const [cratePrice, setCratePrice] = useState(5500);

  const [foodWeight, setFoodWeight] = useState(12);
  const foodPricePerKg = 566.67; // approx 6800 / 12
  const foodPrice = Math.round(foodWeight * foodPricePerKg);

  const [toysPrice, setToysPrice] = useState(1500);

  // Constants for year
  const VACCINE_YEARLY = 3000;
  const PARASITES_YEARLY = 8000;
  const GROOMING_PRICE = 2500;
  const GROOMING_YEARLY_COUNT = 4; // roughly every 3 months
  const groomingYearly = GROOMING_PRICE * GROOMING_YEARLY_COUNT;

  // Calculators
  const initialCost = bedPrice + bowlsPrice + leashPrice + cratePrice;
  const monthlyCost = foodPrice + toysPrice;
  const healthYearly = VACCINE_YEARLY + PARASITES_YEARLY + groomingYearly;

  const firstYearTotal = initialCost + (monthlyCost * 12) + healthYearly;
  const averageMonthly = Math.round(firstYearTotal / 12);

  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low mb-12 flex flex-col md:flex-row items-center shadow-sm">
        <div className="p-8 md:p-16 flex-1 z-10">
          <span className="inline-block px-5 py-2 rounded-full bg-secondary-container text-on-secondary-container font-display text-xs font-bold mb-6 tracking-widest uppercase shadow-sm">
            Интерактивный гид
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-on-surface leading-[0.9] tracking-tight mb-6">
            Калькулятор <br/><span className="text-primary italic">расходов</span> на корги
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md font-body leading-relaxed">
            Сколько стоит счастье? Рассчитайте бюджет на первого друга: от миски до ежегодного груминга в Петербурге.
          </p>
        </div>
        <div className="relative flex-1 w-full h-80 md:h-[500px]">
          <img 
            alt="Happy Welsh Corgi" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg_BgByfw4ssTHOSeahzZku3e76El-w1uobbmoeFt3P6zp0-8zqFHKvjDIiSeFnTOLTinQr0ekQaYaUuJaqK5UVrFmZQFdiedJvf-rPKxou9GnZMGwXd-Az19hbQNrzvI4VsmLKcWl05Vt6IjUW1Dg562Qn5Omrp81N7z8CojiiJG4-7KogncgGECjLP6kGLP7qyMuGM_gbDt4sMg72lfPTIuDUsocrBmm2iPKCE0o5TGVKarM5Un3M3618LdXWPi_Neadh5Xh5UM" 
            crossOrigin="anonymous" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/60 to-transparent"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Calculator Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 2: Initial Purchases */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-primary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Первичные покупки</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bed */}
              <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">Лежанка (S/M)</span>
                  <span className="font-black text-primary text-lg">{bedPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                  max="8000" min="1500" step="100" type="range" 
                  value={bedPrice} onChange={(e) => setBedPrice(Number(e.target.value))} 
                />
                <p className="text-xs font-medium text-on-surface-variant">От бюджетных до ортопедических</p>
              </div>
              {/* Bowls */}
              <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">Миски (керамика)</span>
                  <span className="font-black text-primary text-lg">{bowlsPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                  max="3000" min="400" step="100" type="range" 
                  value={bowlsPrice} onChange={(e) => setBowlsPrice(Number(e.target.value))} 
                />
              </div>
              {/* Collar & Leash */}
              <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">Ошейник и поводок</span>
                  <span className="font-black text-primary text-lg">{leashPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                  max="6000" min="800" step="100" type="range" 
                  value={leashPrice} onChange={(e) => setLeashPrice(Number(e.target.value))} 
                />
              </div>
              {/* Crate */}
              <div className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">Клетка/переноска</span>
                  <span className="font-black text-primary text-lg">{cratePrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                  max="15000" min="2000" step="500" type="range" 
                  value={cratePrice} onChange={(e) => setCratePrice(Number(e.target.value))} 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Recurring Monthly Costs */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Ежемесячные расходы</h2>
            </div>
            <div className="space-y-6">
              {/* Food */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <div className="flex-1">
                  <h3 className="font-black text-xl mb-1 text-on-surface">Премиум корм</h3>
                  <p className="text-sm font-medium text-on-surface-variant">Качественный холистик для корги</p>
                </div>
                <div className="w-full md:w-64 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm">Вес: {foodWeight} кг</span>
                    <span className="text-primary text-lg font-black">{foodPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                    max="20" min="2" step="1" type="range" 
                    value={foodWeight} onChange={(e) => setFoodWeight(Number(e.target.value))} 
                  />
                </div>
              </div>
              
              {/* Toys */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <div className="flex-1">
                  <h3 className="font-black text-xl mb-1 text-on-surface">Лакомства и игрушки</h3>
                  <p className="text-sm font-medium text-on-surface-variant">Погрызушки и мотивация</p>
                </div>
                <div className="w-full md:w-64 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm">Интенсивность</span>
                    <span className="text-primary text-lg font-black">{toysPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-primary" 
                    max="5000" min="500" step="500" type="range" 
                    value={toysPrice} onChange={(e) => setToysPrice(Number(e.target.value))} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Health & Wellness */}
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
              </div>
              <h2 className="font-display text-3xl font-black tracking-tight">Здоровье и уход</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-tertiary-container/10 border-2 border-transparent hover:border-tertiary/20 transition-all flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                <span className="font-black text-lg">Прививки</span>
                <span className="text-on-surface-variant text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">~{VACCINE_YEARLY.toLocaleString('ru-RU')} ₽ / год</span>
              </div>
              <div className="p-6 rounded-2xl bg-tertiary-container/10 border-2 border-transparent hover:border-tertiary/20 transition-all flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>bug_report</span>
                <span className="font-black text-lg">Паразиты</span>
                <span className="text-on-surface-variant text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">~{PARASITES_YEARLY.toLocaleString('ru-RU')} ₽ / год</span>
              </div>
              <div className="p-6 rounded-2xl bg-tertiary-container/10 border-2 border-transparent hover:border-tertiary/20 transition-all flex flex-col items-center text-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
                <span className="font-black text-lg">Груминг</span>
                <span className="text-on-surface-variant text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">~{GROOMING_PRICE.toLocaleString('ru-RU')} ₽ / сеанс</span>
              </div>
            </div>
          </div>

        </div>

        {/* Result Dashboard */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-primary p-8 rounded-[2rem] text-on-primary shadow-xl shadow-primary/20 relative overflow-hidden transition-all hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
              <h3 className="font-display font-black mb-8 opacity-90 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
                Итоговый расчет
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <p className="text-sm font-bold opacity-80 mb-1 tracking-wide">Итого в первый год</p>
                  <p className="text-5xl font-black font-display tracking-tight">{firstYearTotal.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="pt-8 border-t border-white/20">
                  <p className="text-sm font-bold opacity-80 mb-1 tracking-wide">Средний расход в месяц</p>
                  <p className="text-3xl font-black">{averageMonthly.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm mt-4 border border-white/10">
                  <p className="text-xs font-medium leading-relaxed opacity-95">В расчет включена стоимость базового набора, еды и ежегодных процедур. Цена самого щенка не учитывается.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-high p-8 rounded-[2rem] space-y-6 border border-outline-variant/20 hover:shadow-lg transition-shadow">
              <h4 className="font-display font-black text-2xl">Готовы к пополнению?</h4>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">Мы собрали список проверенных питомников Санкт-Петербурга и ЛО с отличной репутацией.</p>
              <Link href="/breeders" className="w-full bg-surface-container-lowest hover:bg-white text-primary py-4 px-6 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 border border-outline-variant/30 active:scale-95 group">
                <span>Посмотреть заводчиков</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Tips Section */}
            <div className="bg-tertiary p-8 rounded-[2rem] text-white shadow-lg shadow-tertiary/20 relative overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm text-on-secondary-container">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                </div>
                <div>
                  <h5 className="font-black text-lg mb-2">Совет эксперта</h5>
                  <p className="text-sm font-medium opacity-90 leading-relaxed">У корги часто бывают проблемы со спиной. Не экономьте на качественной шлейке и избегайте прыжков с высоких диванов в щенячьем возрасте.</p>
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
