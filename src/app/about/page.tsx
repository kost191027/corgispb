import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все о породе — Корги СПб",
  description: "Королевские любимцы с огромным сердцем. Узнайте всё о том, что делает корги такими особенными и почему они покорили мир.",
};

export default function AboutCorgiPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-6 py-16 lg:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-primary-container/10 text-primary text-xs font-black tracking-widest uppercase mb-8 font-display border border-primary/10">
              Энциклопедия Собак
            </span>
            <h1 className="text-6xl lg:text-8xl font-black font-display text-on-surface leading-[1.05] tracking-tighter mb-8">
              Все о породе <br/>
              <span className="text-primary italic">корги.</span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Королевские любимцы с огромным сердцем. Узнайте всё о том, что делает корги такими особенными и почему они покорили мир.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/about/how-to-choose" className="px-10 py-5 bg-primary text-on-primary rounded-full font-extrabold text-lg shadow-[0_10px_30px_rgba(255,140,0,0.3)] hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(255,140,0,0.4)] transition-all">
                Найти щенка
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
              <img alt="Pembroke Welsh Corgi Profile" className="w-full h-full object-cover" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNCQR2hRprHN_XUhe5j-X76spymlqfe9jLfI1ola7PpQZ_ZFm6SjWtSDTzVtVEVttZlX6qYCvNsoQe4zYVe71B5HDbesdpJjLulQ26oYwf-ywm2uMuSZ9Gskqdn8KO9fmbMHlzshbVpG_GtAPzQ6w3t55VgGYGRa-vn441821bA_gZb9B44DajSVnEJCYsl82RRJ0MpHXvutmAL8Lr9H9SrDE7AGzWpjcRrKtAvaSOfI38uXNv8BwzOta32lNzaXXC3tXvEKfSowM" />
            </div>
          </div>
        </div>
      </section>

      {/* History & Standard */}
      <section className="px-6 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-12 rounded-xl border border-white/50 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[400px]">
              <div className="relative z-10">
                <h2 className="text-4xl font-black font-display mb-6">История породы</h2>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
                  Корги — древняя порода пастушьих собак из Уэльса. Название происходит от валлийского &apos;cor&apos; (карлик) и &apos;gi&apos; (собака). Согласно легенде, эти «лесные собаки» были подарены людям феями, которые использовали их в качестве ездовых животных.
                </p>
              </div>
              <span className="material-symbols-outlined text-[20rem] absolute -right-20 -bottom-20 opacity-5 text-primary rotate-12">pets</span>
            </div>
            <div className="bg-secondary-container p-12 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-on-secondary-container">workspace_premium</span>
              </div>
              <h3 className="text-2xl font-black font-display text-on-secondary-container mb-2">Стандарт FCI</h3>
              <p className="text-on-secondary-container/80 mb-8">Группа 1: Овчарки</p>
              <div className="w-full space-y-3">
                <div className="flex justify-between bg-white/30 backdrop-blur px-6 py-3 rounded-full font-bold text-on-secondary-container">
                  <span>Рост</span>
                  <span>25-30 см</span>
                </div>
                <div className="flex justify-between bg-white/30 backdrop-blur px-6 py-3 rounded-full font-bold text-on-secondary-container">
                  <span>Вес</span>
                  <span>10-14 кг</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black font-display text-on-surface mb-6">Два вида — две души</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Хотя обе породы называются корги, пемброк и кардиган имеют существенные отличия в характере и внешности.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Pembroke Card */}
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-lg relative">
                <img alt="Pembroke Welsh Corgi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLcAnG6HCksSVqhgP5uLenc4z19LjLuVNYmUTXfX4CiBVS3hM5vQShEqjqltqJti0qWPTIhOycWZvRubcDKel1yPI6F720w_7HQcxiexqZIKFknSl_llL-nxw9iAD9dSik0be3qYKn3Yutr0n7Nq63nwUQ7PoPiEBneybT8pB0HvVkW8LO5gd3o4Trqn6hgG46yfznlj3_yy_sMXjPrX0um86H3br9TBsX6YHwkDSWvU8j4JiY0eVCuuYV-X5CPreGGMI5yojJVHE" />
                <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-on-primary text-xs font-black rounded-full uppercase tracking-widest">Пемброк</div>
              </div>
              <h3 className="text-3xl font-black font-display mb-4">Вельш-корги пемброк</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Более «лисья» внешность, энергичный и социальный характер. Знамениты отсутствием хвоста и острыми ушками. Любимцы британской королевы.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Активный</span>
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Лисий взгляд</span>
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Общительный</span>
              </div>
            </div>
            {/* Cardigan Card */}
            <div className="group">
              <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-lg relative">
                <img alt="Cardigan Welsh Corgi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9bAZzIt15J4er5dNSAkLpZaEq45Ej9sthiG3ZO8hW6fVqZiEG5jCec4b-BSRi8IT3ZtbNuLht5i-UkvRQaNhNvJqIlT4BWVjJ5DqyWL0TKgSXLGuCnn4oCfIq-Kt50tuyozo-18HrAkWhrHl2o77fHkRR74y4SgfTUQF_QDzAmXGAShFUc-tHlNFvMzWS1m_hHNOSOyr1dm7yd_oF6qloznxYtEyNHj_RrHxB2h8WE-YjtW1pvsohHCgVzFLrsvusH3AN_HoO94M" />
                <div className="absolute top-4 left-4 px-4 py-2 bg-tertiary text-on-tertiary text-xs font-black rounded-full uppercase tracking-widest">Кардиган</div>
              </div>
              <h3 className="text-3xl font-black font-display mb-4">Вельш-корги кардиган</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Старшая и более крупная порода. Обладают длинным пушистым хвостом и закругленными ушами. Характер более спокойный и рассудительный.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Спокойный</span>
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Пушистый хвост</span>
                <span className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-bold">Наблюдатель</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips */}
      <section className="px-6 py-24 bg-tertiary text-on-tertiary overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-black font-display mb-16 text-center">Советы по уходу</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Health */}
            <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl border border-white/10 hover:bg-white/15 transition-all">
              <span className="material-symbols-outlined text-5xl mb-6 text-tertiary-fixed">fitness_center</span>
              <h4 className="text-2xl font-black font-display mb-4">Здоровье спины</h4>
              <p className="text-tertiary-fixed-dim leading-relaxed">Длинный позвоночник — уязвимое место. Избегайте высоких прыжков и используйте специальные рампы для мебели.</p>
            </div>
            {/* Weight */}
            <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl border border-white/10 hover:bg-white/15 transition-all">
              <span className="material-symbols-outlined text-5xl mb-6 text-tertiary-fixed">restaurant</span>
              <h4 className="text-2xl font-black font-display mb-4">Контроль веса</h4>
              <p className="text-tertiary-fixed-dim leading-relaxed">Корги склонны к перееданию. Лишний вес создает нагрузку на суставы, поэтому строгая диета — залог здоровья.</p>
            </div>
            {/* Grooming */}
            <div className="bg-white/10 backdrop-blur-lg p-10 rounded-xl border border-white/10 hover:bg-white/15 transition-all">
              <span className="material-symbols-outlined text-5xl mb-6 text-tertiary-fixed">brush</span>
              <h4 className="text-2xl font-black font-display mb-4">Груминг</h4>
              <p className="text-tertiary-fixed-dim leading-relaxed">Двойная шерсть требует вычесывания минимум 2 раза в неделю. Будьте готовы к обилию пуха в периоды линьки.</p>
            </div>
          </div>

          {/* Expert Quote */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white p-12 rounded-xl text-on-surface shadow-2xl relative">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-surface-container-high">
                  <img alt="Expert Anna Petrova" className="w-full h-full object-cover" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWpujcj6BLypBA7VvpLXNExCAWw2ngrMXTOzijVyYZBcqo_YGoSPx_CGD8l0HgDQfNbqg_cdlygf1NgErBVDjoMCjqLuxQBhNx6OEYS3wFqcCVSKoCNWrlC_wXNbRHqec9Zi4F6xFO9MRmuivhiu_52P5Q3I-TUx4PwWNbuos-iBMtM2AIqPY1oQHnFBJ0CeX_YR1NRnFY5gPJx7zH3bFNpeTE5sgc_zQ0pkHVhr1fdxxHnKELwdjN5AXCmJlz1gKztA_4gzupnQ" />
                </div>
                <div>
                  <p className="text-2xl font-semibold italic mb-4 leading-relaxed">&quot;Корги — это не просто собака, это 15 килограммов чистого счастья на коротких ножках. Они требуют внимания, но возвращают любовь сторицей.&quot;</p>
                  <p className="font-black text-primary">Анна Петрова</p>
                  <p className="text-sm text-on-surface-variant font-bold">Эксперт по породе, заводчик</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
      </section>
    </div>
  );
}
