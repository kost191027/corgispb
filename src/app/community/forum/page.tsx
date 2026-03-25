import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Форум владельцев корги — Корги СПб",
  description: "Место для общения, обмена опытом и организации прогулок в культурной столице.",
};

const TOPICS = [
  {
    id: 1,
    title: "Натуралка или корм: чем кормите своего корги в СПб?",
    category: "Питание",
    categoryColor: "text-primary bg-primary/10",
    authorName: "@spb_corgi_mama",
    publishedAt: "2 часа назад",
    previewText: "Интересно узнать, какие бренды кормов сейчас проще всего достать в Питере или кто перешел на натуралку...",
    likesCount: 128,
    commentsCount: 42,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhWlfBAfjfYaIyysANRImH71Jh5UJ1rYN4df7kfCx0NRif5AvvKMfTOhEF4ef1Q8qZBCNsgwmtX-1FULZw5R6NJQdRUdSVcj1Lxcafk4d9xmXEDPiYD7E2oGcRyIHyCl-2cEaKvo_xui-v1EcnInQIzrJf4F9Z2gf2DWuKl106Q2tFrjydWfPqB3BIZJHt6q-btqzSvWHwkt0XOFQNgqdfZEQYfASm1C-sETMvs2eJMpzkZ1UWvi1cZgFX4fgUNHfufTHf4uVfUX8"
  },
  {
    id: 2,
    title: "Зубастые проблемы: посоветуйте стоматолога в Приморском районе",
    category: "Здоровье",
    categoryColor: "text-tertiary bg-tertiary/10",
    authorName: "@pavel_korgi",
    publishedAt: "5 часов назад",
    previewText: "Нашли камень у нашего Арчи, ищем проверенную клинику поближе к дому. Кто где делал чистку?",
    likesCount: 34,
    commentsCount: 15,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDitVsExKT1cMkAD4vZzPFpTX9SufOlVtbgKaK84ua4sPrhQ_Ju14ySAYY1DmmXGQ_5TWWcUThhXzPQxFq41Mv4_kxOoYx9mRxR3ZwFq-mwtTpil7_wGRWprgMM5K8GmpRgRcdO0JtlPDktZIbxs-vRzBKX5VCUHU153BXfbpX4woiRGYMeLcPYTVPcNGabtAl7l3Zn8fM4W4vjj1EwN3yITmdVpDeiJzzTpt1SDoYzvqIEa_JFQaDBTIRzJaNyc3JgKzJtI4XDM5g"
  },
  {
    id: 3,
    title: "Как приучить корги к шуму города: опыт владельцев",
    category: "Поведение",
    categoryColor: "text-secondary bg-secondary/10",
    authorName: "@elena_and_lex",
    publishedAt: "Вчера",
    previewText: "Переехали в центр, на Невском собака в стрессе. Как вы справлялись с адаптацией к трафику и толпам?",
    likesCount: 210,
    commentsCount: 89,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCssFH4jmu2Ev3_PhSeR6U-6lkfhZYFkKAhetc2X4z6NHgj9RSS4_Ro5WR9NaN81afuW_MxAxz3Hc2gXp8jo_G1VIU4YhLDG0uDOO5MdctkEOBIihcCjeXxmkOVfEhlgekVbGmbK1O0AsFaNqPBBAwjSsyLlK-0c2OjcFX_36KvltVmDcV7-xq1uWfuIe_qQda32B0LTLO6SxRElIlxpSQ9dkXh34MtfRAU8zPqYFr22rofJ4CxgIf9gbehmAjfNiYigxwp5HVphNA"
  }
];

export default function ForumPage() {
  return (
    <main className="pt-28 pb-12 max-w-7xl mx-auto px-6 bg-background">
      {/* Forum Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-2 font-display">
            Форум владельцев корги
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-body">
            Место для общения, обмена опытом и организации прогулок в культурной столице.
          </p>
        </div>
        <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95">
          <span className="material-symbols-outlined text-lg">add</span>
          Начать тему
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Categories */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-4">Категории</h3>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-primary font-semibold bg-surface-container-lowest shadow-sm outline-none">
                  <span className="material-symbols-outlined text-xl">restaurant</span>
                  Питание
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors outline-none">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                  Здоровье
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors outline-none">
                  <span className="material-symbols-outlined text-xl">psychology</span>
                  Поведение
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors outline-none">
                  <span className="material-symbols-outlined text-xl">event</span>
                  Мероприятия
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors outline-none">
                  <span className="material-symbols-outlined text-xl">pets</span>
                  Воспитание
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors outline-none">
                  <span className="material-symbols-outlined text-xl">stethoscope</span>
                  Советы ветеринара
                </button>
              </li>
            </ul>
          </div>
          
          <div className="relative h-64 rounded-xl overflow-hidden group shadow-sm border border-outline-variant/10 cursor-pointer">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              alt="Happy corgi running in a green park in Saint Petersburg" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYze6kLJElordEG2-LyNrh2u1IBEL18qqe_IBgmqrYqgPI7kLEIlk10bxDfOyO9umiggyTVuwN0fO7rS9rHZhnDj62bHAPRDBMENy46ohjIyKM1SXzJogL2p9kg8wJHkRbSmy3lOOF9fLbV0glUQ2HgxRLEXR9b8586i-GtIZLebGMr9dI8Xd1nnjsH-HB6lOeKm_qn4FV9_eiy4xwwMyG_0LE-YdLByiI7FJB6d8lrviB5vm8RFeZc7vIh0XVNDoTVFxzO4MLG9E" 
              crossOrigin="anonymous" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-display font-bold text-lg leading-tight group-hover:-translate-y-1 transition-transform">Лучшие места для прогулок 2024</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-6 space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-full border-none focus:ring-2 focus:ring-primary/40 text-on-surface font-body outline-none" 
                placeholder="Поиск по обсуждениям" 
                type="text" 
              />
            </div>
            <div className="flex p-1 bg-surface-container-low rounded-full">
              <button className="px-6 py-3 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md">Новые</button>
              <button className="px-6 py-3 rounded-full text-on-surface-variant font-medium text-sm hover:bg-surface-container-high transition-colors">Популярные</button>
            </div>
          </div>

          {/* Topic Cards */}
          <div className="space-y-4">
            {TOPICS.map((topic) => (
              <article key={topic.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <img 
                    className="w-12 h-12 rounded-full object-cover shadow-sm bg-stone-100 flex-shrink-0" 
                    alt="User Avatar" 
                    src={topic.avatarUrl} 
                    crossOrigin="anonymous" 
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${topic.categoryColor}`}>{topic.category}</span>
                      <span className="text-xs text-on-surface-variant font-semibold">{topic.authorName} • {topic.publishedAt}</span>
                    </div>
                    <h2 className="text-xl font-bold text-on-surface mb-2 font-display leading-tight group-hover:text-primary transition-colors">
                      {topic.title}
                    </h2>
                    <p className="text-on-surface-variant text-sm line-clamp-2 font-body mb-4">
                      {topic.previewText}
                    </p>
                    <div className="flex items-center gap-6 text-on-surface-variant">
                      <div className="flex items-center gap-1.5 text-sm font-bold">
                        <span className="material-symbols-outlined text-lg opacity-70">chat_bubble</span>
                        {topic.commentsCount}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-bold">
                        <span className="material-symbols-outlined text-lg opacity-70 hover:text-red-500 transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        {topic.likesCount}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Featured Event Style Topic */}
            <article className="bg-secondary-container p-6 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-secondary/10">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500 z-0">
                <span className="material-symbols-outlined text-[120px]">festival</span>
              </div>
              <div className="relative z-10 flex items-start gap-4">
                <img 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm flex-shrink-0" 
                  alt="Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YADawV4qawaYr2U37wS1Nx-CeHUj4Q8gOxVqP6HE-r0VdhLlhWLHneuybfnRxoeSOdKa9zDkAwdCev7W9CEzhQVKtw_cXsBVVxABGKaPqXaZ5_6Yk7uCpjvnuVzznkQfEHFSQMDA0QUGh9A61cQkjuW3BW2M6VaVa1rj7yDhZCWkh8Wr1nzAVpualUJXllBIlktDb1dyRibN7hvObu0rkllVmHSvZL-hCq-bue972Rd19SASRFYwxMnfvcx8Rtjg91vaMY1mP04" 
                  crossOrigin="anonymous" 
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase text-on-secondary-container px-3 py-1 bg-white/50 rounded-full tracking-wider">Мероприятия</span>
                    <span className="text-xs text-on-secondary-container/80 font-bold">@admin_spb • 2 дня назад</span>
                  </div>
                  <h2 className="text-xl font-black text-on-secondary-container mb-2 font-display leading-tight group-hover:text-primary transition-colors">
                    Большой сбор корги в Таврическом саду в это воскресенье!
                  </h2>
                  <p className="text-on-secondary-container/90 text-sm font-semibold mb-4 pr-10">
                    Встречаемся у памятника в 14:00. Будут вкусняшки, фотосессия и море позитива. Ждем всех хвостатых!
                  </p>
                  <div className="flex items-center gap-6 text-on-secondary-container">
                    <div className="flex items-center gap-1.5 text-sm font-black">
                      <span className="material-symbols-outlined text-lg opacity-80">chat_bubble</span>
                      156
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black">
                      <span className="material-symbols-outlined text-lg hover:animate-ping opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      542
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Right Sidebar: News & Community */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container-high rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">newspaper</span>
              Важные новости
            </h3>
            <div className="space-y-4">
              <Link href="/community/forum/1" className="block group">
                <div className="text-error font-bold text-xs mb-1 flex items-center gap-1 bg-error/10 w-fit px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[10px]">warning</span> Срочно
                </div>
                <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors leading-tight">Осторожно, клещи в Ленобласти!</h4>
                <p className="text-[11px] text-on-surface-variant mt-1.5">Первые случаи в Выборгском районе. Проверьте защиту...</p>
              </Link>
              <hr className="border-outline-variant/20" />
              <Link href="/community/forum/2" className="block group">
                <div className="text-tertiary font-bold text-xs mb-1 flex items-center gap-1 bg-tertiary/10 w-fit px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[10px]">location_on</span> Локация
                </div>
                <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors leading-tight">Открытие новой площадки в Севкабеле</h4>
                <p className="text-[11px] text-on-surface-variant mt-1.5">Dog-friendly зона с тренажерами теперь открыта для всех...</p>
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-tertiary text-on-tertiary rounded-xl p-6 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <h3 className="font-display font-black text-xl mb-6">Наше сообщество</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-black font-display tracking-tighter">1,420</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 pt-1">Корги-родителей</div>
                </div>
                <div>
                  <div className="text-3xl font-black font-display tracking-tighter">5.6k</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 pt-1">Обсуждений</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-20">
              <span className="material-symbols-outlined text-[120px] rotate-[-15deg]">pets</span>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">tag</span>
              Популярные теги
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-surface-container-lowest text-xs font-bold rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all border border-outline-variant/20 hover:border-primary shadow-sm">#пемброк</span>
              <span className="px-3 py-1.5 bg-surface-container-lowest text-xs font-bold rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all border border-outline-variant/20 hover:border-primary shadow-sm">#здоровье</span>
              <span className="px-3 py-1.5 bg-surface-container-lowest text-xs font-bold rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all border border-outline-variant/20 hover:border-primary shadow-sm">#дрессировка</span>
              <span className="px-3 py-1.5 bg-surface-container-lowest text-xs font-bold rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all border border-outline-variant/20 hover:border-primary shadow-sm">#кардиган</span>
              <span className="px-3 py-1.5 bg-surface-container-lowest text-xs font-bold rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all border border-outline-variant/20 hover:border-primary shadow-sm">#новостиСПб</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
