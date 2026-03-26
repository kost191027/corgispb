import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicUserProfileById } from "@/actions/auth";
import { formatPetAge } from "@/lib/pets";
import { getPetsByUser } from "@/lib/server/pets";

function PublicAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={`Аватар ${name}`} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl" src={avatarUrl} />
    );
  }

  return (
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-primary">
      <span className="text-4xl md:text-5xl font-black font-headline">{name.trim().charAt(0).toUpperCase() || "К"}</span>
    </div>
  );
}

export default async function OwnerPublicProfilePage({ params }: { params: { id: string } }) {
  const profile = await getPublicUserProfileById(params.id);

  if (!profile) {
    notFound();
  }

  const pets = (await getPetsByUser(params.id)).filter((pet) => pet.isPublic);

  return (
    <main className="pt-28 pb-20 max-w-6xl mx-auto px-6">
      <section className="rounded-[2rem] bg-surface-container-low p-8 md:p-12 mb-10 flex flex-col md:flex-row gap-8 items-center">
        <PublicAvatar avatarUrl={profile.avatarUrl} name={profile.name} />
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">Публичный профиль</p>
          <h1 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tight mb-3">{profile.name}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-tertiary mb-4">
            {profile.city ? (
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-base">location_on</span>
                {profile.city}
              </span>
            ) : null}
            {profile.district ? (
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-base">pin_drop</span>
                {profile.district}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-base">pets</span>
              {pets.length} питомцев в профиле
            </span>
          </div>
          <p className="text-on-surface-variant max-w-2xl">
            {profile.bio || "Участник сообщества «Корги СПб». Здесь собраны его публичные питомцы и короткая информация для знакомства."}
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black font-headline text-on-surface">Хвостики профиля</h2>
            <p className="text-on-surface-variant mt-2">Только публичные карточки, которыми владелец решил поделиться.</p>
          </div>
          <Link className="text-primary font-bold hover:underline" href="/pets">
            Общая галерея
          </Link>
        </div>

        {pets.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <Link className="group" href={`/pets/${pet.id}`} key={pet.id} scroll={false}>
                <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-ambient h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
                  <div className="relative h-72 overflow-hidden flex-shrink-0 bg-surface-container-high">
                    {pet.mainPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={`Корги ${pet.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={pet.mainPhotoUrl} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-6xl">pets</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-display font-black text-2xl text-on-surface mb-2">{pet.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-4">
                      {formatPetAge(pet.age) ? `${formatPetAge(pet.age)} • ` : ""}
                      {pet.district || pet.breed}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {(pet.traits.length ? pet.traits : [pet.breed]).slice(0, 3).map((tag) => (
                        <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface-variant" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-surface-container-low p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white text-primary flex items-center justify-center shadow-sm mb-4">
              <span className="material-symbols-outlined text-3xl">pets</span>
            </div>
            <h3 className="font-display font-black text-2xl mb-2">Пока без публичных питомцев</h3>
            <p className="text-on-surface-variant">Когда владелец добавит корги и оставит карточку публичной, они появятся здесь.</p>
          </div>
        )}
      </section>
    </main>
  );
}
