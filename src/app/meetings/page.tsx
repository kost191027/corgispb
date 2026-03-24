"use client";

import React from "react";
import { YandexMap } from "@/components/map/YandexMap";
import type { MapMarker } from "@/components/map/YandexMap";

const MEETING_MARKERS: MapMarker[] = [
  { id: "1", coordinates: [30.2146, 59.9722], title: "Забег в Парке 300-летия", subtitle: "15 июня, 12:00", color: "orange" },
  { id: "2", coordinates: [30.3312, 59.9435], title: "Кинолог: Марсово поле", subtitle: "18 июня, 18:30", color: "teal" },
  { id: "3", coordinates: [30.2987, 59.9278], title: "Пикник: Юсуповский сад", subtitle: "22 июня, 14:00", color: "green" },
];

export default function MeetingsPage() {
  return (
    <main className="pt-24 pb-32">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="relative rounded-xl overflow-hidden min-h-[500px] flex items-end p-8 md:p-16">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Happy corgi running in a green park in Saint Petersburg" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fNsE7YgTpsjV0d3oCzXb2BR2xs_QohM8o8eAv40GoTPwnJt93gTQ6m_ydf9Q6wbBB-hAPiOC62ZO3AGSiLJc3zcIU9bsCgjBazSmjSlzcv8OKaXjcKJZdsdn0F0FIfDJm3shCFpwKeBRY5nwp0skexR1LKilcQ7bDe4Ft4uMNOHwzX-ZwGAvfwJ6q3k3yv0FDbg3R9f4d1YNbJaxv18AsP8_oz2upL5j2Q2EypcgFtcDZ4USuLQwUoUIBgvE20USLd3V2ANSqEs" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full md:max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl text-white font-extrabold font-headline mb-6 leading-tight">События и встречи</h1>
            <p className="text-lg md:text-xl font-body mb-8 text-white/90">
              Присоединяйтесь к самым милым прогулкам в Петербурге. Общайтесь, играйте и заводите новых друзей с хвостиками.
            </p>
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-headline font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl w-fit">
              <span className="material-symbols-outlined">add_circle</span>
              Предложить событие
            </button>
          </div>
        </div>
      </section>

      {/* Filter Panel */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl shadow-sm border-none">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-xs font-bold font-headline text-on-surface-variant mb-2 uppercase tracking-widest pl-1">Поиск</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm transition-shadow font-body text-on-surface" 
                  placeholder="Название встречи..." 
                  type="text" 
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">search</span>
              </div>
            </div>
            
            {/* District */}
            <div>
              <label className="block text-xs font-bold font-headline text-on-surface-variant mb-2 uppercase tracking-widest pl-1">Район</label>
              <div className="relative">
                <select className="w-full bg-surface-container-lowest border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-primary/40 focus:outline-none text-sm appearance-none cursor-pointer transition-shadow font-body text-on-surface">
                  <option>Все районы</option>
                  <option>Василеостровский</option>
                  <option>Приморский</option>
                  <option>Центральный</option>
                  <option>Петроградский</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant">expand_more</span>
                </div>
              </div>
            </div>
            
            {/* Type */}
            <div>
              <label className="block text-xs font-bold font-headline text-on-surface-variant mb-2 uppercase tracking-widest pl-1">Тип встречи</label>
              <div className="flex flex-wrap gap-2">
                <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold font-headline shadow-sm hover:opacity-90 transition-opacity">Все</button>
                <button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-full text-xs font-bold font-headline hover:bg-primary-fixed-dim transition-colors">Прогулка</button>
                <button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-full text-xs font-bold font-headline hover:bg-primary-fixed-dim transition-colors">Пикник</button>
              </div>
            </div>
            
            {/* More Filters */}
            <div className="flex items-end">
              <button className="w-full bg-tertiary-container text-on-tertiary-container py-3 rounded-full text-sm font-bold font-headline flex justify-center items-center gap-2 hover:bg-tertiary hover:text-white transition-all shadow-sm active:scale-95">
                <span className="material-symbols-outlined text-lg">tune</span>
                Дополнительно
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid (Asymmetric Bento Style) */}
      <section className="max-w-7xl mx-auto px-6 mb-20 font-body">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-primary font-bold font-headline tracking-tighter text-sm uppercase">Предстоящие</span>
            <h2 className="text-3xl font-extrabold font-headline text-on-surface">Ближайшие встречи</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="p-3 rounded-full bg-surface-container-high hover:bg-primary/10 text-primary transition-colors active:scale-95">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-3 rounded-full bg-surface-container-high hover:bg-primary/10 text-primary transition-colors active:scale-95">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Highlight Card */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300 border border-outline-variant/10 cursor-pointer flex flex-col">
            <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
              <img 
                alt="Group of corgis playing in the park" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdybnthR7L5a2EXGZEoNnnJ1T0cKNZhw5MlKoCWjEmS3iMZi1zitNldlE4317soM54zOAvV5M4o0lp7jQnFefjBCW3DUm6DekWIAP59hIh2RfpwwQ1koM2VJl8W2g2pfJeZLA55aZCNdRH_ti0dg-zdEkd6PDebkNsCMremMLvnC1IH-VWvC-QxyXt3LlBnU7vsJcfqiA9rUbAkBnKzvKctwdLnrUnVnOcY-KL4PASOlBbaYEOkQeNKHxaPCGHkkb8sWQKc3vl-XE" 
                crossOrigin="anonymous" 
              />
              <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                Главное событие
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 pb-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold font-headline mb-3 text-on-surface">Корги-забег в парке 300-летия</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-xl">calendar_month</span> 15 июня
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-xl">schedule</span> 12:00
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-xl">group</span> 42 участника
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold inline-block">Мест: много</span>
                </div>
              </div>
              <p className="text-on-surface-variant mb-6 line-clamp-2 md:line-clamp-none flex-1 mt-2">
                Традиционный летний забег на коротких лапках! Призы всем участникам, профессиональный фотограф и море позитива на берегу залива.
              </p>
              <button className="w-full bg-primary text-on-primary py-4 rounded-full font-headline font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 shadow-lg shadow-primary/20 mt-auto">
                Я пойду
              </button>
            </div>
          </div>
          
          {/* Secondary Cards Stack */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border-l-4 border-l-tertiary cursor-pointer group">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
                  <img 
                    alt="Dog trainer with a corgi" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS4FGXFPm-B6JnSMSWHPp6SuHYWo5zgbV8pV0Ks3dUeykStfgWQBTdP3kOz5SslDgghwNBcLrW092hIfZAVFNyloTHZu6HIQdKi_k7s-Kcfg0G038PQWIqZxuF-pBDcgqdmUiEoltLeNlx5VUb0NwVZGdsybvuFTnuRY_jjwzdHNWUZ5qV-EO2eBpU1GToACQBFdsD2FZEESZsrogp-7KmhqY9KZtMIeROw_2i05AkEIszopKtnwV2tHh8O4fzETVegQ6P4DPH5eQ" 
                    crossOrigin="anonymous" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold font-headline text-lg mb-2 leading-tight text-on-surface group-hover:text-primary transition-colors">Занятие с кинологом: Рядом!</h3>
                  <p className="text-sm text-on-surface-variant mb-3 flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[18px]">location_on</span> Марсово поле
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">18 июня, 18:30</span>
                    <button className="text-tertiary text-sm font-bold flex items-center gap-1 hover:text-tertiary-container transition-colors">
                      Записаться <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border-l-4 border-l-primary-container cursor-pointer group">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
                  <img 
                    alt="Corgi picnic blanket" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdBHgdTvd-o0nb5XDFfydbsDpMaae2UkzhBMsJGVPltW_t5Vksl8LkS_XJnFutr5y0ce4_JffFnEVNh4M4sCpMVkVHdLQG8mSroc8DxSo4r3URXE7R_jrIlXFFwtTxkHEsfbyH5qrE0FhPdfmVIyyz8X6pdVSfWhlFh5vLKOfe32c7pVxn3Ic7BnfDo-jgvs4Sl2FFFglLUxVacKuSJmhmyotFzdHyAS_slynUXzXixQXZjcXzhUdKFnt9tROlodDTPyloP0zvxe0" 
                    crossOrigin="anonymous" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold font-headline text-lg mb-2 leading-tight text-on-surface group-hover:text-primary transition-colors">Корги-Пикник: Начало лета</h3>
                  <p className="text-sm text-on-surface-variant mb-3 flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[18px]">location_on</span> Юсуповский сад
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">22 июня, 14:00</span>
                    <button className="text-tertiary text-sm font-bold flex items-center gap-1 hover:text-tertiary-container transition-colors">
                      Участвовать <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mini Calendar/Promo */}
            <div className="flex-1 bg-gradient-to-br from-tertiary to-teal-800 text-white p-8 rounded-xl relative overflow-hidden flex flex-col justify-center shadow-lg">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-headline mb-3">Больше встреч в Telegram</h3>
                <p className="text-white/90 text-sm mb-6 max-w-[200px] leading-relaxed">
                  Узнавай о спонтанных прогулках первым в нашем чате.
                </p>
                <a className="inline-flex items-center gap-2 bg-white text-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95" href="#">
                  Присоединиться
                </a>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/10 text-9xl pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 font-body">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold font-headline mb-4 text-on-surface">Карта встреч</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-lg">
            Найдите мероприятие в своем районе. Нажмите на метку, чтобы увидеть детали и построить маршрут.
          </p>
        </div>
        
        <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-outline-variant/20">
          <YandexMap
            markers={MEETING_MARKERS}
            zoom={12}
            height="500px"
            className="rounded-2xl"
          />
        </div>
      </section>

      {/* Archive Gallery */}
      <section className="max-w-7xl mx-auto px-6 mb-12 font-body">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-extrabold font-headline text-on-surface">Архив встреч</h2>
          <a className="text-primary font-bold hover:text-primary-container hover:underline flex items-center gap-1.5 transition-colors" href="#">
            Вся фотогалерея <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm">
            <img 
              alt="Corgi meetup photo" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6TbmKAsxcFjyPxY3qA7UiogBtz2d2tAq0IzLWXaUyS8wXAyDpsyWUhT_AVZatk-7QzEV9ieiGcWtyGVQnOEmoWDQG09EZtUSDknf3MLqeIXSYXToijEOCgf2gT3QawNc6oGCdrtptn1wV2uZtyuHz2991rCaFCK1vkOMBpNf79XKniMZ0NaFy63CPgbQ4gEVBUblB8OZMr984G3Q2vWWcccidKHlrxYdGz3BQD7uQedLCGPQpAGw0UrSYArIr_Ikz2MhxnZHX3VY" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm">
            <img 
              alt="Corgi in autumn park" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9-MTpVaMWF_dYlv_0w6DdKf06sMH6Ijl9lhLOT1hSJc2LkC9UIancNCrv5a5a17gEL3P45DC59raz2bP5rzNs92bs1H02FgwCnCLeze9zi8Yz7Wllm8KLTsqDGUWLP-cMNs1psitw_xKSCPc9nYfuNKt-9HQCaN2sW8oRjG6l9nEmq_G2_vpD5j23wSgmlmf0qbRhJwXlcHP2fmjaLWzxw22u5j1QGZFe68VbzfA1zrQNtt-qIEF0gQP7d8LP8VYmJveFnhrIYGM" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm">
            <img 
              alt="Two corgis playing" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkwPRFTwcWm68eiBFT0vMJqA4AlIKHeZGKxNKQ6Lnv-mK9iYjNZxVhjx5QJbq1sKOJYh4m7bgFwbt2reYpSClp7jv6rYcXxr-kptOn6vZbYV7G3GT85ji8bf5We2J9-tQHhx7GV7KONgeXnnB6Tifn3yOrwQhQP679twxMeFzCHE9S3sYYodDA0qGwxDJKtQsIz699CVa4iPGA16yFEGVlZIqoyHv8OImlddFg0Iwgur8VrvBBSary_44nVEsJq2qFHATnTDxRYqk" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm">
            <img 
              alt="Corgi sitting on a bench" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2wMSsrO5MeaPuh-dHpJKrt_ec83kmCUJyPuFQge4sqCpELrUmAkUudN-h4PuIybSY27xVa8aWWmd3OlnkSIUSBIE4nMKNmNFZj2NpVurHpeRjRpIMZERgPkjjurXKlRcHRURiemxAoyQRDkLlfKinCtdHWXyrEeAnbGhDARLp5Buwha_vWlnDSIx74K_i7vyS__qOvIeIl1GE2URtyd1YhkuW29VPk6QzsO7PZuI2yjR2Eay-UnnI8FFr2Rq3UroeXzqOf_fky_Q" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
