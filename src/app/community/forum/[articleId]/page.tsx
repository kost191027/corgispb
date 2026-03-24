"use client";

import React from "react";

export default function ForumArticlePage() {
  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm font-label text-on-surface-variant/70">
        <a className="hover:text-primary transition-colors" href="/">Главная</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <a className="hover:text-primary transition-colors" href="/community">Форум</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface-variant font-semibold">Питание</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Article Content */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-[1.15] tracking-tight font-headline">
              Натуралка или сушка: чем вы кормите своего корги в Петербурге?
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <img alt="Author" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPz_wbHeLUfEqYOBoCRqPSps1poXt90A9ITUQiYXlhE5IwbxRlumKpCa2bdM-wQ8fHIGEF60u7l3F6YfrThABfqIZ8nQkAbmGUVhFpKZDWLwRSfGrPJCiD_jsvv_ruSx36DLfOzQpnGlLPoqdugXCtlrjX3j1OCbMianiOWcCiUXTBUBhGGRrLd-ZRHRUQzkqqhdaTuj_BNQL1oIrJvWmKeATDTIllNzohfpymTwnhYEC38YAXLWGK-MS5BZvzs930saSgWxFkA1w" crossOrigin="anonymous" />
                <div>
                  <p className="font-bold text-on-surface leading-tight">@spb_corgi_mama</p>
                  <p className="text-xs text-on-surface-variant/70">2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest text-primary font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Питание
              </div>
            </div>
          </section>

          {/* Article Body */}
          <article className="prose prose-zinc max-w-none space-y-8 text-on-surface-variant leading-relaxed text-lg font-body">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
              Жизнь в самом сердце Санкт-Петербурга накладывает свой отпечаток на питание наших корги. С нашим ветреным балтийским климатом поддержание энергии и здоровья этих коротколапых исследователей — приоритет для каждого владельца в нашем сообществе.
            </p>
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-sm">
              <img alt="Happy Pembroke Welsh Corgi sitting in a park" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsngSCtpwROMpGRERQwLNH0vNWEx21iENNhKDOWAujbzosVrKLQ1evXOmjG4v8B-oHTexiBkecDhlmr397vsmm126ma6-2aQzUctQEFPXk1r8pbW0GanzaEIoMVolbnNsa0O1Da0A6JibyhfB3Ph8NMkfL11KkTLtxOlwNxHVTreWbWtSb3MsovRq8JuENgigY5ca8dpf8-0O73w3kQj_YPylEwPKPns9NOcPufcECGSOtHUW0tfZ4z8h9piP2FsOTPOOl_33Ra1w" crossOrigin="anonymous" />
              <div className="absolute bottom-4 left-4 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">Местный фаворит: рынки у Сенной площади</div>
            </div>
            <h2 className="text-2xl font-bold text-on-surface font-headline">Выбираем местное: путь через рынок</h2>
            <p>
              Многие участники нашего клуба часто посещают <strong>Кузнечный рынок</strong> в поисках свежей индейки и сердца — это важнейшие источники нежирного белка для корги, склонных к лишнему весу. При выборе натурального кормления (BARF или домашнее приготовление) качество продуктов решает всё.
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span><strong>Свежесть:</strong> На рынках Петербурга легче отследить происхождение мяса, чем в сетевых супермаркетах.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span><strong>Сезонность:</strong> Ищите тыкву и кабачки осенью для отличного пищеварения.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span><strong>Экономия:</strong> Оптовые закупки у фермеров могут выйти на 20% дешевле премиального корма.</span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-4">
              <img alt="Organic vegetables in a wooden crate" className="rounded-xl aspect-square object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTJ-Mx2owBZ9713qnEf35NO7hYG-FS9hfapXSKI6Irf3qKEBQoKMp2wegUj9ONWM1-DWBXt2v61oFJWB4nNgs2ylyFLU8i06eH_xckTzq7bwf-nuAgPrAdkpLPkQhL_hmNwp5p7qJ0mTyD7zsTZUVNSVCrYRG2wh3Kx2HG8AGThligrTI9VzHLi5_hYSygP3UmWj7gIclujxgQB6eIz83ofZdT3l4rsfoFWMlrn0UsQ4R77jP8MKG07-VOmWUQMdJixqWU5n6b-Eo" crossOrigin="anonymous" />
              <img alt="Corgi looking expectantly at a food bowl" className="rounded-xl aspect-square object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ62ZPLFoFdOhBlpeWVxxcHXzIvjxFD7NopSSGTvwRAH89qTep-SYnWFsSpym5vUZiaWOMxz3gfj77_hydFzuqvT2mUYxdYW0h0CfRXe-i9XNvQSv-J1t7f4xL4_JVuqEKmg_N3xIHen3cZkTi-_vYvuIaZ1zrutkcMmZRG2eZ_qRw_22KNsXw1SZdzkN7ow9Jkj1f7tSY0uNUWRoyxu8g4R3tiYM1nX8li7NZhZB8RGkIbX8PbOpPFBoW5cb4cuh-TGlAboyHDCo" crossOrigin="anonymous" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface font-headline">Мир премиальных кормов</h2>
            <p>
              Для тех, кто ведет активный городской образ жизни, специализированные магазины города предлагают широкий выбор европейских и отечественных беззерновых линеек. Бренды вроде <i>Grandorf</i> или <i>Acana</i> остаются лидерами, но многие переходят на крафтовые российские холистики.
            </p>
          </article>

          {/* Interaction Bar */}
          <div className="flex items-center gap-4 py-6 border-y border-outline-variant/20">
            <button className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container/10 text-primary font-bold transition-all hover:bg-primary-container/20 active:scale-95">
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">pets</span>
              <span>124 Лапки</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-surface-container-high text-on-surface-variant font-medium transition-all">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span>42 Комментария</span>
            </button>
            <div className="flex-grow"></div>
            <button className="p-2.5 rounded-full hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-2.5 rounded-full hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>

          {/* Comments Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-on-surface font-headline">Обсуждение (42)</h3>
              <div className="text-sm text-on-surface-variant">Сортировать по: <span className="font-bold text-primary cursor-pointer">Новые</span></div>
            </div>
            {/* Comment Input */}
            <div className="flex gap-4 p-6 rounded-2xl bg-surface-container-low">
              <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFOB4eXRThkENa6qMVBTVQd6NyUdSFIx4ssaHPT29UmgZGCRnUOaoWkrC0FjMHshHLB6q2gGKzYm_mmMCBgI5RieAMyQhoT0avQiNTRw_WrTy6cmnt0v4BtXvum7nMjN2lb3kVInWU4PxI93ueFjxL_jCOQUvTU5ugk2eTs1gvjd3I-TEi0nOJs_N_6Mxi9dwV_l73oAcqDrue6_6ho6cKm94VCHVz2ijp1suKM-Y0of6KkomSIxcblRIOZPadMNaWLSdbUZNdyc" crossOrigin="anonymous" />
              <div className="flex-grow space-y-4">
                <textarea className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 text-on-surface resize-none h-24 placeholder:text-on-surface-variant/40 font-body" placeholder="Поделитесь любимыми лакомствами вашего корги..."></textarea>
                <div className="flex justify-end">
                  <button className="px-8 py-2.5 rounded-full bg-primary-container text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                    Отправить
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Threads */}
            <div className="space-y-8">
              {/* Expert Comment */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img alt="Vet" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeApilONxmE9MtwNqjGcEL1E6ApwCu33AMP8D-E2jkxXASjaBNOp7Zu40JzA1JGypyjT_PhM752Bi0eRmoN7meq1K0w2voWlij6m64rw8XxnM7Qz5wKJPxI7aqSpGdjAWb3nb5Lt1oUvfSqyVz72PM2TfkDAQD7nj2mOuui8y8_4TVvblCeQmSLWiuzgC_XSCuDMv9IKNRKyMEE1BATc2h1oaGNyRVVk2a3VtTZoXzQnou49y9joFmE0mDj1o_zegOPBijllXR1Bw" crossOrigin="anonymous" />
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface">Д-р Барков</span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        Ветеринар
                      </span>
                      <span className="text-xs text-on-surface-variant/50">1 час назад</span>
                    </div>
                    <p className="text-on-surface-variant font-body">Отличный обзор! Для корги в Петербурге я особенно рекомендую добавлять немного рыбьего жира в зимние месяцы. Нехватка солнца влияет на состояние шерсти, а Омега-3 творит чудеса в балтийские холода.</p>
                    <div className="flex items-center gap-4 pt-1">
                      <button className="flex items-center gap-1 text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-[18px]">pets</span> 28
                      </button>
                      <button className="text-xs font-bold text-on-surface-variant/60 hover:text-primary transition-colors">Ответить</button>
                    </div>
                  </div>
                </div>
                {/* Nested Comment */}
                <div className="ml-14 pl-6 border-l-2 border-surface-container-highest space-y-4">
                  <div className="flex gap-3">
                    <img alt="User" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOQJo0yxNzrCPFjfCbPXfXcD_S-wvCpPFHZoR0cFs7eDAjCoaZn9e-YeAmXBSyzzWB3XB9HSeyTmCpHC8DpJmqLMmyPVK9A--ZEluMT6_z5g6bhBTBILHfxTEGfsuliPQPNBug7mU-CZcY-qXVemRKjtH4OnGLP_LAc1XObuPRO3w3BJWutxY-czRPTG1GBHggbUHt_KlhwuFpLU16sEmuDRe3qwJ7ISo_FZMxoZuIj2jx2-Bxjrk80wY7QUqwBZK7hPpmRojEaqw" crossOrigin="anonymous" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">Lana_Corgi_SPb</span>
                        <span className="text-[10px] text-on-surface-variant/50">45 мин назад</span>
                      </div>
                      <p className="text-sm text-on-surface-variant font-body">А бренд масла имеет значение? Видела несколько видов в зоомагазине на Невском.</p>
                      <button className="text-[10px] font-bold text-primary mt-1">
                        <span className="material-symbols-outlined text-[14px]">pets</span> 4
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular Comment */}
              <div className="flex gap-4">
                <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAgZM91daDPDyZZxcVTvCuq1lJs6ZCtqu97n86PcFznVp0iJry2eRrckyLIeQn_WiqKE78MQfHy8OlkJxe4Dtqnpptk6WzkVNhH71hH__v_dHcaAg5CGLv-rHuShJ2GY5bqA25GIJzT1u8gaavTo6W2hrw4O66WIFbo_mQVtxF0kzc9EJkAL5mslS_LCSjvifSOBszaOpPIpo-aUWGcJ_5nvPM9DphERxQXMzgvXSAsiIIucYW2s3ZJUkFRh7Ja6R9ANPeb3PSoUw" crossOrigin="anonymous" />
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">Peter_Bread_Lover</span>
                    <span className="text-xs text-on-surface-variant/50">30 мин назад</span>
                  </div>
                  <p className="text-on-surface-variant font-body">Мы перешли на местного поставщика натуралки у Приморской, и энергия нашего корги просто зашкаливает. Однозначно стоит потраченного на готовку времени!</p>
                  <div className="flex items-center gap-4 pt-1">
                    <button className="flex items-center gap-1 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-[18px]">pets</span> 12
                    </button>
                    <button className="text-xs font-bold text-on-surface-variant/60 hover:text-primary transition-colors">Ответить</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* About Author Card */}
          <div className="bg-surface-container-low rounded-3xl p-8 space-y-6">
            <h4 className="text-lg font-bold text-on-surface font-headline">Об авторе</h4>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <img alt="Author profile" className="w-24 h-24 rounded-full border-4 border-primary-container/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdq0bq_dj8kQKD1gKZV-tN-aP83NBqxHvBCfhtRMQov5XX7m_ogJRIU-hXyT3lAF1HQLzg3xuog-pqU6iO84hAt-b-fxEMSUgueZtD6BVNhYpNgiG2-MSu4SZDri0K7ywbVjGBeJVgQ0Q3ghRa8HehUlmxQ5gVVuGwljV1bX_iZKycTP0WgnLTGmjUVTpgVB0AblqRYggPJXdDuMNNJyVEsTDDDVYJlX0Z2EU0bj3NJYwxCZtzgCQaXh8sAuySz1-4tRzRVGbdw54" crossOrigin="anonymous" />
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-secondary-container rounded-full flex items-center justify-center border-2 border-surface-container-low">
                  <span className="material-symbols-outlined text-[14px] text-on-secondary-container">star</span>
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-on-surface font-headline">Елена Соколова</p>
                <p className="text-sm text-on-surface-variant">Старожил клуба и любитель корги</p>
              </div>
            </div>
            <p className="text-sm text-center text-on-surface-variant leading-relaxed font-body">
              Мама двух пемброков, Оливера и Луны. Исследую лучшие дог-френдли места в СПб с 2018 года.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform" href="#">
                <span className="material-symbols-outlined">link</span>
              </a>
              <a className="px-6 py-2 rounded-full bg-primary-container text-white font-bold text-sm shadow-md hover:shadow-lg transition-all" href="#">
                Подписаться
              </a>
            </div>
          </div>

          {/* Related Topics */}
          <div className="bg-surface-container-low rounded-3xl p-8 space-y-6">
            <h4 className="text-lg font-bold text-on-surface font-headline">Похожие темы</h4>
            <ul className="space-y-4">
              <li>
                <a className="group block space-y-1" href="#">
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">Лучшие ветклиники для корги в Василеостровском районе</p>
                  <p className="text-[10px] text-on-surface-variant/60 uppercase font-black tracking-widest">12 Комментариев • 2 дня назад</p>
                </a>
              </li>
              <li>
                <a className="group block space-y-1" href="#">
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">Как не набрать лишний вес в балтийскую зиму</p>
                  <p className="text-[10px] text-on-surface-variant/60 uppercase font-black tracking-widest">45 Комментариев • 1 неделя назад</p>
                </a>
              </li>
              <li>
                <a className="group block space-y-1" href="#">
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">Рецепты домашних лакомств с сезонной тыквой</p>
                  <p className="text-[10px] text-on-surface-variant/60 uppercase font-black tracking-widest">8 Комментариев • 3 часа назад</p>
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="bg-surface-container-low rounded-3xl p-8 space-y-6">
            <h4 className="text-lg font-bold text-on-surface font-headline">Популярные теги</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#пемброк</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#здоровье</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#дрессировка</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#новостиСПб</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#балтийская-жизнь</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">#кардиган</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
