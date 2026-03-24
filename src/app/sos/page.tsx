"use client";

import React, { useState } from "react";
import SosModal from "@/components/shared/SosModal";

const LOST_NOTICES = [
  {
    id: 1,
    name: "Арчи",
    breed: "Pembroke",
    statusText: "Пропал",
    statusBadge: "Urgent",
    statusColor: "bg-error",
    date: "12.10.2024",
    location: "Парк 300-летия, Приморский р-н",
    description: "Красный ошейник, нет хвоста. Очень пуглив, не бегите навстречу!",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiuEO7u_eZHs-oiiMM0TUosudeoviIQkkSXOnEduT8fp4aN0juxGOakVSWQSldYzM6fdwOAUWGePpuzUHbM8rXAj9LOxDqvtiQCrBQqdjoQdo8gXnOHcGnh_rly4nTThp_5esqLuYlgq-yi32xRGBFU2DZwKqrwUwhSYlgd8QskPy79SW8LHP71eTkR2BuFISuiLm740lyY4-6Li7aZR4n8dIZv4IPAQWYjeBgqtOJ7mUORO6PQ0IUJ0HAipJkVU5W8csrRGZOks8",
    btnText: "Связаться с владельцем",
    dateColor: "text-primary"
  },
  {
    id: 2,
    name: "Неизвестный",
    breed: "Cardigan",
    statusText: "Замечен",
    statusBadge: "Seen",
    statusColor: "bg-tertiary",
    date: "Вчера, 18:45",
    location: "В.О., 16-я линия, возле пекарни",
    description: "Мраморный окрас, большие уши. Был без ошейника, бежал в сторону набережной.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9ERPNGZ30H051XUi3Rh9OKAgc4JVRYp2Xm7yrb9KB_suXHIHJS9QYA3ZrvrLggAnAFdLiCZV-O-F1cweYHW7zztJZov7JLmiGb58y3fOmphZRWXG9HZcg6CMjewarNU4ib8ZBFHU04fypZKWu-MCxl6MxHh_wKeDJw9Eu7GfInbb5eGpc5ijf2ebDYneH3qoq4u8pwEmaghvzu84s7MG-omckxEkWZstS5VxuAGjpkT3Gbcpj1cdmnBbV94xYAaZdWzKNScbMN-o",
    btnText: "Узнать подробнее",
    dateColor: "text-tertiary"
  },
  {
    id: 3,
    name: "Белла",
    breed: "Pembroke",
    statusText: "Пропала",
    statusBadge: "Urgent",
    statusColor: "bg-error",
    date: "10.10.2024",
    location: "Шуваловский парк, Парголово",
    description: "Маленькая, рыжая с белым. Есть чип. Хозяева очень ждут любую информацию.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2VxAyhVwkq5vAI_PsA8qKTU-rD3GVL5BxYRuWY881B8gNL6Aok6HdCgTai2IVrao9mcX8mEdmBsKTALhffZU5T8YxUKrUpGEYD45JuF7-_0MUsC8P7ZABb73a7ymLPTtJ8troeR6ORkFeC3m1xmbhwQ_gqChxeMtwtNJLgJdANWwT6UDVZ8_ooTfu-xhq1cCuB8aK8gih4ozPNseI--IL-cozQm4mc60u8VVu89NiHL_9f69pdSyZ76_n9PrI3pO1WOjfs_HKPUw",
    btnText: "Связаться с владельцем",
    dateColor: "text-primary"
  }
];

export default function LostAndFoundPage() {
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  return (
    <>
      <main className="pt-24 min-h-screen bg-background pb-12">
        {/* Hero Banner */}
        <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10 order-2 md:order-1">
              <span className="inline-block px-5 py-2 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-sm">
                Потеряшки СПб
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-display font-black text-on-surface leading-[0.95] mb-8 tracking-tight">
                Верните <br/><span className="text-primary italic">хвостика</span> домой.
              </h1>
              <p className="text-on-surface-variant font-medium text-lg md:text-xl mb-12 max-w-md leading-relaxed">
                Если ваш корги потерялся или вы нашли чье-то сокровище на улицах Петербурга — мы здесь, чтобы помочь.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => setIsSosModalOpen(true)}
                  className="bg-primary-container text-on-primary-container px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all w-full sm:w-auto"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>report_gmailerrorred</span>
                  Пропала собака
                </button>
                <button 
                  onClick={() => setIsSosModalOpen(true)}
                  className="bg-secondary-container text-on-secondary-container px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-95 transition-all w-full sm:w-auto border border-secondaryContainer"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  Нашел собаку
                </button>
              </div>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-surface-container-high relative border border-outline-variant/10 group">
                <img 
                  alt="Sad looking corgi" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-[2s]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaLMAnG2K3F4ws9T7QhsMDFP5OPJcOiubik5Y4YytG6Sm2nY4TmDBsN6x0sV5dYuVaEOIfAOOBwfnX7sQXX_1JZ_ZtuPjollmylBCGZc-3ntDErz7FI1q4b_hEfccLx8oaPaIqrCkD0Ucm_BKR9aGVH8Asv7yIzAxU44Kcq0dSCdIj1JP3EIUJSYVlCzgPyWTQtRFriMikMDmkBW71BiN74sVO-NH06PWbuhqVNbR1CwfAWPuUW7bzdHQ6pAyYlCeRdUFvmOUbFAk" 
                  crossOrigin="anonymous" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-4 md:-left-8 bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-[240px] border-l-4 border-primary z-20 -rotate-3 hover:translate-y-[-5px] transition-transform">
                <p className="text-sm font-black text-on-surface leading-snug">Более 140 корги уже вернулись к семьям в этом году!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Advice Bar */}
        <section className="bg-primary text-on-primary py-8 overflow-hidden mx-6 rounded-[2rem] shadow-primary/20 shadow-xl relative z-20">
          <div className="absolute inset-0 bg-white/5 opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-secondary-fixed text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
              <span className="font-display font-black text-lg uppercase tracking-widest text-[#FFF]">Экстренные шаги:</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-1 justify-around text-sm md:text-base font-bold text-[#FFF]/90">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm">1</span>
                <span>Создайте пост на этой странице</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm">2</span>
                <span>Проверьте районные приюты</span>
              </div>
              <div className="flex items-center gap-4 bg-primary-container text-on-primary-container px-6 py-2 rounded-full shadow-sm whitespace-nowrap">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black flex-shrink-0">3</span>
                <span>Звоните: +7 (812) CORGI-SOS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-on-surface tracking-tight mb-4">Карта происшествий</h2>
              <p className="text-on-surface-variant font-medium text-lg">Последние известные места нахождения потеряшек в Санкт-Петербурге</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              <span className="px-5 py-2.5 bg-surface-container-high border border-outline-variant/20 rounded-full text-sm font-bold text-on-surface-variant whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm">Василеостровский</span>
              <span className="px-5 py-2.5 bg-surface-container-high border border-outline-variant/20 rounded-full text-sm font-bold text-on-surface-variant whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm">Приморский</span>
              <span className="px-5 py-2.5 bg-surface-container-high border border-outline-variant/20 rounded-full text-sm font-bold text-on-surface-variant whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm">Центральный</span>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full bg-surface-container-high rounded-[2.5rem] overflow-hidden shadow-inner group border border-outline-variant/10">
            <img 
              alt="Map of St Petersburg" 
              className="w-full h-full object-cover opacity-60 grayscale-[50%] group-hover:scale-[1.02] transition-transform duration-[3s]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs8udV4Nziw9vqbFkQ8z7xNRT1pH6qkY9IMgepzLl2EuMbnnjm4CQTrpw-4gi1RSnuLBtRa0tjOSC0miXtfoH0Hh5X94bMJYn_OEeFVp1W3_3fm3ga7ewAd6QV0w1E0ywOFjPWundhHelfwcM_ebhnrWxZFqf64kjHHkScvn8eiMqQmDOSIIXdyZ1ILYKL6vNnUfY74nFge3wCEmz5nX30yV0N1FLmjHO5a-eFj8PB0aG4doZ2AoHBp4ssJciqaAMKTiMQwwAXR2M" 
              crossOrigin="anonymous" 
            />
            
            {/* Mock Map Pins */}
            <div className="absolute top-1/4 left-1/3 group-hover:scale-110 transition-transform cursor-pointer drop-shadow-xl z-20">
              <div className="material-symbols-outlined text-error text-5xl origin-bottom animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</div>
              <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest px-4 py-2 rounded-xl text-xs font-black shadow-lg whitespace-nowrap border-b-4 border-error">Срочно! Арчи</div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/4 group-hover:scale-110 transition-transform cursor-pointer drop-shadow-xl z-10">
              <div className="material-symbols-outlined text-tertiary text-5xl origin-bottom" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</div>
              <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 mb-2 bg-surface-container-lowest px-4 py-2 rounded-xl text-xs font-black shadow-lg whitespace-nowrap border-b-4 border-tertiary opacity-0 group-hover:opacity-100 transition-opacity">Неизвестный Cardigan</div>
            </div>

            {/* Map Overlay Control */}
            <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-surface-container-lowest/80 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 border border-outline-variant/20 z-30">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">zoom_in</span>
              </div>
              <span className="text-sm font-bold opacity-80">Используйте колесо мыши для масштабирования</span>
            </div>
          </div>
        </section>

        {/* Current Alerts Grid */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-error-container text-on-error-container rounded-full text-[10px] font-black tracking-widest uppercase mb-3 shadow-sm">
                  Live Feed
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-on-surface tracking-tight">Нужна помощь прямо сейчас</h2>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 hover:bg-surface-container px-6 py-3 rounded-xl transition-colors active:scale-95 border border-primary/10">
                Все объявления
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {LOST_NOTICES.map((notice) => (
                <div key={notice.id} className="bg-surface-container-lowest rounded-[2rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-outline-variant/10 cursor-pointer">
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img 
                      alt={notice.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      src={notice.imageUrl} 
                      crossOrigin="anonymous" 
                    />
                    <span className={`absolute top-5 left-5 ${notice.statusColor} text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md`}>
                      {notice.statusBadge}
                    </span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-display font-black text-on-surface mb-2">{notice.name}</h3>
                        <span className="px-4 py-1.5 bg-surface-container text-on-surface-variant border border-outline-variant/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {notice.breed}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-1">{notice.statusText}</p>
                        <p className={`font-black ${notice.dateColor}`}>{notice.date}</p>
                      </div>
                    </div>
                    <div className="space-y-4 mb-10 flex-grow">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">location_on</span>
                        </div>
                        <span className="text-sm font-bold text-on-surface leading-snug">{notice.location}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">description</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface-variant leading-snug">{notice.description}</span>
                      </div>
                    </div>
                    <button className="mt-auto w-full py-4 bg-surface-container-high text-on-surface font-display font-black rounded-xl border border-outline-variant/20 hover:bg-primary-container hover:border-primary/20 hover:text-on-primary-container hover:shadow-md transition-all active:scale-95">
                      {notice.btnText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-24 bg-background overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-black text-on-surface mb-6 tracking-tight">Нашлись!</h2>
              <p className="text-on-surface-variant text-lg font-medium max-w-2xl mx-auto leading-relaxed">Истории счастливых воссоединений, которые дарят надежду. Никогда не сдавайтесь.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 relative">
                <div className="bg-secondary-container rounded-full w-full aspect-square absolute -top-12 -left-12 -z-10 opacity-30 blur-3xl mix-blend-multiply"></div>
                <div className="relative bg-surface-container-lowest p-4 rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-outline-variant/10">
                  <img 
                    alt="Happy corgi with owner" 
                    className="w-full h-auto rounded-[2rem] object-cover aspect-square" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNissoJ3u67xFh4p-xt5UME7c0Pm9FEIyUGeKxm7UM0rhNrA_5z9ETnCrxcQiHAUgoJZCMo-eTnAU6ZUKMCqvbBpA8LupEND_k1ROhcA7AHY75HczgW3JEKDneejIJ1gk5znRmM_PFqR4PUd19WV-5EsEU71V8a9uC4LJ3s06p9gc8g87zOFwrt_8h5h4eHEyQofblQ574U5AcK2jRss7_zDlwuG11kKv6F90r97MTMsbtGze2eMkIyBjJ7N7Y3WbR6tZcmZfvnTM" 
                    crossOrigin="anonymous" 
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="space-y-8">
                  <div className="p-10 bg-surface-container-lowest rounded-[2rem] relative shadow-lg border border-outline-variant/10 hover:-translate-y-1 transition-transform">
                    <span className="material-symbols-outlined text-[60px] text-primary/10 absolute top-5 right-5" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                    <h4 className="text-2xl font-display font-black mb-4 pr-12">Коржик дома!</h4>
                    <p className="text-on-surface-variant font-medium text-lg leading-relaxed mb-8 italic">
                      &quot;Мы уже не знали что делать, но благодаря репосту в группе Корги СПб, Коржика нашли в соседнем квартале через 3 дня. Спасибо всем неравнодушным!&quot;
                    </p>
                    <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary-container shadow-sm"></div>
                      <div>
                        <p className="text-base font-black">Семья Ивановых</p>
                        <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest mt-0.5">Октябрь 2024</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex-1 aspect-square rounded-[1.5rem] overflow-hidden bg-surface-container-high border border-outline-variant/10 hover:shadow-md transition-shadow cursor-pointer">
                      <img 
                        alt="Reunited dog 1" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7wXEicpxT9mUVSnq4cC4Eh8AwKa3Keytjl_l-7LuW-TVfSmc9iyk5PpbheSXPOx21gcBL03L3ibCYOSS5nuxiHj_CupHbeTy325crp_DRyP7EhZKOUIC5ig3vgEZyCbYAAQQ-XXpTlfuJoz2aHfTm2iBfJ6f4bSCr34GVIBlgVFlVq7duxSDFPB59Od0OWTdDhuz8mjT-JgYkmorN-wue-WWNs5lWkvXTYQ5B_50xO9eK1ZtVgBauGUKcqwNxrRG2LbmJH5lf4uc" 
                        crossOrigin="anonymous" 
                      />
                    </div>
                    <div className="flex-1 aspect-square rounded-[1.5rem] overflow-hidden bg-surface-container-high border border-outline-variant/10 hover:shadow-md transition-shadow cursor-pointer">
                      <img 
                        alt="Reunited dog 2" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFOPCQDM-IwLsnqFVHMoZcf53K8sXxiSvNX_rnvpUhrWNHPNSHCl_a9ZUSkUEsVpambZeFWO2N2rpqmSNTU6SPSqgM1HkooYuRUmxUt-7-0nIsaml0YCeJS3qYkfQJXAbJ4_cKZyXOSIOIISMhucf1noHkK8qXfRssb0x24ofobq6tsniIX95RU0VFxO_ceuyqIE-n0sTJBkuAU6nB9i4AaNUgSPkZj-BytkUEVqqCdFjEBcKYLFQhTIGLD64KzUhE4EoXbmlX9Uc" 
                        crossOrigin="anonymous" 
                      />
                    </div>
                    <div className="flex-1 aspect-square rounded-[1.5rem] bg-surface-container-high flex flex-col items-center justify-center border-2 border-dashed border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer group">
                      <span className="text-primary font-display font-black text-2xl group-hover:scale-110 transition-transform">+140</span>
                      <span className="text-[10px] uppercase font-bold text-primary mt-1 tracking-wider opacity-80">историй</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Help */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-tertiary rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-tertiary/30 hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/3 opacity-[0.05] z-0 pointer-events-none flex items-center justify-end pr-10">
                <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20">
                  Вместе мы сильнее
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-10 leading-tight">Как еще вы можете <br/><span className="italic opacity-90">помочь?</span></h2>
                
                <div className="grid md:grid-cols-2 gap-10 mb-12 text-white/90">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg flex-shrink-0 hover:scale-110 transition-transform cursor-pointer">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-black mb-2 text-white">Делайте репосты</h4>
                      <p className="text-sm font-medium leading-relaxed opacity-80 text-white/90">Каждый пост в VK или Telegram увеличивает шансы на возвращение собаки в 2 раза.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg flex-shrink-0 hover:scale-110 transition-transform cursor-pointer">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-black mb-2 text-white">Станьте волонтером</h4>
                      <p className="text-sm font-medium leading-relaxed opacity-80 text-white/90">Присоединяйтесь к нашей группе быстрого реагирования в вашем районе.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-5">
                  <button className="bg-surface-container-lowest text-tertiary px-10 py-5 rounded-full font-display font-black text-sm hover:bg-secondary-fixed transition-colors shadow-lg active:scale-95 group flex items-center gap-3">
                    Группа в Telegram
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
                  </button>
                  <button className="bg-white/10 text-white border border-white/30 px-10 py-5 rounded-full font-display font-black text-sm hover:bg-white/20 transition-colors backdrop-blur-sm active:scale-95">
                    Сообщество VK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SOS Modal Component */}
      <SosModal isOpen={isSosModalOpen} onClose={() => setIsSosModalOpen(false)} />
    </>
  );
}
