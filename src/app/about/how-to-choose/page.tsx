
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Как выбрать щенка корги | Корги СПб",
  description: "Полный гид: от выбора ответственного заводчика до первой судьбоносной встречи с вашим будущим другом.",
};

export default function HowToChoosePage() {
  return (
    <div className="pt-24 font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container bg-surface">
      {/* Section 1: Hero */}
      <section className="relative min-h-[716px] flex items-center overflow-hidden px-6 lg:px-12 py-20 bg-[linear-gradient(135deg,rgba(144,77,0,0.05)_0%,rgba(252,212,0,0.05)_100%)]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-2 lg:order-1">
            <span className="inline-block py-1 px-4 bg-secondary-container text-on-secondary-container rounded-full text-xs font-display font-bold tracking-widest uppercase mb-6">
              Путеводитель для владельцев
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-on-surface leading-[1.1] mb-6 tracking-tighter">
              Как выбрать <span className="text-primary">щенка корги</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed mb-10">
              Полный гид: от выбора ответственного заводчика до первой судьбоносной встречи с вашим будущим другом.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="bg-primary text-on-primary px-8 py-4 rounded-full font-display font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300" href="#guide">
                Начать чтение
              </a>
              <div className="flex items-center gap-2 text-primary font-bold px-6 py-4">
                <span className="material-symbols-outlined">play_circle</span>
                <span>Смотреть видео</span>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-xl overflow-hidden shadow-ambient rotate-3 transform transition-transform hover:rotate-0 duration-700">
              <img alt="Милый щенок корги на траве" className="w-full h-full object-cover" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk6CdHzsSJIxXeSUhidoKhXBN_0DwCvpRj8WPWtXKj8E0X0mcPfpcWTlIjWl13aveOHlR-vbhyE8acExpvOr_LUJxN5TthKSF_CpD1ldrxvchjW9-LDC1pQoDEEDJuTI-XwAUGFrNCEhJ7dHxTYrpVQLSwmWKKyOILh-3LPkyNFlW1N-Tq4fuV_tuvfhTkJUzM9dKikanBcR8DIEzbDLxYDLaRoTuMLvtvZV694n-s3qLFlvLXsun9dA99NQpSm0jk-X5Dy3TpuSY" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-ambient hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">potted_plant</span>
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Важное</p>
                  <p className="text-sm font-bold">100+ проверенных питомников</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Step-by-step Guide */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="guide">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-display font-extrabold mb-4 tracking-tight">Три шага к идеальному щенку</h2>
          <div className="h-1.5 w-24 bg-secondary-container mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-surface-container-low p-10 rounded-xl shadow-ambient transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <span className="text-8xl font-display font-black">01</span>
            </div>
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-8 text-on-primary">
              <span className="material-symbols-outlined text-3xl">search</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Поиск заводчика</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Ищите питомники, зарегистрированные в <span className="font-bold text-primary">РКФ (Российская Кинологическая Федерация)</span>. Проверьте членство в национальном клубе породы. Хороший заводчик сам будет задавать вам много вопросов.
            </p>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Регистрация в РКФ</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> История пометов</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Отзывы сообщества</li>
            </ul>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-container-low p-10 rounded-xl shadow-ambient transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <span className="text-8xl font-display font-black">02</span>
            </div>
            <div className="w-14 h-14 bg-tertiary rounded-full flex items-center justify-center mb-8 text-on-tertiary">
              <span className="material-symbols-outlined text-3xl">home</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Первый визит</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Обратите внимание на чистоту вольеров и поведение матери. Она должна быть спокойной, но не проявлять агрессии. Щенки должны содержаться в домашней обстановке для лучшей социализации.
            </p>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Чистота и запах</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Контакт с мамой</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Отсутствие скученности</li>
            </ul>
          </div>
          {/* Step 3 */}
          <div className="bg-surface-container-low p-10 rounded-xl shadow-ambient transition-transform hover:-translate-y-2 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <span className="text-8xl font-display font-black">03</span>
            </div>
            <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-8 text-on-secondary">
              <span className="material-symbols-outlined text-3xl">mood</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Выбор по характеру</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Проверьте любопытство щенка. Бросьте ключи или игрушку — щенок не должен впадать в панику. Ищите того, кто идет на контакт, но не проявляет излишней доминантности.
            </p>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Тест на бесстрашие</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Желание играть</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Реакция на человека</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Checklist of Documents */}
      <section className="bg-surface-container py-24 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl p-8 lg:p-16 shadow-ambient">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-display font-extrabold mb-8 tracking-tight">Чек-лист документов</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">description</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Метрика щенка РКФ</h4>
                    <p className="text-on-surface-variant text-sm">Свидетельство о происхождении, которое позже обменивается на родословную.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">medical_services</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Ветеринарный паспорт</h4>
                    <p className="text-on-surface-variant text-sm">Отметки о дегельминтизации и прививках по возрасту с печатями клиники.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">history_edu</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Договор купли-продажи</h4>
                    <p className="text-on-surface-variant text-sm">Юридическая гарантия ваших прав и ответственности сторон.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <img alt="Документы и щенок" className="rounded-lg shadow-inner grayscale opacity-50 contrast-125" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAimzlut9j3kBfH-JF4hihLyNSUAYoGYVnjsJbdGYKGpDqOHK_l_5fOPCs6pI2uDgPSz2rlcF7eCWeuYm7U-92_ZNG6pO-stS7jsA0GAQutxjYiWozI8dPunTbAVyR8pCBk3KNAc2xgciLWaCqmuzsBbpP_bB65eBUNKi9T73HipfgiW5J7ven5LW_rRpsiP1tZsbW8NgZNtniy-6b-5LAMi3MTIAQgjlhIqb1p1Ll00yQK7iuM2yhjpBKXWX__7avbm0pI5e9LPC8" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Health Tests Explained */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-tertiary text-on-tertiary rounded-xl p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-extrabold mb-8">Генетические тесты: здоровье превыше всего</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Ответственный заводчик всегда тестирует родителей на наследственные заболевания. Корги — крепкие собаки, но у них есть &quot;слабые места&quot;, которые можно исключить правильным подбором пар.
              </p>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg flex items-center gap-4">
                  <span className="material-symbols-outlined">genetics</span>
                  <div>
                    <span className="font-bold block">DM (Дегенеративная миелопатия)</span>
                    <span className="text-sm opacity-70">Проверка на прогрессирующий паралич задних конечностей.</span>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg flex items-center gap-4">
                  <span className="material-symbols-outlined">visibility</span>
                  <div>
                    <span className="font-bold block">Глаза (PRA, катаракта)</span>
                    <span className="text-sm opacity-70">Ежегодные осмотры офтальмолога для родителей.</span>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg flex items-center gap-4">
                  <span className="material-symbols-outlined">blood_pressure</span>
                  <div>
                    <span className="font-bold block">vWD type I (Болезнь Виллебранда)</span>
                    <span className="text-sm opacity-70">Наследственное нарушение свертываемости крови.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white text-on-surface p-10 rounded-lg shadow-ambient">
              <h4 className="text-2xl font-display font-bold text-tertiary mb-6">Почему это важно?</h4>
              <div className="space-y-6">
                <p className="italic text-lg">&quot;Покупка щенка без тестов — это лотерея, где на кону жизнь вашего питомца и огромные счета у ветеринара.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img alt="Эксперт" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmbiImq-AmzxVMYiAqWEL8_JnbM-GRq6JSwqTNKkcPRcMJ4i2lqKdHQ2BNCqdU-ASERCDT1ACxnjWGUyM2LdPKkjxw-dNPLuSqDBGnZi5ZwCNTfsLL_T9uVc5eQhgkE37GWGN7Lzj8wUU8YTa4ieLUlz2t-I0wUlwEJji9_U_7gkVkUMrj3mCOhYXa3be2prlcJss3YBYX6KISCri_Jmy_aL7ftaHtZWQiib6tx398EuOXCe4vZtYOjvSidp1Zf9D1_OpzKmkOUYU" />
                  </div>
                  <div>
                    <p className="font-bold">Анна Петрова</p>
                    <p className="text-xs text-on-surface-variant">Ветеринар-генетик, СПб</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-display font-extrabold mb-12 text-center">Частые вопросы</h2>
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-lg font-bold mb-2">В каком возрасте забирать?</h5>
            <p className="text-on-surface-variant">Оптимальный возраст — от 2 до 3 месяцев. В это время щенки уже получили первые прививки и готовы к социализации в новой семье.</p>
          </div>
          <div className="p-6 bg-white rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-lg font-bold mb-2">Мальчик или девочка?</h5>
            <p className="text-on-surface-variant">Кобели корги обычно более &quot;прямолинейны&quot; и ласковы, суки — хитрее и самостоятельнее. Выбор зависит от вашего темперамента.</p>
          </div>
          <div className="p-6 bg-white rounded-lg border-l-4 border-tertiary shadow-sm hover:shadow-md transition-shadow">
            <h5 className="text-lg font-bold mb-2">Пемброк или Кардиган?</h5>
            <p className="text-on-surface-variant">Пемброки — энергичные оптимисты, &quot;лисички&quot;. Кардиганы — более серьезные, спокойные, с длинным хвостом и мощным костяком.</p>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center bg-primary-container rounded-xl p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-[30rem] opacity-5">pets</span>
          </div>
          <h2 className="text-4xl font-display font-extrabold text-on-primary-container mb-6">Готовы встретить друга?</h2>
          <p className="text-on-primary-container text-xl mb-10 opacity-80 max-w-2xl mx-auto">Мы отобрали лучшие питомники Санкт-Петербурга и области, где заботятся о породе так же сильно, как и мы.</p>
          <a className="inline-flex items-center gap-3 bg-on-primary-container text-primary-container px-12 py-5 rounded-full font-display font-black text-lg hover:scale-105 transition-transform duration-300" href="/breeders">
            Посмотреть проверенных заводчиков
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>
    </div>
  );
}
