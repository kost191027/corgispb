import Link from "next/link";

export default function ExpertArticlePage() {
  return (
    <main className="pt-24 pb-20">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-8 mb-8 flex items-center gap-2 text-sm text-on-surface-variant font-body">
        <Link className="hover:text-primary transition-colors" href="/">Главная</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link className="hover:text-primary transition-colors" href="/about/health">Здоровье и Питание</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface font-medium">Рацион в Балтийском климате</span>
      </nav>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Article Main Column */}
        <article className="lg:col-span-8">
          {/* Hero Section */}
          <div className="relative rounded-xl overflow-hidden mb-12 bg-surface-container-low aspect-[16/9]">
            <img alt="Corgi portrait" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbd-8j7Nkkicexjk436HpT81glI5mrOlseeeBDd1q-sCIJYmswJqwktEmhyW81R5XqK_qhgyZWxHoeXJWEQIkmpjfMWA-8plDScwORPcFuEf9Ce-T7-UCdkTnvodN8N0BxTCWgMLxlW01uDy8wLpXGrjt2N6n1ofVE1RW-1_90QkkCpLN_041Sh5Y0oEhQ946MS7CpnNOUjvC5Rnh_9eRvWw_A92eGp48xxATQXrUZ2yk6Jr_rtBWHNEs9RzBY_5y0ftLthpvgHZM" crossOrigin="anonymous" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12">
              <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold w-fit mb-4">Здоровье и Питание</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight font-headline">Полное руководство по питанию корги в условиях Балтийского климата</h1>
              <div className="flex items-center gap-6 text-white/90 text-sm font-body">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  14 Октября 2024
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  12 мин чтения
                </span>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="prose prose-lg max-w-none text-on-surface-variant mb-12 font-body">
            <p className="text-xl leading-relaxed font-medium text-on-surface">Санкт-Петербург известен своей переменчивой погодой, высокой влажностью и короткими световыми днями зимой. Для таких активных собак, как корги, эти факторы напрямую влияют на метаболизм и потребность в витаминах.</p>
          </div>

          {/* Comparison Table */}
          <section className="my-16 bg-white rounded-xl p-8 shadow-xl shadow-stone-900/5">
            <h2 className="text-2xl font-bold mb-8 text-primary font-headline">Натуральное питание vs Премиум-корма</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2 font-body">
                <thead>
                  <tr className="text-on-surface-variant text-sm">
                    <th className="pb-4 px-4">Критерий</th>
                    <th className="pb-4 px-4">Натуральное питание</th>
                    <th className="pb-4 px-4">Премиум-корма</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface">
                  <tr className="bg-surface-container-low rounded-lg">
                    <td className="py-4 px-4 font-bold rounded-l-lg">Баланс КБЖУ</td>
                    <td className="py-4 px-4">Требует ручного расчета</td>
                    <td className="py-4 px-4 rounded-r-lg">Сбалансировано на заводе</td>
                  </tr>
                  <tr className="bg-surface rounded-lg">
                    <td className="py-4 px-4 font-bold rounded-l-lg">Поддержка суставов</td>
                    <td className="py-4 px-4">Нужны доп. добавки</td>
                    <td className="py-4 px-4 rounded-r-lg">Включено (хондроитин)</td>
                  </tr>
                  <tr className="bg-surface-container-low rounded-lg">
                    <td className="py-4 px-4 font-bold rounded-l-lg">Витамин D</td>
                    <td className="py-4 px-4">Высокий риск дефицита</td>
                    <td className="py-4 px-4 rounded-r-lg">Оптимизировано под регион</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Expert Tips Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            <div className="bg-primary-container/10 p-8 rounded-xl border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                <h3 className="font-bold text-primary font-headline">Совет по витаминам</h3>
              </div>
              <p className="text-sm leading-relaxed font-body">В зимний период в СПб обязательно добавляйте Омега-3. Это поддерживает шерсть в условиях центрального отопления и влаги.</p>
            </div>
            <div className="bg-tertiary-container/10 p-8 rounded-xl border-l-4 border-tertiary">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                <h3 className="font-bold text-tertiary font-headline">Контроль веса</h3>
              </div>
              <p className="text-sm leading-relaxed font-body">Корги склонны к полноте. Из-за коротких прогулок в дождь снижайте калорийность рациона на 10-15% в осенний период.</p>
            </div>
          </div>

          {/* Local Recommendations */}
          <section className="my-16">
            <h2 className="text-2xl font-bold mb-8 font-headline">Где покупать в Петербурге?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-surface-container-high rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="font-bold mb-2 font-headline">ЗооОптТорг</div>
                <div className="text-xs text-on-surface-variant font-body">Сеть магазинов у дома</div>
              </div>
              <div className="p-6 bg-surface-container-high rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="font-bold mb-2 font-headline">PetShop.ru</div>
                <div className="text-xs text-on-surface-variant font-body">Быстрая доставка</div>
              </div>
              <div className="p-6 bg-surface-container-high rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="font-bold mb-2 font-headline">Биосфера</div>
                <div className="text-xs text-on-surface-variant font-body">Ветеринарные диеты</div>
              </div>
            </div>
          </section>

          {/* References */}
          <footer className="mt-20 pt-8 border-t border-outline-variant text-xs text-on-surface-variant space-y-2 font-body">
            <p>Источники и литература:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Руководство по диетологии собак FEDIAF, 2023.</li>
              <li>Исследование влияния дефицита инсоляции на собак в северных широтах (СПбГУВМ).</li>
            </ul>
          </footer>

          {/* Engagement Bar */}
          <div className="mt-12 flex items-center justify-between p-4 bg-white rounded-full shadow-sm">
            <div className="flex items-center gap-6 px-4">
              <button className="flex items-center gap-2 group">
                <span className="material-symbols-outlined text-primary group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                <span className="font-bold">1.2k Лапок</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
                <span className="text-sm">Поделиться</span>
              </button>
            </div>
            <button className="flex items-center gap-2 bg-surface-container-high px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              <span className="text-sm font-medium">В закладки</span>
            </button>
          </div>
        </article>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Author Card */}
          <div className="bg-white rounded-xl p-8 shadow-xl shadow-stone-900/5 sticky top-28">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <img alt="Doctor Elena Sokolova" className="w-full h-full object-cover rounded-full border-4 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClLDcdDk5Oou2XMJEjQKePzi90NDgkU9l1Xs2osyza9g_HlhSE0hG1XmN6-mGYj6npgesuRBIlSArK9pmBjc2jfZcD8xy9sX3UxSPf-vyGv67WMwhEgMJ88urC2EDEPm4haU7x9LJUKpr8Hv4KNai2scJC2xZZ8cZ4XWXbbQZS0dLuIscSGpQ3AG5_yyoVXtNdPwB4RmXPbDRs_xyqjLn6NLfNlQollaM8vJPNykvnQLhgffhPS-SaLQd-4iBIpGTPBSz1IHzo7cw" crossOrigin="anonymous" />
              <div className="absolute -bottom-1 -right-1 bg-tertiary text-white p-1 rounded-full flex items-center justify-center border-2 border-white">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1 font-headline">Д-р Елена Соколова</h3>
              <p className="text-tertiary text-sm font-medium mb-4">Ветеринар-диетолог, к.в.н.</p>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body">
                Эксперт по питанию малых пород с 15-летним стажем. Основатель школы здорового питания &quot;Балтийский Пес&quot;.
              </p>
              <button className="w-full bg-surface-container-low text-on-surface py-3 rounded-full font-bold hover:bg-tertiary hover:text-white transition-all font-headline">
                Задать вопрос
              </button>
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="bg-primary p-8 rounded-xl text-white">
            <h3 className="text-xl font-bold mb-4 font-headline">Советы ветеринара в почте</h3>
            <p className="text-white/80 text-sm mb-6 font-body">Раз в неделю присылаем проверенные советы по уходу и питанию.</p>
            <input className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 mb-4 placeholder-white/50 focus:ring-2 focus:ring-white outline-none text-white font-body" placeholder="Ваш email" type="email" />
            <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-full font-bold hover:scale-[1.02] transition-transform font-headline">
              Подписаться
            </button>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-8 mt-24">
        <h2 className="text-3xl font-extrabold mb-12 flex items-center gap-4 font-headline">
          Читайте также
          <div className="h-[2px] flex-grow bg-surface-container-high"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Related Item 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
              <img alt="Corgi walking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2U2t685b7VWDYGgVgJLBlfb6FrnP36cQwu7S2K3Ngg1oGDDfy_dV9uPXiN6Ml45HRMkpnBQZ-dwQOktq1JDd0dnDhoj9QASWaPANkubqLyJ6wVao8V9qYvOVLaQwWNGFFBmJi6k_x6jlvfuew4zi83cxP_lGScYbz5Lt2VowGmBtUHNfdqL7e-mNeo6p7ZDW8wW3Es0Ur8Sf13bAwln028keOhXUZ2SKcHTRCQ23cZioy-oMnUnie9F0NtI29B30bLUtNF-Bs3aY" crossOrigin="anonymous" />
            </div>
            <span className="text-tertiary text-xs font-bold uppercase tracking-wider mb-2 block">Здоровье</span>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors font-headline">Уход за суставами корги: зимний чеклист</h4>
          </div>
          {/* Related Item 2 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
              <img alt="Corgi at home" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyLhicBPS60PXGMAmosDYO1xbjZaGZfHw8jDrS4ctMr7jae3mRTb2lWMJno9ificNGnesmnJlXUlLMyKQKhngXKRrQkvp-yeW30dQYphpAY7XvxZYIVks_EIbzW0gggLgayNpzsoVnmy2hb9tp1cfaHbO8aNi6Zve6DDIF-AJBe-FMKILpuCBSkhnf6Y6Tqsltfk9Ezh68jKPPRqbiI2HLmZyiQN81VKTQyz5l36H6EDn1w0XgOPOimRbVKSDJmpRWolti70AiuRM" crossOrigin="anonymous" />
            </div>
            <span className="text-tertiary text-xs font-bold uppercase tracking-wider mb-2 block">Гигиена</span>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors font-headline">Сезонная аллергия в мегаполисе</h4>
          </div>
          {/* Related Item 3 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
              <img alt="Corgi playing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG35FbfxLuhVe4ItHcWfpQcDtn1UNp-Ja7UluLgQBrNH4IFq69zkZ5ke_tvw80tkGjE8TDQMLsHXrvn-58mBoJTXsTs3HnF-_lrdRz83YhFRgohS0AcM4xdLxHlimO3sJVjwT7dk4TKTfs1BzoEMqq55QAoYt_sMWLSkkbvsRq0iUUw_fcXVhQJd96chi53Ysp9GZlfavqLxXE-a6NmQ6jRbaX4p8aMD7udP1Gyn7jAuKDI4fUUZRWnBL8IrB3oe84GzBpextmrvg" crossOrigin="anonymous" />
            </div>
            <span className="text-tertiary text-xs font-bold uppercase tracking-wider mb-2 block">Активность</span>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors font-headline">Как не дать заскучать в дождливый день?</h4>
          </div>
        </div>
      </section>
    </main>
  );
}
