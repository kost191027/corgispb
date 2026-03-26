"use client";

import { useDeferredValue, useMemo, useState } from "react";

type ForumTopic = {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  authorName: string;
  publishedAt: string;
  createdAt: string;
  previewText: string;
  likesCount: number;
  commentsCount: number;
  avatarUrl: string;
  tags: string[];
};

const TOPICS: ForumTopic[] = [
  {
    id: 1,
    title: "Натуралка или корм: чем кормите своего корги в СПб?",
    category: "Питание",
    categoryColor: "text-primary bg-primary/10",
    authorName: "@spb_corgi_mama",
    publishedAt: "2 часа назад",
    createdAt: "2026-03-26T08:00:00",
    previewText: "Интересно узнать, какие бренды сейчас проще всего достать в Петербурге и кто перешел на натуралку без проблем с ЖКТ.",
    likesCount: 128,
    commentsCount: 42,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhWlfBAfjfYaIyysANRImH71Jh5UJ1rYN4df7kfCx0NRif5AvvKMfTOhEF4ef1Q8qZBCNsgwmtX-1FULZw5R6NJQdRUdSVcj1Lxcafk4d9xmXEDPiYD7E2oGcRyIHyCl-2cEaKvo_xui-v1EcnInQIzrJf4F9Z2gf2DWuKl106Q2tFrjydWfPqB3BIZJHt6q-btqzSvWHwkt0XOFQNgqdfZEQYfASm1C-sETMvs2eJMpzkZ1UWvi1cZgFX4fgUNHfufTHf4uVfUX8",
    tags: ["#питание", "#сухойкорм"],
  },
  {
    id: 2,
    title: "Зубастые проблемы: посоветуйте стоматолога в Приморском районе",
    category: "Здоровье",
    categoryColor: "text-tertiary bg-tertiary/10",
    authorName: "@pavel_korgi",
    publishedAt: "5 часов назад",
    createdAt: "2026-03-26T05:00:00",
    previewText: "Нашли камень у Арчи, ищем проверенную клинику поближе к дому. Кто где делал чистку и под седацией ли?",
    likesCount: 34,
    commentsCount: 15,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDitVsExKT1cMkAD4vZzPFpTX9SufOlVtbgKaK84ua4sPrhQ_Ju14ySAYY1DmmXGQ_5TWWcUThhXzPQxFq41Mv4_kxOoYx9mRxR3ZwFq-mwtTpil7_wGRWprgMM5K8GmpRgRcdO0JtlPDktZIbxs-vRzBKX5VCUHU153BXfbpX4woiRGYMeLcPYTVPcNGabtAl7l3Zn8fM4W4vjj1EwN3yITmdVpDeiJzzTpt1SDoYzvqIEa_JFQaDBTIRzJaNyc3JgKzJtI4XDM5g",
    tags: ["#здоровье", "#ветеринар"],
  },
  {
    id: 3,
    title: "Как приучить корги к шуму города: опыт владельцев",
    category: "Поведение",
    categoryColor: "text-secondary bg-secondary/10",
    authorName: "@elena_and_lex",
    publishedAt: "Вчера",
    createdAt: "2026-03-25T18:30:00",
    previewText: "Переехали в центр, на Невском собака в стрессе. Как вы справлялись с адаптацией к трафику и толпам?",
    likesCount: 210,
    commentsCount: 89,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCssFH4jmu2Ev3_PhSeR6U-6lkfhZYFkKAhetc2X4z6NHgj9RSS4_Ro5WR9NaN81afuW_MxAxz3Hc2gXp8jo_G1VIU4YhLDG0uDOO5MdctkEOBIihcCjeXxmkOVfEhlgekVbGmbK1O0AsFaNqPBBAwjSsyLlK-0c2OjcFX_36KvltVmDcV7-xq1uWfuIe_qQda32B0LTLO6SxRElIlxpSQ9dkXh34MtfRAU8zPqYFr22rofJ4CxgIf9gbehmAjfNiYigxwp5HVphNA",
    tags: ["#поведение", "#адаптация"],
  },
  {
    id: 4,
    title: "Большой сбор корги в Таврическом саду в это воскресенье",
    category: "Мероприятия",
    categoryColor: "text-on-secondary-container bg-white/50",
    authorName: "@admin_spb",
    publishedAt: "2 дня назад",
    createdAt: "2026-03-24T15:00:00",
    previewText: "Встречаемся у памятника в 14:00. Будут вкусняшки, фотосессия и длинный марш по аллеям.",
    likesCount: 542,
    commentsCount: 156,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1YADawV4qawaYr2U37wS1Nx-CeHUj4Q8gOxVqP6HE-r0VdhLlhWLHneuybfnRxoeSOdKa9zDkAwdCev7W9CEzhQVKtw_cXsBVVxABGKaPqXaZ5_6Yk7uCpjvnuVzznkQfEHFSQMDA0QUGh9A61cQkjuW3BW2M6VaVa1rj7yDhZCWkh8Wr1nzAVpualUJXllBIlktDb1dyRibN7hvObu0rkllVmHSvZL-hCq-bue972Rd19SASRFYwxMnfvcx8Rtjg91vaMY1mP04",
    tags: ["#мероприятия", "#прогулки"],
  },
];

const CATEGORIES = ["Все темы", "Питание", "Здоровье", "Поведение", "Мероприятия"];
const CATEGORY_ICONS: Record<string, string> = {
  "Все темы": "forum",
  Питание: "restaurant",
  Здоровье: "medical_services",
  Поведение: "psychology",
  Мероприятия: "event",
};
const TRENDING_TAGS = ["#питание", "#здоровье", "#адаптация", "#мероприятия", "#ветеринар", "#новостиСПб"];

export function ForumPageClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все темы");
  const [sortBy, setSortBy] = useState<"new" | "popular">("new");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [likedTopicIds, setLikedTopicIds] = useState<number[]>([]);
  const [draftToastVisible, setDraftToastVisible] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const filteredTopics = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return TOPICS.filter((topic) => {
      const matchesQuery =
        query.length === 0 ||
        [topic.title, topic.previewText, topic.authorName, ...topic.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesCategory = selectedCategory === "Все темы" || topic.category === selectedCategory;
      const matchesTag = !selectedTag || topic.tags.includes(selectedTag);

      return matchesQuery && matchesCategory && matchesTag;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return b.likesCount + b.commentsCount - (a.likesCount + a.commentsCount);
      }

      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [deferredSearch, selectedCategory, selectedTag, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("Все темы");
    setSelectedTag(null);
    setSortBy("new");
  };

  const toggleLike = (topicId: number) => {
    setLikedTopicIds((current) =>
      current.includes(topicId) ? current.filter((id) => id !== topicId) : [...current, topicId],
    );
  };

  const notifyDraftAction = () => {
    setDraftToastVisible(true);
    window.setTimeout(() => setDraftToastVisible(false), 1800);
  };

  return (
    <main className="mx-auto max-w-7xl bg-background px-6 pb-12 pt-28">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-display text-4xl font-black tracking-tighter text-on-surface md:text-5xl">
            Форум владельцев корги
          </h1>
          <p className="max-w-2xl text-lg text-on-surface-variant">
            Фильтруйте обсуждения по теме, ищите по ключевым словам и быстро находите самые живые разговоры сообщества.
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-bold text-on-primary shadow-lg transition-all active:scale-95 hover:shadow-xl"
          onClick={notifyDraftAction}
          type="button"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Начать тему
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-xl bg-surface-container-low p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Категории
              </h3>
              {(selectedCategory !== "Все темы" || selectedTag || search) && (
                <button
                  className="text-xs font-bold text-primary transition-colors hover:text-primary-container"
                  onClick={clearFilters}
                  type="button"
                >
                  Сбросить
                </button>
              )}
            </div>
            <ul className="space-y-1">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <li key={category}>
                    <button
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                        isActive
                          ? "bg-surface-container-lowest font-semibold text-primary shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-xl">{CATEGORY_ICONS[category]}</span>
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="group relative h-64 cursor-pointer overflow-hidden rounded-xl border border-outline-variant/10 shadow-sm">
            <img
              alt="Happy corgi running in a green park in Saint Petersburg"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYze6kLJElordEG2-LyNrh2u1IBEL18qqe_IBgmqrYqgPI7kLEIlk10bxDfOyO9umiggyTVuwN0fO7rS9rHZhnDj62bHAPRDBMENy46ohjIyKM1SXzJogL2p9kg8wJHkRbSmy3lOOF9fLbV0glUQ2HgxRLEXR9b8586i-GtIZLebGMr9dI8Xd1nnjsH-HB6lOeKm_qn4FV9_eiy4xwwMyG_0LE-YdLByiI7FJB6d8lrviB5vm8RFeZc7vIh0XVNDoTVFxzO4MLG9E"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 to-transparent p-6">
              <span className="font-display text-lg font-bold leading-tight text-white transition-transform group-hover:-translate-y-1">
                Лучшие места для прогулок 2026
              </span>
            </div>
          </div>
        </aside>

        <section className="space-y-6 lg:col-span-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                className="w-full rounded-full bg-surface-container-high py-4 pl-12 pr-4 text-on-surface outline-none focus:ring-2 focus:ring-primary/40"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Поиск по обсуждениям"
                type="text"
                value={search}
              />
            </div>
            <div className="flex rounded-full bg-surface-container-low p-1">
              <button
                className={`rounded-full px-6 py-3 text-sm font-bold ${
                  sortBy === "new" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant"
                }`}
                onClick={() => setSortBy("new")}
                type="button"
              >
                Новые
              </button>
              <button
                className={`rounded-full px-6 py-3 text-sm font-bold ${
                  sortBy === "popular" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant"
                }`}
                onClick={() => setSortBy("popular")}
                type="button"
              >
                Популярные
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRENDING_TAGS.map((tag) => {
              const isActive = selectedTag === tag;

              return (
                <button
                  key={tag}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                  type="button"
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {filteredTopics.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-outline-variant/30 bg-surface-container-low px-8 py-14 text-center">
                <h2 className="mb-2 text-2xl font-black text-on-surface">Ничего не найдено</h2>
                <p className="mb-5 text-on-surface-variant">Попробуйте снять тег, выбрать другую категорию или очистить поиск.</p>
                <button
                  className="rounded-full bg-primary px-6 py-3 font-bold text-on-primary"
                  onClick={clearFilters}
                  type="button"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const isLiked = likedTopicIds.includes(topic.id);
                const likesCount = topic.likesCount + (isLiked ? 1 : 0);

                return (
                  <article
                    key={topic.id}
                    className="group cursor-pointer rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        alt="User Avatar"
                        className="h-12 w-12 flex-shrink-0 rounded-full bg-stone-100 object-cover shadow-sm"
                        crossOrigin="anonymous"
                        src={topic.avatarUrl}
                      />
                      <div className="flex-grow">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${topic.categoryColor}`}>
                            {topic.category}
                          </span>
                          <span className="text-xs font-semibold text-on-surface-variant">
                            {topic.authorName} • {topic.publishedAt}
                          </span>
                        </div>
                        <h2 className="mb-2 font-display text-xl font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                          {topic.title}
                        </h2>
                        <p className="mb-4 line-clamp-2 text-sm text-on-surface-variant">{topic.previewText}</p>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-bold text-on-surface-variant">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-on-surface-variant">
                          <div className="flex items-center gap-1.5 text-sm font-bold">
                            <span className="material-symbols-outlined text-lg opacity-70">chat_bubble</span>
                            {topic.commentsCount}
                          </div>
                          <button
                            className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                              isLiked ? "text-red-500" : "text-on-surface-variant hover:text-red-500"
                            }`}
                            onClick={() => toggleLike(topic.id)}
                            type="button"
                          >
                            <span
                              className="material-symbols-outlined text-lg"
                              style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              favorite
                            </span>
                            {likesCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-xl border border-outline-variant/10 bg-surface-container-high p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">newspaper</span>
              Важные новости
            </h3>
            <div className="space-y-4">
              <button className="block text-left group" type="button">
                <div className="mb-1 flex w-fit items-center gap-1 rounded-full bg-error/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-error">
                  <span className="material-symbols-outlined text-[10px]">warning</span>
                  Срочно
                </div>
                <h4 className="text-sm font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                  Осторожно, клещи в Ленобласти
                </h4>
                <p className="mt-1.5 text-[11px] text-on-surface-variant">Первые случаи в Выборгском районе. Проверьте защиту перед выездом.</p>
              </button>
              <hr className="border-outline-variant/20" />
              <button className="block text-left group" type="button">
                <div className="mb-1 flex w-fit items-center gap-1 rounded-full bg-tertiary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-tertiary">
                  <span className="material-symbols-outlined text-[10px]">location_on</span>
                  Локация
                </div>
                <h4 className="text-sm font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
                  Открылась новая площадка в Севкабеле
                </h4>
                <p className="mt-1.5 text-[11px] text-on-surface-variant">Dog-friendly зона с тренажерами теперь открыта ежедневно.</p>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-tertiary p-6 text-on-tertiary shadow-lg">
            <div className="relative z-10">
              <h3 className="mb-6 font-display text-xl font-black">Наше сообщество</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-3xl font-black tracking-tighter">1,420</div>
                  <div className="pt-1 text-[10px] font-bold uppercase tracking-wider opacity-80">Корги-родителей</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black tracking-tighter">5.6k</div>
                  <div className="pt-1 text-[10px] font-bold uppercase tracking-wider opacity-80">Обсуждений</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-20">
              <span className="material-symbols-outlined rotate-[-15deg] text-[120px]">pets</span>
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">tag</span>
              Популярные теги
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border border-outline-variant/20 bg-surface-container-lowest px-3 py-1.5 text-xs font-bold transition-all hover:border-primary hover:bg-primary hover:text-white"
                  onClick={() => setSelectedTag(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {draftToastVisible && (
        <div className="fixed bottom-6 right-6 z-[180] rounded-2xl bg-on-surface px-5 py-4 text-sm font-semibold text-surface shadow-xl">
          Черновик новой темы пока не подключен, но фильтры и интерактив уже работают.
        </div>
      )}
    </main>
  );
}
