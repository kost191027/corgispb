import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Комьюнити — Корги СПб",
  description: "Самое пушистое сообщество Петербурга. Делимся опытом, гуляем вместе.",
};

export default function CommunityPage() {
  return (
    <main className="pt-24 pb-12 overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 mt-10">
        <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] h-auto min-h-[500px] flex items-center bg-surface-container-high py-12 md:py-0">
          <div className="absolute inset-0 z-0 hidden md:block group">
            <img 
              alt="Corgis and owners in St. Petersburg" 
              className="w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx63EACF2vtIIG-U4xhr_Isu1VNod7fe4BgnqPzoFTtJH9-KMqOg2cZvyVAd4A3nZEtN4QRlBypiweh5Hzg1ylBLnDul8nuJ0Xep6kGU071pKKrw08ldN0Cr2a_waV2nenMmUeHTfw17OzKvkTkQaRC15WDIu-nEPhr5AZsGEirNNfyofMWSuB4zpT7IxFH-BHtLEDBu1DLslmUIGJMzyOux5lFutNp85VKe_jPe5YGuQDhk495oDcMqLF6y2RjMkYWjhn0neOFmY" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-2xl px-6 md:pl-16 lg:pl-20">
            <h1 className="font-display font-black text-5xl md:text-7xl text-on-surface leading-[0.9] tracking-tighter mb-6">
              Комьюнити <br/><span className="text-primary italic">корги-родителей</span>
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 max-w-md leading-relaxed">
              Самое пушистое сообщество Петербурга. Делимся опытом, гуляем вместе и создаем лучшие моменты для наших коротколапых друзей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-5 rounded-full font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                Присоединиться к нам
              </button>
              <button className="bg-surface-container-highest text-on-surface-variant px-8 py-5 rounded-full font-bold hover:bg-surface-variant transition-colors border border-outline-variant/30">
                О сообществе
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Districts Map Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full md:w-5/12 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary-container/30 text-tertiary rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-tertiary/20">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                Районы города
              </div>
              <h2 className="font-display font-black text-5xl text-on-surface leading-[0.95] tracking-tight mb-6">Где мы гуляем?</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">Найдите единомышленников в своём районе. Наши группы активны во всех уголках Петербурга.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary shadow-sm">
                <span className="font-bold text-lg md:text-xl">Центральный</span>
                <span className="text-xs font-bold px-3 py-1.5 bg-primary/10 text-primary rounded-full">142 владельца</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:border-outline hover:shadow-md transition-all cursor-pointer">
                <span className="font-medium text-lg md:text-xl text-on-surface-variant">Приморский</span>
                <span className="text-xs font-medium px-3 py-1.5 bg-stone-100 text-stone-500 rounded-full">210 владельцев</span>
              </div>
              <div className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:border-outline hover:shadow-md transition-all cursor-pointer">
                <span className="font-medium text-lg md:text-xl text-on-surface-variant">Петроградский</span>
                <span className="text-xs font-medium px-3 py-1.5 bg-stone-100 text-stone-500 rounded-full">89 владельцев</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12 aspect-square md:aspect-auto md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-stone-100 group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
              alt="Стилизованная карта Санкт-Петербурга" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgshiGoicvNlyeF2mSILA8YcHF8PFTMahbt54PQJlCjOp4M3q4kbpfWfkdrHwM1FdBne0CT2zOR1ctjnFCkAop4ccc6kKvLPgPOERsBjyINuPOK1Ai7Sd34A8tcxmFesUxPKZmp7LsA2fLtBzxOGwwsRp0pWGVSPRHDJDKcvLPHnCpDnxCKbkWInwt4B6Hc19pFAQ26QMTJdjPSdjpqcOs8NW3kReot-ABnFvSGBmDHauQ-Pv3IJU9-5zWnalGAJpjn2ay8pxkNoA" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-multiply"></div>
            
            {/* Pins simulation */}
            <div className="absolute top-1/2 left-[45%] translate-x-1/2 -translate-y-4">
              <div className="w-12 h-12 bg-primary rounded-full border-[3px] border-white shadow-xl flex items-center justify-center animate-bounce hover:bg-orange-600 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              </div>
              {/* Pulse effect */}
              <div className="absolute -inset-4 bg-primary/30 rounded-full animate-ping opacity-50 z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="mb-12 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/90 backdrop-blur-[20px] p-4 rounded-full shadow-lg border border-outline-variant/15 flex gap-3 overflow-x-auto no-scrollbar items-center">
            <span className="text-xs font-black text-stone-400 uppercase tracking-widest pl-4 hidden sm:inline-block">Фильтры:</span>
            <button className="whitespace-nowrap px-6 py-3 bg-primary text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-transform">Все встречи</button>
            <button className="whitespace-nowrap px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">Активные игры</button>
            <button className="whitespace-nowrap px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">Фотосессии</button>
            <button className="whitespace-nowrap px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">Щенки</button>
            <button className="whitespace-nowrap px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">Пенсионеры</button>
          </div>
        </div>
      </section>

      {/* Group Cards & Schedule Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Active Groups (District Cards) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display font-black text-3xl mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              Активные группы
            </h3>
            
            {/* Card 1 */}
            <div className="bg-surface-container border border-outline-variant/20 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 relative group cursor-pointer hover:-translate-y-1">
              <div className="absolute top-4 right-4 bg-error text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">Hot</div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Corgi portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCao7eAlsRZZBVp-LBvyonKM1X7d-RIBNhTTHpXsr8gcSZaSyD17UOIIph1zf1fUL5Z16CSgzwlN95VXaBQFdYemwIAdM18OQo_GjV87Wr5d_4zu46jGWQurw9yrsXPRv8EptqQwAWaVGw9_BxTuR52TyJ_lt7OgwuRusZpcdzF-X6TBqfKd9zWaDC-h4AJ1urKdIudMzXJxI1mO2KjiJosntlKTUdSUItfX7JFVMQZJJ73Ndy9-My1IFnz0EPSnlZBKMRJ98v8U6A" crossOrigin="anonymous" />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-tight mb-1 group-hover:text-primary transition-colors">Приморские Булочки</h4>
                  <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">210 участников</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl mb-5">
                <p className="text-sm font-medium text-on-surface-variant flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">forum</span>
                  <span>Сегодня обсуждают:<br/><span className="font-bold text-on-surface">Лучшие дождевики для Питера</span></span>
                </p>
              </div>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm border-2 border-primary/10 hover:border-primary hover:bg-primary hover:text-white transition-all">Вступить в чат</button>
            </div>
            
            {/* Card 2 */}
            <div className="bg-surface-container border border-outline-variant/20 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 relative group cursor-pointer hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Corgi with ball" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClP-AZnXv_kdT6RYgbHicUI1a6QoGs4ilE8Ldx-4y1cPoH6rSzDj8azX5TOoPHLhPIC0Jf-cO-wQce4t9II-nLCgs0tmWXoN61KePrpn71Xwh4n5HkxulnaveJBZHWFIrOefcuh8oav3P22JYroclu9Ipoav-P0ST2wKYxXFCZVy1jK21dGlUz36lPtz3kpFK5gaSeJxSw3u_fW_JKxpN9lNj-iJWt1YghqsLqDyxvUGL4KuDuRIWyIXCT36ogOAJuRWYWqknQubk" crossOrigin="anonymous" />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-tight mb-1 group-hover:text-primary transition-colors">Центральные Коржи</h4>
                  <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">142 участника</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl mb-5">
                <p className="text-sm font-medium text-on-surface-variant flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">forum</span>
                  <span>Сегодня обсуждают:<br/><span className="font-bold text-on-surface">Встреча в Таврическом саду</span></span>
                </p>
              </div>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm border-2 border-primary/10 hover:border-primary hover:bg-primary hover:text-white transition-all">Вступить в чат</button>
            </div>
          </div>
          
          {/* Schedule Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
              <h3 className="font-display font-black text-3xl flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                Расписание встреч
              </h3>
              <Link href="/community/schedule" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                Весь календарь <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-5">
              {/* Meeting 1 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 text-center md:border-r border-outline-variant/30 md:pr-8 md:pl-2">
                  <div className="text-primary font-black text-4xl mb-1">14</div>
                  <div className="text-stone-400 font-black text-sm uppercase tracking-widest">Окт</div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full uppercase tracking-wider">Активные игры</span>
                    <span className="text-sm font-bold text-stone-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 12:00
                    </span>
                  </div>
                  <h4 className="font-display font-black text-2xl mb-2 group-hover:text-primary transition-colors">Корги-забег в парке 300-летия</h4>
                  <p className="text-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg opacity-70">location_on</span>
                    Приморский р-н, у маяка
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-outline-variant/30">
                  <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM551pBgEMFcSzjuVj9ewvjezCnZ7lrcXOK7uqu6nUOAfDhjVeUbtOmkUmW6Mbs-Biu8uzTdwPGsRJ6KOHcXkqtKhNtFAorpSoIDz1W3-vtQ0VI3zG6USP91-0H3pTh1F6vcHu5ouI6DUDeSm0n4xJDqnqvXvAlx4IWSkaUofuXysfRvil7r00spUtQHBT7t7A-0zoJ1g9hFJ-ttvycIge1bFq9gcJ3RmzfkM7WoOWjWYPniTa062RoYlC6FegVyOgQjxvjKKwmEU" crossOrigin="anonymous"/>
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn_krysMKZ2w-GkY6AdOigOoRILAZMx2NC7ZY8TNoVePYlvwB0S_M7GNXxRr6zhbUc63cJDhfxpoqXuR5mXKUZzEHx0_21e_c6kV4_p5hmBtt_737O2DAji0Z9Vgwp-fM8nrnxeF4630-BdRAM9fLGD_zB_ZfEBbpN0RE-MT7nUyDMA6fDvcNORVPfgPI3Gnx-b9OfFmCkxYz8m0CFQBLyUzgyfsEnTzlvDqccwT-gLaQvPKcpoRznym9aYoNgp5nVg8Db1dz85tM" crossOrigin="anonymous"/>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-black text-stone-500">+12</div>
                  </div>
                  <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">Участвовать</button>
                </div>
              </div>

              {/* Meeting 2 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-lg transition-all cursor-pointer">
                <div className="flex-shrink-0 text-center md:border-r border-outline-variant/30 md:pr-8 md:pl-2">
                  <div className="text-primary font-black text-4xl mb-1">15</div>
                  <div className="text-stone-400 font-black text-sm uppercase tracking-widest">Окт</div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-tertiary-container/30 text-tertiary rounded-full uppercase tracking-wider">Фотосессия</span>
                    <span className="text-sm font-bold text-stone-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 16:30
                    </span>
                  </div>
                  <h4 className="font-display font-black text-2xl mb-2 group-hover:text-tertiary transition-colors">Осенний пикник и съемка</h4>
                  <p className="text-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg opacity-70">location_on</span>
                    Таврический сад, центральная поляна
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-outline-variant/30">
                  <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvOZpj_18NxoRI6jPDC5EQJeXE1E2OJ8ZV3Nk1j0DT5HPdFQmiI31ushzCyVh9zdEu8t_YYE4CAW5wKLnN7ZXaSyB49WTp64-Td9cPepoSZFDZFN_9fxN3HoJDp-UGMGRvaNsyoCdGoMhOVQtF9OT2Su_bVOKE6BFOSn3vUtg3RNnkUN5GqIxlcC_0rn9ftx9P1zNi18woXbvdp6ptr6tMz4ukTUKKCGE-z8p75BBQle6wg5Vac0-YqwKjVvjg55a9eR6eNUF_2sU" crossOrigin="anonymous"/>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-black text-stone-500">+8</div>
                  </div>
                  <button className="w-full md:w-auto bg-surface-container-highest text-on-surface-variant px-8 py-3 rounded-xl font-bold text-sm hover:bg-surface-variant transition-colors border border-outline-variant/30">Участвовать</button>
                </div>
              </div>

              {/* Meeting 3 */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-lg transition-all cursor-pointer opacity-75 hover:opacity-100">
                <div className="flex-shrink-0 text-center md:border-r border-outline-variant/30 md:pr-8 md:pl-2">
                  <div className="text-primary font-black text-4xl mb-1">18</div>
                  <div className="text-stone-400 font-black text-sm uppercase tracking-widest">Окт</div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full uppercase tracking-wider">Лекция</span>
                    <span className="text-sm font-bold text-stone-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span> 19:00
                    </span>
                  </div>
                  <h4 className="font-display font-black text-2xl mb-2 group-hover:text-primary transition-colors">Вечер с кинологом: Вопросы воспитания</h4>
                  <p className="text-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg opacity-70">location_on</span>
                    Коворкинг &ldquo;Свои&rdquo;, ул. Жуковского
                  </p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-outline-variant/30">
                  <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20">Участвовать</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
