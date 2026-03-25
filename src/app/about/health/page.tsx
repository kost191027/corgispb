import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Советы ветеринара — Корги СПб",
  description: "Здоровье ваших коротколапиков. Советы от ведущих ветеринаров Санкт-Петербурга специально для владельцев корги.",
};

export default function HealthPage() {
  return (
    <div className="pt-24 pb-20 font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container bg-surface">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 z-10">
            <span className="bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-6 inline-block">Экспертная помощь</span>
            <h1 className="leading-[0.9] tracking-[-0.05em] text-5xl md:text-7xl font-display font-extrabold text-on-background mb-8">
              Здоровье ваших <br/>
              <span className="text-primary italic">коротколапиков</span>
            </h1>
            <p className="text-tertiary text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Советы от ведущих ветеринаров Санкт-Петербурга специально для владельцев корги пемброк и кардиган.
            </p>
            <div className="relative max-w-md group">
              <div className="absolute inset-0 bg-primary-container/20 blur-2xl rounded-full transition-opacity opacity-0 group-hover:opacity-100"></div>
              <input className="relative w-full bg-surface-container-highest border-none rounded-xl py-5 px-8 focus:ring-2 focus:ring-primary/40 transition-all" placeholder="Спросите о симптоме или лекарстве..." type="text" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-3 rounded-lg shadow-lg">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" alt="Female veterinarian holding a happy corgi dog" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9XFQaot1ROeG01YitfRRmsqIVOPKv9LqfcLPdptSRldlKeXdUxLoH9vPR_jkKtXhHVRXFfcXhw8OqhegGv2HskyQA38cN_15Fr0NOt0JBZvMdX0tNy94E8VODqgIBJOiAgfLt_cR7YcYQ2tcxlxXoDA2qN43MrnIYqdQG6zR9Oo3v4zhrUpN7mZjla4rIh6L6wLjQR3xbjd41TlDtSz3TD2qXpCB-tLy2t8ZGa_1U13ijsakJaE8An4bHxwAaBY_5r02JOlWATH8" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-secondary-container p-6 rounded-lg shadow-xl max-w-[200px] -rotate-6 group-hover:-rotate-3 transition-transform duration-500">
                <p className="text-on-secondary-container font-display font-black text-xs uppercase tracking-widest mb-1 opacity-70">Анонс</p>
                <p className="text-on-secondary-container font-display font-bold text-sm leading-tight">В этом месяце: Контроль веса перед зимой</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Concerns */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-display text-3xl font-extrabold mb-2">Главные вопросы</h2>
              <p className="text-outline">Особенности породы, требующие внимания</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* IVDD Card */}
            <div className="md:col-span-8 group relative bg-surface-container-lowest rounded-xl overflow-hidden p-8 border border-outline-variant/10 shadow-sm flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex gap-2 mb-4">
                  <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Critical</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Здоровье спины (IVDD)</h3>
                <p className="text-on-surface-variant mb-8">Удлиненное тело корги создает нагрузку на позвоночник. Узнайте, как правильно организовать быт, чтобы избежать грыж и дискомфорта.</p>
                <a className="inline-flex items-center gap-2 text-primary font-bold group target-link" href="#ivdd">
                  Читать гид <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden h-48 md:h-full">
                <img className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700" alt="Corgi standing on a specialized ramp" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ57ZI66l6YNs22pGEDljaGou0f4F1nA3dmFOClG9fIHgrR1MAEkese-b_sprmRGUsdcNBFbzTgDjYRMnxmdxmjsYsb0LiflXZLxzM4OFiiXkX2LX0zUiQWN8eGQ2CHiczf8W5e4kSsP-MB_vYXIbHCW783kXP9QFm06eDmPF8KskEWy8yeqCupT3Xfd4Dw2ZTSw4RP7hdDUJoMaBgsjfFPCUWvzrB6luOa2-p1qfrTsq178iDyCojOwoLStU3zIrrmGpC--ru528" />
              </div>
            </div>
            {/* Weight Control */}
            <div className="md:col-span-4 bg-primary-container rounded-xl p-8 flex flex-col justify-between text-on-primary-container">
              <div>
                <span className="material-symbols-outlined text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>scale</span>
                <h3 className="text-2xl font-display font-bold mb-2">Контроль веса</h3>
                <p className="opacity-90">Лишние 500 грамм — это огромная нагрузка на лапки корги.</p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-on-primary-container/20 pb-2">
                  <span>Диета</span>
                  <span className="font-bold">8/10</span>
                </div>
                <div className="flex justify-between border-b border-on-primary-container/20 pb-2">
                  <span>Нагрузка</span>
                  <span className="font-bold">6/10</span>
                </div>
              </div>
            </div>
            {/* Joints & Paws */}
            <div className="md:col-span-5 bg-tertiary rounded-xl p-8 text-on-tertiary relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-4">Суставы и лапы</h3>
                <p className="opacity-80 mb-6">Короткие лапы — длинный путь. Как сохранить подвижность до самой старости.</p>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 transition-all">Упражнения</button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[12rem] opacity-10 rotate-12">pets</span>
            </div>
            {/* Gen test */}
            <div className="md:col-span-7 bg-surface-container-high rounded-xl p-10 flex items-center justify-between group hover:bg-surface-container transition-colors">
              <div className="max-w-md">
                <h3 className="text-xl font-display font-bold mb-2">Генетические тесты</h3>
                <p className="text-on-surface-variant">Флаконы, тесты и что должен знать ответственный заводчик и владелец.</p>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary">biotech</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Articles */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-display text-4xl font-extrabold mb-4">Статьи от экспертов</h2>
            <p className="text-outline text-lg">Глубокие исследования и практические советы для повседневного ухода.</p>
          </div>
          <button className="text-tertiary font-bold hover:underline">Все статьи (48)</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Article 1 */}
          <article className="flex flex-col gap-6 group">
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="A small puppy getting a vaccine" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAobfyMaMHgrqJ9WUWzxOc5kzrYQgHm0sbf-Ui8TXaqvknyLmGl1CmdvlTMvlrS68PCsdAsc0BNqC-mtAg31xUYbvlQhcrZzLERb_vPo-BJBYXNXoi2q5eKzbOSRXm9xrAln61RCncPDZWTDcyUOkcmugfsnawoT-hshz6QgdnK4xPFfdC0UORWsvwPuK4INVPxKQbXWSX27oby6gfaGkNb8fzf8M5AB3dCy5_rpndspzAH-adv_mTLKL8xWTmXbiJ2yaEzwXZvJ64" />
              <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight">Новое</div>
            </div>
            <div>
              <div className="flex gap-4 mb-3">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Вакцинация</span>
                <span className="text-outline text-[10px] font-bold uppercase tracking-widest">5 мин чтения</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">График прививок 2024: Что изменилось?</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Разбираем новые рекомендации ветеринарных ассоциаций по ревакцинации взрослых собак.</p>
            </div>
          </article>
          {/* Article 2 */}
          <article className="flex flex-col gap-6 group">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Close up of a flower and a dog nose" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI4zadLp1XT-BKXLwVTj62ubyWJ6yzfkAWirmKc8G_4oxWNSJkYo-C1yFfmT1GomWNXbGh6nvkdP-ImGqqpm1M6STfpn2aZqQRmxnlLLCR6Lr2cBULBj6u2qOSBeYrHR9Z6NxzGQseJIpWQdUJThWzdWpqpecJ9i4GhV7gZzaksXBJ9SBcOBxYAT03b5iATkCwwA7V_wPKYU3I2_4vGZ5-CSIgRwpR4zYs8kjdOQIgVnme5dNrcfbGNl00I9_-2qTVD9KYvoER530" />
            </div>
            <div>
              <div className="flex gap-4 mb-3">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Аллергия</span>
                <span className="text-outline text-[10px] font-bold uppercase tracking-widest">8 мин чтения</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">Сезонная аллергия в Петербурге</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Как помочь коржику, если он чешется после прогулок в парках СПб.</p>
            </div>
          </article>
          {/* Article 3 */}
          <article className="flex flex-col gap-6 group">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Happy dog eating from a bowl" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjx3HyBpJu8j6zzBEfpyzi3rmWT-tG4jypCCgs71-YXpnAlsocgpbZ-SSPRi5YkqaZu_n-51lzwkT5mph1jI3w3aWfpGnc9vPa3bc5UjpIiX0JOqlSNGtcS5KYhUskpfzX-WV7KXpTMf8wrIDYpBLUnj8Evich430Gcm3-3nlIe8UWT3A0At_RFmBCDe0-Lp59PDHxTzG3VcV-FBcdZXbw-JNy6yPmYT__7ZcIQZOVtUCk-umIQNBBCEGOSWETf6zd9V8wduhBR0o" />
            </div>
            <div>
              <div className="flex gap-4 mb-3">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Питание</span>
                <span className="text-outline text-[10px] font-bold uppercase tracking-widest">12 мин чтения</span>
              </div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">Натуралка или сухой корм?</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2">Плюсы и минусы каждого подхода с точки зрения гастроэнтеролога.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Recommended Clinics */}
      <section className="bg-stone-900 py-24 text-white overflow-hidden rounded-xl mx-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-extrabold mb-6 text-white">Проверенные клиники СПб</h2>
            <p className="text-stone-400 text-lg mb-10">Мы собрали список мест, где врачи знают специфику породы и умеют работать с нашими «длинными» друзьями.</p>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-white">Вега на Пулковском</h4>
                  <span className="text-secondary-fixed text-sm font-bold">5.0 ★</span>
                </div>
                <p className="text-xs text-stone-300 mb-4 opacity-90">Специализация: Травматология, Хирургия</p>
                <div className="flex gap-2">
                  <span className="bg-stone-800 text-stone-300 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">Московский р-н</span>
                  <span className="bg-stone-800 text-stone-300 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">24/7</span>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-white">Клиника Сотникова</h4>
                  <span className="text-secondary-fixed text-sm font-bold">4.9 ★</span>
                </div>
                <p className="text-xs text-stone-300 mb-4 opacity-90">Специализация: Неврология, МРТ</p>
                <div className="flex gap-2">
                  <span className="bg-stone-800 text-stone-300 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">Приморский р-н</span>
                </div>
              </div>
            </div>
            <button className="mt-10 bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold">Открыть полную карту</button>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden relative grayscale shadow-2xl ring-1 ring-white/20">
            <img className="w-full h-full object-cover opacity-60" alt="Saint Petersburg clinics map" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv65EFoK9JkTSDLjh893upRCa9wa_gS0Rqf6woz_defuXAg7Uj_Fl9zcb_lnybnf8U9Lr5RyAnc1ZMlTevS93xVJpu7av8wyfX-h6AYRvIrF94p1Z3f-AhFUdRi-YpLJ5JoC9RRcDAhxg5n3L_mC1_ncRZKi6K98krpO5-m2QiFF-MwzoovSeoOJiLDHmy9l0w-c4WpdhROojrnRFa9wUDv9W-2K0lQFf1IXGeZImTDugJbh--NNWaBYvN5LA4IW5TUykjbTZLpp8" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-white/10 backdrop-blur p-4 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white">map</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Локации</p>
                <p className="text-sm font-bold">12 клиник в базе</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-display text-3xl font-extrabold mb-12 text-center">Частые вопросы (FAQ)</h2>
        <div className="space-y-4">
          <details className="group bg-surface-container-low rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
            <summary className="flex justify-between items-center list-none">
              <h4 className="font-display font-bold text-lg">Когда начинать давать хондропротекторы?</h4>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="mt-4 text-on-surface-variant leading-relaxed">
              Рекомендуется начинать профилактический прием после 1 года, когда завершается активный рост костей. Однако, если ваш корги проявляет высокую активность (прыжки, аджилити), консультация врача может потребоваться раньше.
            </div>
          </details>
          <details className="group bg-surface-container-low rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
            <summary className="flex justify-between items-center list-none">
              <h4 className="font-display font-bold text-lg">Как правильно стричь когти в домашних условиях?</h4>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="mt-4 text-on-surface-variant leading-relaxed">
              Используйте когтерезку гильотинного типа. Важно не задевать пульпу (розовую часть). Если когти черные, стригите по 1-2 мм до появления черной точки в центре среза. Не забывайте про поощрение вкусняшками!
            </div>
          </details>
          <details className="group bg-surface-container-low rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
            <summary className="flex justify-between items-center list-none">
              <h4 className="font-display font-bold text-lg">Нужны ли ботинки на зиму в Петербурге?</h4>
              <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="mt-4 text-on-surface-variant leading-relaxed">
              Из-за обилия реагентов в центре СПб ботинки или защитный воск — это необходимость. Реагенты вызывают химические ожоги между пальцами, что очень болезненно для низких собак.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
