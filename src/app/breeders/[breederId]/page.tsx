export default function BreederPage() {
  return (
    <main className="pt-24">
      {/* Hero / Business Card Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="relative bg-surface-container-low rounded-xl overflow-hidden flex flex-col lg:flex-row items-center gap-12 p-8 lg:p-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img alt="Владелец питомника Royal Tails" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmqQFx80uuNDUB-emWhRQaIiHM-Kch1KUA85RvVOf4jZ0SaZ8_Trx-OKFekDT1iGHjTpcuNOg5gy9AD8UJcg7jZMvrWl0D0zZwg4SMPbrFnUT-q8nCPepo7uf-H4BTB4RxK-3s5KYLfx03EHzt77FWBabSdVZeFJVYPOlwvA1whGRcHtaSg9rbsXb54ke_SaCxlsEukHZxkxnxjoWeCZ2bRWTaQWNAYP4h0X9dYCQ-Iyp9Hh1qtCMDp6y0lC5_1bLryqKrg7uGnnY" crossOrigin="anonymous" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary-container p-6 rounded-lg shadow-xl hidden md:block">
              <p className="font-headline font-bold text-on-secondary-container leading-tight">С 2015 года<br/><span className="text-sm font-medium opacity-80">в мире корги</span></p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-block py-1 px-4 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold uppercase tracking-widest">Питомник</span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter font-headline">Royal Tails</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Мы посвятили последние 9 лет созданию идеальных компаньонов. Наша философия — это баланс между выставочным потенциалом и крепким здоровьем каждой собаки. В Royal Tails каждый щенок растет в любви и заботе.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="text-sm font-bold">РКФ</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span className="text-sm font-bold">FCI International</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Puppies Availability (Bento Grid Style) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface mb-2 font-headline">Наши щенки</h2>
            <p className="text-on-surface-variant font-body">Найдите своего нового лучшего друга прямо сейчас</p>
          </div>
          <div className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-headline font-bold text-sm">
            Весна 2024: Открыта бронь на новый помет
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Status Available */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Puppy Card 1 */}
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <img alt="Щенок Корги" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0wFYsB_5VlelgjxAoD9bUlS3AcGNTRRJwzekQ6qwVyZXV3PTQ9ZGhOswTYeCSlh_iO1lzRoSlWLzbT4dciXkYGQb5E55uSJfXOSNOe7aezlDTVs95ltowswsh9kBmsS6er-RWRDKLVE_-lZFEBRho1VzXAcBwt6vEXRsZpDz30TaLKqD6KiRPgT64bqiZcqg6mgMyMpOlzmjcX5tG39hGVV8NoP1qegv9jmgLZiSDKf68bxdpqIxMzacr57lWuMmUqX_B0dv-Vv0" crossOrigin="anonymous" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">В наличии</div>
              </div>
              <h3 className="text-xl font-bold mb-1 font-headline">Мартин (Royal Tails Gold)</h3>
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-1 rounded-full">Кобель</span>
                <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-1 rounded-full">Рыже-белый</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-extrabold text-primary">85 000 ₽</span>
                <button className="bg-primary hover:bg-primary-container text-white p-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Puppy Card 2 */}
            <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <img alt="Щенок Корги" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5ccr-OYKuGf21vVCfc3uplhRGtjJr5J0e_pU4cB2oqYAap_8c8vVLgOqPafr5pCYklzwzaCg2STn9CmCNeog2EbImJcbpo478Gd2KAA3B43uhqQQtlmDOLz_2kC8RFm3_B0w5CfO5LHP2cUvoP-KM_Ufp9-mIqaMX-os90SiXvv9Bat9T5J0hToIKk7_bzdq3yyWmnN0u3I6lLIazmDg4A_F9M9fF4CxM79dOi8FvXMYIFBSS2WM4glTfkyyVcn3PZNtI9B_OFSE" crossOrigin="anonymous" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">В наличии</div>
              </div>
              <h3 className="text-xl font-bold mb-1 font-headline">Белла (Royal Tails Star)</h3>
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-1 rounded-full">Сука</span>
                <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-1 rounded-full">Триколор</span>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-extrabold text-primary">95 000 ₽</span>
                <button className="bg-primary hover:bg-primary-container text-white p-2 rounded-full transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          {/* Status Expected */}
          <div className="md:col-span-4 bg-tertiary text-white rounded-xl p-8 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl mb-4">calendar_month</span>
              <h3 className="text-2xl font-bold mb-4 font-headline">Ожидаемые пометы</h3>
              <p className="opacity-80 mb-6 font-body">Мы планируем два помета весной 2024 года. Лист ожидания уже открыт для ответственных владельцев.</p>
              <ul className="space-y-4 font-body">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="font-medium">Март 2024 — Пемброк</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="font-medium">Апрель 2024 — Кардиган</span>
                </li>
              </ul>
            </div>
            <button className="mt-8 w-full py-4 bg-white text-tertiary font-bold rounded-full hover:bg-tertiary-fixed transition-colors font-headline">
              Записаться в лист
            </button>
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="bg-surface-container-high py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-on-surface mb-4 font-headline">Гордость питомника</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-body">Наши производители — титулованные чемпионы с безупречными генетическими тестами.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Sire Profile */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-xl">
                <img alt="Отец" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0nnqeLORrruKciwTCkgEvTWaewYtcQCJHnuBIvElmBmd8tWUv8OmYOAh_0gds1Jb9BJB23zRU2a1i741OXPuqLCkGzwiI7u8Mh8mfw-cvVeqNceLm9XaqoNR-P-z-pmKilU1RSRBpscSmmcJ6-kp0rwI_MPmHuqdtibfkblOKGa2ZHcQoNo530tD8yz6Vfj21Jf40UjHgKZh9eOB1l9Bwd9sWGrHI5R7qEu5lD3MobAbFF69gLNvQ_gH_foAYRldpnOdJMwheEyM" crossOrigin="anonymous" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold font-headline">Арчибальд Король Гор</h3>
                <div className="text-primary font-bold">Гранд Чемпион России, Чемпион НКП</div>
                <p className="text-sm text-on-surface-variant italic font-body">Мужественный, уравновешенный кобель с отличным костяком и богатой шерстью.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">vWD1: clear</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">DM: clear</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">Eyes: healthy</span>
                </div>
              </div>
            </div>
            {/* Dam Profile */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-xl">
                <img alt="Мать" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqejZwVsuuSFTLxOfL742mMpQD3QVqSRU8NgVaAGyedlu40OUOo89vMFCcz9ixaZZf4clqkygNpz08sO6l9N642gVqzy0f-rHXazi0ctPzDV22PM5T2aWbP3RAFJCqieeF_ftF4UIWPwOqk7XI-fNPNzF4aM6OcqaGzNv3MpaSY7vQy87Iwv8Yf4142avDliNE2LsEDyS-F2Wjq7UTMiiSrfwSNjYDQghDGICLgatL38yqYaxrzY44d0H2h2FTmMyltIQwpjBNGqQ" crossOrigin="anonymous" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold font-headline">Миледи Снежное Облако</h3>
                <div className="text-primary font-bold">Интерчемпион, Чемпион 5 стран</div>
                <p className="text-sm text-on-surface-variant italic font-body">Элегантная сука с прекрасными движениями и очень ласковым характером.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">vWD1: carrier</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">DM: clear</span>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30">Fluffy: negative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Conditions */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-surface-container rounded-xl overflow-hidden h-[400px] relative shadow-lg">
              <div className="absolute inset-0 bg-zinc-200">
                <img alt="Карта" className="w-full h-full object-cover opacity-50 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTLkKJTqVhY_ORBTC6tKOdnrqWTnJFLAF8IobAepQGYebslS07X3mx0wC0V5Pxc53b2e9mIr9h_96hzV3yGQHVuCee_iwKHYiXJ8WDtFTr8jJaFzXbZ14xOsj3PXJ4lMvhbkNi9ylg1rMW0QSUySzryf9pXdrsuiGh9GAkWlz2obhVS-PemRgHw1NKN9VjspvsQv6dBp0z-j37UB-_E9JDmxBjaS-AzVZlMUx81dmEgOz0XyT-_pmsu2KbfBfZuIjAZtUTUy86Tz0" crossOrigin="anonymous" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg">
                <p className="text-sm font-bold">Санкт-Петербург, Приморский район</p>
                <p className="text-xs opacity-70">Лисий Нос, ул. Лесная</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl font-extrabold font-headline">Условия жизни</h2>
            <div className="space-y-6 font-body">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">home</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg font-headline">Загородное содержание</h4>
                  <p className="text-on-surface-variant">Просторный дом с большой огороженной территорией для безопасных прогулок и игр.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">family_history</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg font-headline">Домашнее воспитание</h4>
                  <p className="text-on-surface-variant">Щенки живут вместе с нами, что гарантирует отличную социализацию и привыкание к быту.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">medical_services</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg font-headline">Постоянный ветконтроль</h4>
                  <p className="text-on-surface-variant">Регулярные осмотры ведущими специалистами города и сбалансированное питание премиум-класса.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-extrabold text-center mb-16 font-headline">Счастливые владельцы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-outline-variant/10 flex flex-col">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface-variant mb-6 flex-grow italic font-body">&quot;Взяли щенка в 2021 году. Мартин стал душой нашей семьи. Очень благодарны за поддержку и советы по воспитанию!&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container"></div>
              <div>
                <p className="font-bold text-sm">Елена Волкова</p>
                <p className="text-xs opacity-60">владелица Мартина</p>
              </div>
            </div>
          </div>
          {/* Review 2 */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-outline-variant/10 flex flex-col">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface-variant mb-6 flex-grow italic font-body">&quot;Самый профессиональный подход из всех, что мы видели. Собаки в прекрасной форме, чистые и социализированные.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container"></div>
              <div>
                <p className="font-bold text-sm">Дмитрий С.</p>
                <p className="text-xs opacity-60">владелец Грозы</p>
              </div>
            </div>
          </div>
          {/* Review 3 */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-outline-variant/10 flex flex-col">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface-variant mb-6 flex-grow italic font-body">&quot;Royal Tails — это любовь. Наша девочка здоровая, активная и очень умная. Спасибо за наше рыжее счастье!&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container"></div>
              <div>
                <p className="font-bold text-sm">Анна и Игорь</p>
                <p className="text-xs opacity-60">владельцы Буси</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Contacts */}
      <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <div className="bg-primary rounded-xl p-12 text-white space-y-8 shadow-2xl">
          <h2 className="text-4xl font-extrabold font-headline">Готовы к новому другу?</h2>
          <p className="text-xl opacity-90 font-body">Свяжитесь с нами любым удобным способом для консультации или записи на просмотр.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a className="bg-white text-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors font-headline" href="#">
              <span className="material-symbols-outlined">chat</span>
              Написать в WhatsApp
            </a>
            <a className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity font-headline" href="#">
              <span className="material-symbols-outlined">call</span>
              Позвонить
            </a>
          </div>
          <div className="flex justify-center gap-6 pt-4">
            <a className="hover:scale-110 transition-transform" href="#">
              <span className="material-symbols-outlined text-3xl">alternate_email</span>
            </a>
            <a className="hover:scale-110 transition-transform font-bold text-lg" href="#">VK</a>
            <a className="hover:scale-110 transition-transform font-bold text-lg" href="#">TG</a>
          </div>
        </div>
      </section>
    </main>
  );
}
