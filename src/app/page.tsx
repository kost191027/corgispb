"use client";

import Link from "next/link";
import { HomeCommunityMapSection } from "@/components/map/HomeCommunityMapSection";
import { useRef } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Community Alerts: Лапки на пульсе */}
      <section className="bg-primary-container/10 border-b border-primary/10 py-3 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 whitespace-nowrap text-sm font-bold text-primary">
          <div className="flex items-center gap-2 animate-pulse">
            <span className="material-symbols-outlined text-lg">wb_sunny</span>
            <span>Сегодня жарко — берегите лапки!</span>
          </div>
          <span className="w-1 h-1 bg-primary/30 rounded-full"></span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">coffee</span>
            <span>Новая корги-кофейня на Петроградке!</span>
          </div>
          <span className="hidden md:inline w-1 h-1 bg-primary/30 rounded-full"></span>
          <div className="hidden md:flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">campaign</span>
            <span>Запись на корги-забег открыта</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-primary-container/10 text-primary text-xs font-black tracking-widest uppercase mb-8 font-label border border-primary/20">
              <span className="material-symbols-outlined text-sm mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span> ОСНОВАНО В 2023
            </span>
            <h1 className="text-6xl lg:text-8xl font-black font-display text-on-surface leading-[1.05] tracking-tighter mb-8">
              Короткие лапки,<br/>
              <span className="text-primary italic">Большие сердца.</span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Присоединяйтесь к самому дружному сообществу корги в Санкт-Петербурге. Прогулки, советы экспертов и море пушистого позитива.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/register" className="px-10 py-5 bg-primary text-on-primary rounded-full font-extrabold text-lg shadow-[0_10px_30px_rgba(255,140,0,0.3)] hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(255,140,0,0.4)] transition-all active:scale-95 inline-flex items-center">
                Вступить в стаю
              </Link>
              <Link href="/pets" className="px-10 py-5 bg-surface-container-high text-on-surface rounded-full font-extrabold text-lg hover:bg-surface-container-highest transition-all active:scale-95 inline-flex items-center">
                Смотреть фото
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-lg">
              <div className="absolute inset-0 bg-primary-container rounded-full rotate-6 scale-95 opacity-10"></div>
              <div className="absolute top-0 right-0 w-4/5 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl rotate-3 z-0 group transition-transform duration-700 hover:rotate-0">
                <img alt="Пушистый пемброк" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyGLLsHV3q2zbaorwYpV-anVjiqq78ZQQFb6eMDcp9JltDsdORnnppYIWsv7Pd_2_RmXDzPIHPK5BTm75YH0NQ4rQr9nhsWSlIPo0geX_AV84ZKL6cE_SXJlcOXnBqYKGx1VNwfegcrde-0Z4AmBdr0b2x0dgVIusoUrTkeJtzzc5Lbge0R9r2haEZ0HjeLULTIHewcbLgqjc09kS-3r698d9DHNaUjdyb_sKnvVSfk7KzJqbDRDly1Hijq5DxhFsqgNsoOUyZVz0" crossOrigin="anonymous"/>
              </div>
              <div className="absolute bottom-4 left-0 w-3/5 aspect-square rounded-[2rem] overflow-hidden shadow-2xl -rotate-6 z-10 border-8 border-white hover:rotate-0 transition-transform duration-500 bg-surface">
                <img alt="Корги в Петербурге" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDee9n3Bn8usk807wNWIcE3qW_ZPtMlzI6qTqigOcqedqaGA3qdanwZqdcO3HEhr9jFIBSEQcKgIF2ydlbDfzJZRxIBwL5Xxm_yLPI2d0JE-lBFC6tTErFR72z-hkDoajbkkjTzta21mmSEbsEgF9DzyuTSlexrz0FXtCHrhhfSC_TUlUCBBRrT4QDzXZNQ8W3xpS0zJCmI-E09xK5NU3iPN6CYZZgWKjeVfa5iWjVBCA0MY5kvBZjCHC4JcaOgoznLx0sVUdVcNI4" crossOrigin="anonymous"/>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center p-4 z-20 shadow-xl border-4 border-white animate-bounce cursor-pointer">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Meetups */}
      <section className="px-6 py-24 bg-white" id="meetups">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black font-display text-on-surface mb-6">События и встречи</h2>
              <p className="text-lg text-on-surface-variant">Регулярные прогулки и тематические праздники для владельцев и их пушистых друзей.</p>
            </div>
            <button className="px-8 py-4 bg-surface-container-high text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all">Весь календарь</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/10 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhpMaE5rTy4WSY_1xF-ppzGCkQkdwKPpiYJpnkkNioqJ24UIutEI3yMDmBsf0e0V6GlSuNsN3wzCSphFQl9xgoQSdznLhz7RRBLuAhI0xPG-wtU-mM_EAmHz2GCSwnA0X6BWml8kDpQLjrfy2-0s1WXrfZo4HAH1C2Oy9L5qhzBP0pG4lwNDx1y4qUc0srEO93ECjDZBSNbn1SL8ed7ouhbTCDw2mCivqcc0JgwoOzfJeIZjVegmZbm0AmCCueTFqmt_LqOttt1rI" crossOrigin="anonymous"/>
                <div className="absolute top-4 left-4 bg-primary text-white font-black px-3 py-1 rounded-full text-xs">СКОРО</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> 15 Июня, 12:00
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Корги-забег в парке 300-летия</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-2">Самый масштабный забег года! Призы, фотосессии и море веселья на берегу Финского залива.</p>
                <div className="mt-auto">
                   <button className="w-full py-4 bg-white border-2 border-primary text-primary font-black rounded-full group-hover:bg-primary group-hover:text-white transition-all">Присоединиться</button>
                </div>
              </div>
            </div>
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/10 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS9t4cyAKMs7YJ72jAyu8rliMmh-gE410Br2dDE7jmR1oIUQPVo6K3L3MEGgSUwXVTnUA96z7w_89FZDG3aC2nvTf4gmwk3prywGPhL8bce6Y2KD2rYT5-M-6FXSsgJA4hySJShrZuMtBOZNExZGz4esprZtGHc7gKFRWu8C9I3BPHj3Xy3LC_WhQ6oFt24GOLcGTNNrlznbe_t6Z-iylj-6KfZ9Da85qfYdgxFGHxsxQznJ5VeUb3GH2ckIUJDLcrNCGX6nyH6Kg" crossOrigin="anonymous"/>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> 22 Июня, 18:00
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Встреча в Таврическом саду</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-2">Традиционная субботняя прогулка. Обсуждаем уход за шерстью и просто радуемся лету.</p>
                <div className="mt-auto">
                    <button className="w-full py-4 bg-white border-2 border-primary text-primary font-black rounded-full group-hover:bg-primary group-hover:text-white transition-all">Присоединиться</button>
                </div>
              </div>
            </div>
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/10 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4H0sQ0YmDIaFmVkzjyqFxMZcPBuXRryeW1Jvzj4dwNYYDODwTfxY5fd7_AhEhitNNzKkkih-d_0W4AE9B1fHS-Q45koj2UcQBvAYt_lTx9CZm9D3DK-hkFenl1fMtQNUNUlo-W3KYoUtThvLhligjlGu3zuGVc0mGKG3HE0eVw_m-ur-8tfDHUeFGRJBUPwBZ9hLjmTzpdtbsqXgls-m4jzB7b-DaCQqa0pTJIG4FFV0qZ8AHSmGwFOk8soND6hAUW7RLdgVAJ50" crossOrigin="anonymous"/>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                  <span className="material-symbols-outlined text-sm">calendar_month</span> 30 Июня, 14:00
                </div>
                <h3 className="text-2xl font-black font-display mb-4">Пикник на Новой Голландии</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-2">Совместный завтрак на траве. Dog-friendly меню и лекция от кинолога.</p>
                <div className="mt-auto">
                    <button className="w-full py-4 bg-white border-2 border-primary text-primary font-black rounded-full group-hover:bg-primary group-hover:text-white transition-all">Присоединиться</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why we love Corgis */}
      <section className="px-6 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black font-display text-on-surface mb-6">Почему мы любим корги</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Больше чем просто коротколапые питомцы, они — душа нашего Петербургского комьюнити.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <button className="md:col-span-2 md:row-span-2 bg-white p-10 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500 text-left group overflow-hidden border border-white/50 relative">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">auto_awesome</span>
                </div>
                <h3 className="text-3xl font-black font-display mb-6">Несравненная харизма</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">Корги не просто ходят; они дефилируют с достоинством, которому позавидуют завсегдатаи лучших заведений города.</p>
              </div>
              <div className="mt-8 rounded-2xl overflow-hidden h-72 shadow-inner relative">
                <img alt="Корги с характером" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACX8Y_QYwmxbyoOGtPwqiy9TbzgcvmcZ5Nq9wIUwBpm8od6tGG2tpYSpKPdKpsYaq_zIdBITXm6wgEJSKqkGVqHNZpKQVYDAa6NzJwht2dZbppg5thWf47AYJg4E1UAtLjmINyZ4dbJX1OgtuqpdM2wiqu6W2lgK5D0IoWSGLw2t5PPjJIX--jLFy3ISsDSm5ynJoGUeXWWZaC77VTEPpWv8XzVMCIAYS0Q_IOT2dAKL4GKMWj7IE3sQcmAM2zh1_US_9e64Qt4fA" crossOrigin="anonymous"/>
              </div>
            </button>
            <button className="bg-[rgba(252,212,0,0.1)] p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-left group border border-[rgba(252,212,0,0.1)] relative">
              <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:rotate-12 transition-transform">groups</span>
              <h3 className="text-2xl font-black font-display mb-4">Душа компании</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Они заводят друзей в парке быстрее, чем мы успеваем поздороваться. Мастера коммуникации!</p>
              <div className="text-primary font-bold text-sm flex items-center gap-1 opacity-60 group-hover:opacity-100">Узнать больше <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </button>
            <button className="bg-[rgba(255,140,0,0.1)] p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-left group border border-[rgba(255,140,0,0.1)] relative">
              <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:scale-110 transition-transform">bakery_dining</span>
              <h3 className="text-2xl font-black font-display mb-4">Стиль «Буханочка»</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Идеальная форма для дневного сна и самых уютных объятий на свете.</p>
              <div className="text-primary font-bold text-sm flex items-center gap-1 opacity-60 group-hover:opacity-100">Узнать больше <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </button>
            <button className="md:col-span-2 bg-tertiary text-on-tertiary p-10 rounded-xl flex items-center justify-between overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-500 text-left group">
              <div className="z-10 relative">
                <h3 className="text-3xl font-black font-display mb-4">Знаменитый «Сплут»</h3>
                <p className="text-on-tertiary/80 text-lg max-w-sm leading-relaxed mb-6">Особая тактика расслабления или просто вершина коржиного дзена?</p>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full inline-flex items-center gap-2 font-bold text-sm hover:bg-white/30 transition-colors">
                  Смотреть фото сплутов <span className="material-symbols-outlined text-sm">visibility</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[12rem] absolute -right-12 -bottom-12 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-700">gesture</span>
            </button>
          </div>
        </div>
      </section>

      <HomeCommunityMapSection />

      {/* Gallery Carousel Demo */}
      <section className="py-24 bg-surface-container-low overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black font-display text-on-surface mb-4">Наши пушистые друзья</h2>
            <p className="text-on-surface-variant text-lg">Фотографии с последних встреч сообщества.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scrollGallery("left")} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 group">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={() => scrollGallery("right")} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 group">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="relative mt-8 max-w-[100vw] overflow-hidden -mx-6 px-6">
          {/* Static translation of the scroll animation layout */}
          <div ref={scrollContainerRef} className="flex gap-8 px-4 py-4 w-full flex-nowrap overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
            <Link href="/pets/1" className="min-w-[450px] aspect-video flex-shrink-0 rounded-[2rem] overflow-hidden shadow-ambient hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 bg-stone-200 snap-center">
              <img alt="Корги 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhpMaE5rTy4WSY_1xF-ppzGCkQkdwKPpiYJpnkkNioqJ24UIutEI3yMDmBsf0e0V6GlSuNsN3wzCSphFQl9xgoQSdznLhz7RRBLuAhI0xPG-wtU-mM_EAmHz2GCSwnA0X6BWml8kDpQLjrfy2-0s1WXrfZo4HAH1C2Oy9L5qhzBP0pG4lwNDx1y4qUc0srEO93ECjDZBSNbn1SL8ed7ouhbTCDw2mCivqcc0JgwoOzfJeIZjVegmZbm0AmCCueTFqmt_LqOttt1rI" crossOrigin="anonymous"/>
            </Link>
            <Link href="/pets/2" className="min-w-[450px] aspect-video flex-shrink-0 rounded-[2rem] overflow-hidden shadow-ambient hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 bg-stone-200 snap-center">
              <img alt="Корги 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP_b-Cas0TCEedX4fe7YuCUyPu6RCwvOqq3ODu7b-Yl58un9GvC3LfGZGpZF6FBCdjgl2Fnng01bwJxRE8b7hVoKUIb2FYLd56A8Q-a9OWMDrNI3vfszfUoR8PPZRGwiFAtzojE2Vo5hCDaXJ89GI1ONmbb1s0C9qrbWd3tpX_nZz_EqHPDh_a8H53pHhIEC-wiNApT_b2uynONMRdSftGmZgQEZ4WeeflRGzeNVBbH293ARYAm1nY4WjmSlewV8RaNP8p1Ua8Dzs" crossOrigin="anonymous"/>
            </Link>
            <Link href="/pets/3" className="min-w-[450px] aspect-video flex-shrink-0 rounded-[2rem] overflow-hidden shadow-ambient hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 bg-stone-200 snap-center">
              <img alt="Корги 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS9t4cyAKMs7YJ72jAyu8rliMmh-gE410Br2dDE7jmR1oIUQPVo6K3L3MEGgSUwXVTnUA96z7w_89FZDG3aC2nvTf4gmwk3prywGPhL8bce6Y2KD2rYT5-M-6FXSsgJA4hySJShrZuMtBOZNExZGz4esprZtGHc7gKFRWu8C9I3BPHj3Xy3LC_WhQ6oFt24GOLcGTNNrlznbe_t6Z-iylj-6KfZ9Da85qfYdgxFGHxsxQznJ5VeUb3GH2ckIUJDLcrNCGX6nyH6Kg" crossOrigin="anonymous"/>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black font-display text-on-surface mb-16">Хвостатые отзывы</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-12 rounded-[2.5rem] bg-surface-container-low text-left shadow-lg border border-primary/5 hover:shadow-2xl transition-all duration-300 relative group">
              <div className="flex gap-1 text-primary mb-8">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-2xl font-semibold italic mb-10 text-on-surface-variant leading-relaxed">&quot;Это сообщество изменило нашу жизнь. Теперь у Картошки есть двадцать лучших друзей!&quot;</p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full ring-4 ring-white overflow-hidden shadow-md">
                    <img alt="Owner" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL28WKytv8fG0JQLYSVi_r-EL657av_YrBX8pBj7UocGyO4VwlH59QJtX0qBD82xXSo4WKEeeeFdvr0zRa6DUSHWhrKJIR6FVtDhsX6Q87i1fTD-cpAleFU0XTbfyPY4RByRH687uf7lYtLt0K5vswGwHVmWQ8vmDwsBweBiYQJVyg8FKHq0ajDUkwnR9fVnTX21vVf4Vl7rpsUjkNjOclw7QP8Vv-rIlqbQS3OFYUF-_6-CReoAlX65wVgePcqz8AvXrc8i8RNRg" crossOrigin="anonymous"/>
                  </div>
                </div>
                <div>
                  <span className="block font-black text-on-surface">Саша и Картошка</span>
                  <span className="text-sm text-primary font-bold">Участники с 2023 года</span>
                </div>
              </div>
            </div>
            
            <div className="p-12 rounded-[2.5rem] bg-surface-container-low text-left shadow-lg border border-primary/5 hover:shadow-2xl transition-all duration-300 relative group">
              <div className="flex gap-1 text-primary mb-8">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="text-2xl font-semibold italic mb-10 text-on-surface-variant leading-relaxed">&quot;Благодаря форуму мы нашли лучшего кинолога и сбросили лишний вес. Спасибо вам!&quot;</p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full ring-4 ring-white overflow-hidden shadow-md bg-stone-200">
                     <span className="flex items-center justify-center w-full h-full text-slate-500 font-bold">А</span>
                  </div>
                </div>
                <div>
                  <span className="block font-black text-on-surface">Антон и Макс</span>
                  <span className="text-sm text-primary font-bold">Участники с 2024 года</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <Link href="/register" className="inline-flex px-12 py-6 bg-primary text-white rounded-full font-black text-lg shadow-2xl hover:bg-orange-600 hover:scale-105 transition-all items-center gap-4 mx-auto active:scale-95 group">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform shadow-sm">pets</span>
              Познакомиться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* FAB (Mobile Add Button, normally floating) */}
      <button className="fixed bottom-28 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-[0_15px_35px_rgba(255,140,0,0.4)] flex items-center justify-center md:hidden z-40 active:scale-90 hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* Tailwind's utility class mapping for custom arbitrary colors from HTML */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </>
  );
}
