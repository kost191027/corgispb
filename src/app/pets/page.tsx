import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наши Любимцы — Корги СПб",
  description: "Познакомьтесь с главными жителями нашего сообщества. Здесь собраны все корги Петербурга.",
};

// Извлекаем моковые данные из concept
const TOP_PETS = [
  {
    id: "bella",
    name: "Белла",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIpFTZnKNW4nRu2JbwFHTGJSdHHu4Mx2zvDXNTmElhakyTGsZbs1sEmdJt-QgiClpxPQYIqJCpozo7XDlrUZ63-CMfQwfRTYjcWNwdUkvzT8ndCCcyKCRXqRmA5UrBzG4IUIcJncutLs5cdvTINYiiH2EDV7Hw0u_HR0EgK2UFiK2L_nCVika0TwNUoEYlxfM9G2e-JOTNOt69yUsrL0sUU4e04KH-AlDHwCFZ4BYxdslZslfQy1TzOp2BqBrvMjnMlotg0Lm60Yg",
    likes: 412,
    rank: 1,
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 border-primary/20",
    rankBg: "bg-primary",
  },
  {
    id: "oliver",
    name: "Оливер",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRvCAHknuyyDRVZiqdqZwbbQQMkSVi4YEgkCcqfFYrdh3G1vImnltJkmpbDsKXhG71vNFm5nLtusaCxL6wSToB9vbKXBu1Nlg7Y977lRBAMbXh8AESOhNk29sdv8DTQuniJusnVgy_n_dSCLW91hkg8MexsuO4DS9s7Fk4QK--UbPb828eohuIRzvc7dJK3PJSwaIKzz4mkimNKcWiQf8ijt7Ka1l4ISXX-nxptzwdzdtYYNUTuQfbuqkuSeI-KlEeDSevA0oJiiM",
    likes: 328,
    rank: 2,
    bgColor: "bg-surface-container-lowest border-outline-variant/30",
    rankBg: "bg-stone-400",
  },
  {
    id: "luna",
    name: "Луна",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCszIqEnpWfF0NfVnTJqwukx0CvczKc9UkShRVaEemv6_3Xz74RDgTCq7t6RaUdBc0Gt-MQ1uJ2GXdd-N59RgxuzjVbNkZpRnffsdDYAYU36ffAi0IBah-CelUuQKRb69Bxa5tN24bY3kJ1pvUXoelDAJNCKsUAMmVRibcdQFwWnZfgXuiyiTv6tLV8-ALcyTkULtygsflAfg-c58hWhI_CfYSYRCYe_K1kcSsvDs_iBXYVM5TABd_9X-b-KDUyVUHETfXgS38Mfkk",
    likes: 295,
    rank: 3,
    bgColor: "bg-surface-container-lowest border-outline-variant/30",
    rankBg: "bg-orange-800/40",
  }
];

const GRID_PETS = [
  {
    id: "luna",
    name: "Луна",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCszIqEnpWfF0NfVnTJqwukx0CvczKc9UkShRVaEemv6_3Xz74RDgTCq7t6RaUdBc0Gt-MQ1uJ2GXdd-N59RgxuzjVbNkZpRnffsdDYAYU36ffAi0IBah-CelUuQKRb69Bxa5tN24bY3kJ1pvUXoelDAJNCKsUAMmVRibcdQFwWnZfgXuiyiTv6tLV8-ALcyTkULtygsflAfg-c58hWhI_CfYSYRCYe_K1kcSsvDs_iBXYVM5TABd_9X-b-KDUyVUHETfXgS38Mfkk",
    likes: 295,
    location: "Василеостровский",
    tags: ["Любит яблоки", "Мастер сна"]
  },
  {
    id: "archi",
    name: "Арчи",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYP9vZHVBqURx3I0cdSFXNvYR7KiHdVqasMpW2xzXgeuVDXwODo9z7bTa3uG0XZB-RSsqQtnxxv5nW2sS0x7c7g8A0aWyHaBRyEcrJaDsJpSpOaxxLSRUT6MLostcelxVEomeRd_zNTFmghaG_RhTNkwhJwbWcWg8JyM2JVkO7Qis-_fpgpntNTo8aI3cIo8rrvgVWobFexy_wxQCKVqxd2uJ-YKs3jdJhqIjjoF1HByeQ2ECI9AmSWbExbRP3BVDAZQtmMr3l-Zk",
    likes: 142,
    location: "Приморский",
    tags: ["Бегун", "Ловец фрисби"]
  },
  {
    id: "bella",
    name: "Белла",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIpFTZnKNW4nRu2JbwFHTGJSdHHu4Mx2zvDXNTmElhakyTGsZbs1sEmdJt-QgiClpxPQYIqJCpozo7XDlrUZ63-CMfQwfRTYjcWNwdUkvzT8ndCCcyKCRXqRmA5UrBzG4IUIcJncutLs5cdvTINYiiH2EDV7Hw0u_HR0EgK2UFiK2L_nCVika0TwNUoEYlxfM9G2e-JOTNOt69yUsrL0sUU4e04KH-AlDHwCFZ4BYxdslZslfQy1TzOp2BqBrvMjnMlotg0Lm60Yg",
    likes: 412,
    location: "Петроградский",
    tags: ["Модница", "Душа компании"]
  }
];

export default function PetsGalleryPage() {
  return (
    <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-xl bg-surface-container-low p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="z-10 max-w-xl">
          <h1 className="font-display font-black text-5xl lg:text-7xl text-on-surface leading-tight mb-6 tracking-tighter">
            Наши <span className="text-primary italic">любимцы</span>
          </h1>
          <p className="text-lg text-on-surface-variant mb-10 font-medium">
            Познакомьтесь с главными жителями нашего сообщества. Здесь собраны все корги Петербурга: от пушистых жителей Приморского до деловых обитателей Центрального района.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            Добавить хвостика
          </button>
        </div>
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-xl shadow-2xl">
          <img alt="Группа счастливых корги" className="w-full h-full object-cover" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV_is0xWpkrpo---l0W9hGbB4sHNyYf9nogQVgZEf2iGGmsG3TBweHT9fmRHv1QaS4Ew9rKJDvjdw38NCegOq8VWLn4oadDcUU9s-_FMJya_tZc_PjQ3mmOczj9nZmiatvLDFPkslAGjFXcjP9gZypMk_XE8iZYVMZyM9AdeThJa2ynb3p8QSbzKNnhUL9iiEcNT7v79W6YuCOyPeZVeIgVMaxP0TToV8jOyAMjHQToIueJL22a_dSlonCo4LXyKOjRWaiIilRP_M" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </section>

      {/* Top 3 Favorites (Leaderboard) */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-[2px] w-12 bg-primary"></span>
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-widest text-primary">Топ любимцев</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_PETS.map((pet) => (
            <div key={`rank-${pet.id}`} className={`${pet.bgColor} p-6 rounded-[2rem] border-2 flex items-center gap-6 shadow-xl relative overflow-hidden group`}>
              {pet.rank === 1 && (
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
              )}
              <div className="relative">
                <img alt={pet.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" crossOrigin="anonymous" src={pet.image} />
                <div className={`absolute -top-2 -right-2 ${pet.rankBg} text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm`}>
                  {pet.rank}
                </div>
              </div>
              <div>
                <h3 className="font-display font-black text-xl">{pet.name}</h3>
                <div className={`flex items-center gap-1.5 font-bold ${pet.rank === 1 ? 'text-primary' : 'text-stone-500'}`}>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  <span>{pet.likes} лапок</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Spotlight */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-[2px] w-12 bg-primary"></span>
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-widest text-primary">Герой недели</h2>
        </div>
        <Link href="/pets/oliver" scroll={false} className="block group">
          <div className="grid md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient border border-outline-variant/15">
            <div className="h-[400px] overflow-hidden">
              <img alt="Корги Оливер" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" crossOrigin="anonymous" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRvCAHknuyyDRVZiqdqZwbbQQMkSVi4YEgkCcqfFYrdh3G1vImnltJkmpbDsKXhG71vNFm5nLtusaCxL6wSToB9vbKXBu1Nlg7Y977lRBAMbXh8AESOhNk29sdv8DTQuniJusnVgy_n_dSCLW91hkg8MexsuO4DS9s7Fk4QK--UbPb828eohuIRzvc7dJK3PJSwaIKzz4mkimNKcWiQf8ijt7Ka1l4ISXX-nxptzwdzdtYYNUTuQfbuqkuSeI-KlEeDSevA0oJiiM" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Выбор редакции</span>
              </div>
              <h3 className="font-display font-black text-4xl text-on-surface mb-4 italic tracking-tight">Оливер, 3 года</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8 italic">
                &quot;Оливер — настоящий петербургский эстет. Он не просто гуляет, он созерцает архитектуру Петроградки. Любит свежие круассаны (только крошки!) и знает все потайные дворики...&quot;
              </p>
              <div className="flex items-center gap-6">
                <button className="bg-primary text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all">Подробнее об Оливере</button>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  <span>328 лапок</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Filtering & Search */}
      <section className="mb-12 sticky top-20 z-40">
        <div className="bg-white/90 backdrop-blur-[20px] p-6 rounded-xl shadow-xl border border-outline-variant/10">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:w-1/3 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-surface-container-high rounded-full border-none focus:ring-2 focus:ring-primary/40 text-on-surface font-medium" placeholder="Искать по имени..." type="text" />
            </div>
            <div className="w-full lg:w-2/3 flex flex-wrap gap-3 items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-bold">Все</button>
                <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-colors">Пемброк</button>
                <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-colors">Кардиган</button>
              </div>
              <div className="h-6 w-[1px] bg-outline-variant/30 hidden sm:block"></div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button className="whitespace-nowrap px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase">Готов бегать</button>
                <button className="whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-500 text-xs font-bold uppercase">Спокойные прогулки</button>
                <button className="whitespace-nowrap px-4 py-2 rounded-full border border-stone-200 text-stone-500 text-xs font-bold uppercase">Игры с мячом</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GRID_PETS.map((pet) => (
          <Link key={`grid-${pet.id}`} href={`/pets/${pet.id}`} scroll={false} className="group">
            <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-ambient h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
              <div className="relative h-72 overflow-hidden flex-shrink-0">
                <img alt={`Корги ${pet.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" crossOrigin="anonymous" src={pet.image} />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <span className="text-xs font-bold text-on-surface">{pet.location}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display font-black text-2xl text-on-surface pr-2">{pet.name}</h4>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                    <span className="text-[10px] font-bold uppercase text-stone-400">{pet.likes} лапок</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {pet.tags.map(tag => (
                    <span key={tag} className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full py-4 rounded-full bg-secondary-container text-on-secondary-container font-black text-sm uppercase tracking-widest hover:bg-secondary-fixed-dim transition-colors">
                  Позвать гулять
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Load More */}
      <div className="mt-16 text-center">
        <button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold px-10 py-4 rounded-full transition-all duration-300">
          Загрузить еще хвостиков
        </button>
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </main>
  );
}
