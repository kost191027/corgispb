import Link from "next/link";
import { redirect } from "next/navigation";
import { getCabinetData } from "@/actions/auth";
import { CabinetAddPetButton } from "@/components/cabinet/CabinetAddPetButton";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatPetSubtitle(breed: string, gender: string | null, birthDate: string | null) {
  const parts = [breed];

  if (gender) {
    parts.push(gender);
  }

  if (birthDate) {
    parts.push(birthDate);
  }

  return parts.join(" • ");
}

export default async function CabinetPage() {
  const { user, pets } = await getCabinetData();

  if (!user) {
    redirect("/login");
  }

  const hasPets = pets.length > 0;
  const userInitials = getInitials(user.name || user.email || "К");

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 font-body">
      <section className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-surface-container-low px-8 py-10 md:px-12 md:py-12">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary-container/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-tertiary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-3xl font-black text-primary shadow-xl ring-4 ring-white/80 md:h-36 md:w-36">
            {userInitials || "К"}
          </div>

          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-primary shadow-sm">
              <span className="material-symbols-outlined text-base">verified_user</span>
              Личный кабинет
            </div>
            <h1 className="mb-3 text-4xl font-black tracking-tight text-on-surface md:text-5xl">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-on-surface-variant">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                <span className="material-symbols-outlined text-base text-primary">mail</span>
                {user.email}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                <span className="material-symbols-outlined text-base text-primary">location_on</span>
                {user.city || "Санкт-Петербург"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 capitalize shadow-sm">
                <span className="material-symbols-outlined text-base text-primary">pets</span>
                {user.role || "owner"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <CabinetAddPetButton className="justify-center bg-gradient-to-r from-primary to-primary-container px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5" />
            <Link
              href="/pets"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-primary shadow-sm transition-colors hover:bg-primary/5"
            >
              <span className="material-symbols-outlined text-base">photo_library</span>
              Галерея клуба
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div
            id="my-pets"
            className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur sm:flex-row sm:items-end sm:justify-between scroll-mt-28"
          >
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-primary">
                Мои корги
              </p>
              <h2 className="text-3xl font-black tracking-tight text-on-surface">
                {hasPets ? `У вас ${pets.length} ${pets.length === 1 ? "хвостик" : "хвостика"}` : "Пока здесь пусто"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
                {hasPets
                  ? "Карточки подтягиваются из Appwrite и готовы к следующему этапу логики."
                  : "После добавления первого питомца здесь появятся карточки, быстрые действия и персональный календарь ухода."}
              </p>
            </div>
            <CabinetAddPetButton className="justify-center bg-surface-container-high px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/10" />
          </div>

          {hasPets ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {pets.map((pet) => (
                <article
                  key={pet.id}
                  className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden bg-surface-container-high">
                    {pet.photoUrl ? (
                      <img
                        alt={pet.name}
                        className="h-full w-full object-cover"
                        src={pet.photoUrl}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(144,77,0,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(42,103,110,0.14),transparent_38%)]">
                        <span className="material-symbols-outlined text-[72px] text-primary/70">pets</span>
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-primary shadow-sm">
                      {pet.isPublic ? "Публичный профиль" : "Приватный профиль"}
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-on-surface">
                        {pet.name}
                      </h3>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {formatPetSubtitle(pet.breed, pet.gender, pet.birthDate)}
                      </p>
                    </div>

                    <p className="min-h-12 text-sm leading-relaxed text-on-surface-variant">
                      {pet.description || "Описание пока не заполнено. На следующем шаге подключим редактирование профиля и расширенные данные питомца."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2.5rem] bg-surface-container-low p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary-container text-on-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-3xl">pets</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-black tracking-tight text-on-surface">
                    Добавьте первого хвостика в свой кабинет
                  </h3>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-on-surface-variant">
                    Мы сохраним базовую карточку питомца, а затем на следующих этапах подключим редактирование, реальные списки, фильтрацию и публикацию в галерее сообщества.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <CabinetAddPetButton className="justify-center bg-gradient-to-r from-primary to-primary-container px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary/20" />
                    <Link
                      href="/about/how-to-choose"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-tertiary shadow-sm transition-colors hover:bg-tertiary/5"
                    >
                      <span className="material-symbols-outlined text-base">menu_book</span>
                      Подготовиться
                    </Link>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-primary">
                    Что появится после заполнения
                  </p>
                  <div className="space-y-4">
                    {[
                      "Карточка корги с породой, полом, фото и описанием",
                      "Быстрый доступ к будущему календарю ухода и встреч",
                      "Основа для публикации в галерее и сервисах сообщества",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface-container-low px-4 py-4">
                        <span className="material-symbols-outlined mt-0.5 text-primary">check_circle</span>
                        <p className="text-sm font-medium leading-relaxed text-on-surface">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6 lg:col-span-4">
          <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-primary">
              Профиль владельца
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                  Имя
                </p>
                <p className="mt-2 text-lg font-bold text-on-surface">{user.name}</p>
              </div>
              <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                  Email
                </p>
                <p className="mt-2 break-all text-sm font-medium text-on-surface">{user.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                    Город
                  </p>
                  <p className="mt-2 text-sm font-bold text-on-surface">
                    {user.city || "Санкт-Петербург"}
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                    Роль
                  </p>
                  <p className="mt-2 text-sm font-bold capitalize text-on-surface">
                    {user.role || "owner"}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-surface-container-low px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
                  О себе
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {user.bio || "Профиль пока не заполнен. На следующем этапе можно будет редактировать анкету владельца и дополнительные поля."}
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] bg-tertiary p-6 text-white shadow-lg shadow-tertiary/20">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-white/70">
              Следующие шаги
            </p>
            <div className="space-y-4">
              {[
                "Добавьте первого корги в карточку кабинета",
                "Проверьте раздел SOS и готовность экстренной формы",
                "Изучите будущие встречи и карту прогулок",
              ].map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm ring-1 ring-black/5">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-primary">
              Быстрые переходы
            </p>
            <div className="space-y-3">
              <Link
                href="/community/forum"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-primary/5"
              >
                Форум сообщества
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </Link>
              <Link
                href="/meetings"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-primary/5"
              >
                Календарь встреч
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </Link>
              <Link
                href="/sos"
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 text-sm font-bold text-on-surface transition-colors hover:bg-primary/5"
              >
                SOS и потеряшки
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
