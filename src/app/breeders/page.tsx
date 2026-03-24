import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Заводчики — Корги СПб",
  description: "Проверенные заводчики корги в Санкт-Петербурге. Элитные питомники.",
};

const BREEDERS = [
  {
    id: 1,
    name: "Royal Tails",
    type: "Пемброк",
    typeColors: "bg-surface-container-highest/80 backdrop-blur-sm text-primary",
    badge: "Клубный эксперт",
    rating: 4.9,
    location: "Приморский район",
    puppuStatus: "Доступны щенки: 3",
    puppyDate: "д.р. 12.12.23",
    statusBg: "bg-surface-container-low",
    btnPrimary: "Смотреть",
    btnPrimaryStyle: "bg-primary-container text-on-primary-container hover:shadow-lg shadow-primary-container/20",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFBwOpcTL8QqM22XfnvKzPmNp9glJlA2dODFqHR-_PMbLGjKY5hRxhaI_h_mksfolxmjXhkhrUZj-iSykth47YkdbaFPjfhlBOF-OD4EEi0uusa-VKcYMa_bd9mzcmynRmGZ_f3Ms3OREAR4B-209cygyTUePdaiTCPg2f9FTve3yKvNs9oXk84kyYbEA8gId1z2Ml3ib3hVgbm9wpeKBSeD9VKZ77ESd9oxJybLFIhVqzy5s4xLrPll-zWi8QVvHeQYjsmvcmVYE"
  },
  {
    id: 2,
    name: "Baltic Guardians",
    type: "Кардиган",
    typeColors: "bg-surface-container-highest/80 backdrop-blur-sm text-tertiary",
    badge: "Проверено РКФ",
    rating: 5.0,
    location: "Пушкин",
    puppuStatus: "Ожидаются пометы в марте 2024",
    puppyDate: "",
    statusBg: "bg-surface-container-high",
    btnPrimary: "Нет щенков",
    btnPrimaryStyle: "bg-surface-container-highest text-on-surface cursor-not-allowed opacity-60",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuApmGiZallCRRlJljOw_QwlXipu2ED5bfNhdbVf2Uqr9979CFSCCtxdTnCM3K2THyvhex4sIk1Qdlm4Dz7D3AAbPgPz4x8-HANpxDyZ63cc3wTVvaZ0ekLuqdPy3cZiD_YOcL2mF-cvyvydgBZwvDn7-Yq0lTnBXw6_TEjUFOsNx77Vl177AUG_JIkpxCKZRU2MAk0IciAT2SjUWnR8QluhRc4BuvyRueIpo4AI2qgTthLgnlQvJXB2DMj6e5boDyuPv5zPaFkqURU"
  },
  {
    id: 3,
    name: "Northern Fox",
    type: "Пемброк",
    typeColors: "bg-surface-container-highest/80 backdrop-blur-sm text-primary",
    badge: "Клубный эксперт",
    rating: 4.8,
    location: "Курортный район",
    puppuStatus: "Доступны щенки: 1",
    puppyDate: "д.р. 05.01.24",
    statusBg: "bg-surface-container-low",
    btnPrimary: "Смотреть",
    btnPrimaryStyle: "bg-primary-container text-on-primary-container hover:shadow-lg shadow-primary-container/20",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqZTbOW6Mre4IOtpKskY0Yywy-4Y56JLx81FIVV4Y1Zg5ZqvjWW5pF6iBOyF1wYLTsvbSyonfbWLV3miViWcrMC_bk6UQYiLx6zaT6qzZdl7Olcu4Q8C-jIYWcivkcJ8xM1GuGG_m8W7pwUh3y4Rto53Z_Os_CQKeOFCjQBLcJHx_s6MLL19Z670B3hTMcLVdrL9JdZHNv_VcGll0XUsdluszJ8TpbUErlhdaKSw4CibZ7D21rqXKyndpIWr9piha1TRgPl72KNw"
  }
];

export default function BreedersPage() {
  return (
    <main className="pt-24 min-h-screen pb-12 bg-background">
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block px-5 py-2 mb-6 text-xs font-bold tracking-widest uppercase bg-primary-container text-on-primary-container rounded-full font-display shadow-sm">
              Элитные питомники
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-on-surface leading-[0.95] tracking-tight mb-8">
              Проверенные <br/>
              <span className="text-primary italic">заводчики СПб</span>
            </h1>
            <p className="text-lg text-tertiary font-medium max-w-lg mb-10 leading-relaxed">
              Мы объединяем лучшие питомники Санкт-Петербурга, соблюдающие этические нормы разведения и строгие стандарты РКФ. Ваше путешествие к верному другу начинается здесь.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 duration-300">
                Найти щенка
              </button>
              <button className="px-8 py-5 border border-outline-variant/30 bg-surface-container-high text-on-surface-variant rounded-full font-bold hover:bg-surface-variant transition-colors">
                Правила клуба
              </button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-stone-100 group">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
                alt="Happy Corgi dog looking at the camera in a park" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNfhR0z0CvzGs60_Ln1udzeymPR672ioNEvLffdR1BiI9xnuJZXRPkmGx-QA8wo04dM2QZz0Oc-Q6eUU8W-pC-yomHwgjrn_cWuNMDGydZhGugWevRnOQHisyccs7QvSl6QXfqKUTWiW5KJvxdIWUjbL11vONBY6hQTunv2fuQ5QJh4GulnsXIWcx7KynMqS8zvXkCL1qZiy351RHHLvkGYFI4IN7EIrekRUpyIa-WkcsGpK8hiUdCicy359Ht0vpA3pLx6Oi7peo" 
                crossOrigin="anonymous" 
              />
            </div>
            <div className="absolute -bottom-6 -left-2 md:-left-6 bg-secondary-container p-6 rounded-2xl shadow-xl max-w-[220px] -rotate-3 border border-secondary/10">
              <p className="text-on-secondary-container font-display font-black text-sm leading-tight text-center">Гарантия здоровья и породности каждого щенка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-6 py-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant">search</span>
            <input 
              className="w-full pl-14 pr-6 py-5 bg-surface-container-lowest border border-outline-variant/20 rounded-full shadow-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/40 text-on-surface font-medium placeholder:text-stone-400 outline-none transition-all" 
              placeholder="Поиск по названию или району" 
              type="text" 
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-6 py-3 bg-primary text-on-primary rounded-full font-display text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">Все</button>
            <button className="px-6 py-3 bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary/30 transition-colors rounded-full font-display text-sm font-bold shadow-sm">Пемброк</button>
            <button className="px-6 py-3 bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary/30 transition-colors rounded-full font-display text-sm font-bold shadow-sm">Кардиган</button>
            <button className="px-6 py-3 bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary/30 transition-colors rounded-full font-display text-sm font-bold shadow-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              Есть щенки
            </button>
            <button className="px-6 py-3 bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:border-primary/30 transition-colors rounded-full font-display text-sm font-bold shadow-sm">Ожидаются пометы</button>
          </div>
        </div>
      </section>

      {/* Breeders Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BREEDERS.map((breeder) => (
            <div key={breeder.id} className="group bg-surface-container-lowest border border-outline-variant/20 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col cursor-pointer">
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img 
                  alt={breeder.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={breeder.imageUrl} 
                  crossOrigin="anonymous" 
                />
                <div className="absolute top-5 left-5">
                  <span className={`px-4 py-1.5 ${breeder.typeColors} text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm`}>
                    {breeder.type}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-2xl font-display font-black text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors">{breeder.name}</h3>
                    <div className="flex items-center gap-1.5 text-tertiary">
                      <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      <span className="text-xs font-bold uppercase tracking-wide">{breeder.badge}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1.5 rounded-xl border border-outline-variant/10">
                    <span className="material-symbols-outlined text-orange-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-black">{breeder.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {breeder.location}
                </div>
                
                <div className={`mt-auto ${breeder.statusBg} p-4 rounded-2xl border border-outline-variant/10 shadow-inner`}>
                  {breeder.puppyDate ? (
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-on-surface">{breeder.puppuStatus}</span>
                      <span className="text-stone-500 font-medium">{breeder.puppyDate}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-center font-bold text-on-surface-variant flex items-center justify-center h-full min-h-[16px]">
                      {breeder.puppuStatus}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-3 pt-3">
                  <button className="flex-1 py-3.5 border border-outline-variant/30 text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container-high transition-colors">Подробнее</button>
                  <button className={`flex-1 py-3.5 font-bold text-sm rounded-xl transition-all ${breeder.btnPrimaryStyle}`}>
                    {breeder.btnPrimary}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Block */}
      <section className="px-6 py-24 bg-surface-container-high rounded-[3rem] mx-6 mb-24 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-black text-on-surface leading-tight">Как выбрать <br/><span className="text-primary">заводчика?</span></h2>
            <p className="text-tertiary text-lg font-medium">Покупка щенка — это ответственность на 15 лет. Не торопитесь и обратите внимание на ключевые факторы:</p>
            <ul className="space-y-6">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <div>
                  <h4 className="font-black text-on-surface text-lg mb-1">Документы РКФ</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">У каждого щенка должна быть метрика, а у родителей — родословные.</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                </div>
                <div>
                  <h4 className="font-black text-on-surface text-lg mb-1">Тесты на здоровье</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Запрашивайте результаты генетических тестов (DM, vWD, глаза).</p>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                </div>
                <div>
                  <h4 className="font-black text-on-surface text-lg mb-1">Визит в питомник</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Хороший заводчик всегда пригласит вас познакомиться с матерью и условиями содержания.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="aspect-[4/5] bg-surface-container-lowest p-3 rounded-[2rem] shadow-xl rotate-3 hover:translate-y-[-10px] hover:rotate-0 transition-all duration-500 z-10 border border-outline-variant/10">
              <img 
                alt="Corgi Puppy" 
                className="w-full h-full object-cover rounded-[1.5rem]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsGNWbJ8uDszMyI7aADw1nMCljlZArZ_fxSsPSpTijLL7H5pQUI3CLPtOUGS61EU27BHXIz15KOdZB5pMAQQkgHG--dO6ZN1UP0ecVux292a8lt8dUie8WFze3r0GETIQ2oRHtEl2I0p27bX0s4W4Pz5WEI5Tmx6FqaG34yooxrmcWI3ZjFbtbuF8gLDLPFbwwGFclp83h6TE0fg7OP0aZzDlvd99qXyaGe-Xl8rwnmhyR1_SB1LFjULI8qHR_93ECz-wVj3_0VyE" 
                crossOrigin="anonymous" 
              />
            </div>
            <div className="aspect-[4/5] bg-surface-container-lowest p-3 rounded-[2rem] shadow-xl -rotate-6 mt-16 hover:translate-y-[-10px] hover:rotate-0 transition-all duration-500 z-20 border border-outline-variant/10 origin-bottom-left">
              <img 
                alt="Breeder" 
                className="w-full h-full object-cover rounded-[1.5rem]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8oPFjQVRZXG94ymJ2ghvXOWk-3E8Aso6wPnCDkR3jDSLfwBA-zpa9HArmmX_f_03VTYVg4vCiqLajTiWRJri8ry43sOYVhud1dPqEW4azEa3P6QsYuhAUYPia4SWMS4_x9Qzd-RqwgCF5mLrzsprYDvVefvhWHCAHMMofwrYgd4mJvvAqh1DRcrLeql2iflCrZRbaZM9LiA7U_070yOzk6sGbH_Xqi01C_TURpdD7cPWLzybM14QalWiIdizQuaLl-VeHBFPx6hk" 
                crossOrigin="anonymous" 
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 blur-3xl z-0 rounded-full mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-32 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-display font-black mb-6 text-on-surface tracking-tight">Вы профессиональный заводчик?</h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
          Присоединяйтесь к нашему сообществу и станьте частью самого большого клуба любителей корги в Санкт-Петербурге.
        </p>
        <button className="px-10 py-5 bg-on-surface text-surface-container-lowest rounded-full font-display font-bold text-lg hover:bg-primary transition-all flex items-center gap-3 mx-auto shadow-xl hover:shadow-primary/30 active:scale-95 group">
          Стать проверенным заводчиком
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </section>
    </main>
  );
}
