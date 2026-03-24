import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Карточка Питомца — Корги СПб",
};

const PET_DATA = {
    oliver: {
        name: "Оливер",
        desc: "Оливер — настоящий петербургский эстет. Он не просто гуляет, он созерцает архитектуру Петроградки. Любит свежие круассаны (только крошки!) и знает все потайные дворики. Он очень общительный, но сохраняет истинно петербургское достоинство.",
        likes: 328,
        location: "Петроградский",
        traits: ["Эстет", "Любит круассаны", "Дружелюбный"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBRvCAHknuyyDRVZiqdqZwbbQQMkSVi4YEgkCcqfFYrdh3G1vImnltJkmpbDsKXhG71vNFm5nLtusaCxL6wSToB9vbKXBu1Nlg7Y977lRBAMbXh8AESOhNk29sdv8DTQuniJusnVgy_n_dSCLW91hkg8MexsuO4DS9s7Fk4QK--UbPb828eohuIRzvc7dJK3PJSwaIKzz4mkimNKcWiQf8ijt7Ka1l4ISXX-nxptzwdzdtYYNUTuQfbuqkuSeI-KlEeDSevA0oJiiM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAP_b-Cas0TCEedX4fe7YuCUyPu6RCwvOqq3ODu7b-Yl58un9GvC3LfGZGpZF6FBCdjgl2Fnng01bwJxRE8b7hVoKUIb2FYLd56A8Q-a9OWMDrNI3vfszfUoR8PPZRGwiFAtzojE2Vo5hCDaXJ89GI1ONmbb1s0C9qrbWd3tpX_nZz_EqHPDh_a8H53pHhIEC-wiNApT_b2uynONMRdSftGmZgQEZ4WeeflRGzeNVBbH293ARYAm1nY4WjmSlewV8RaNP8p1Ua8Dzs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuACX8Y_QYwmxbyoOGtPwqiy9TbzgcvmcZ5Nq9wIUwBpm8od6tGG2tpYSpKPdKpsYaq_zIdBITXm6wgEJSKqkGVqHNZpKQVYDAa6NzJwht2dZbppg5thWf47AYJg4E1UAtLjmINyZ4dbJX1OgtuqpdM2wiqu6W2lgK5D0IoWSGLw2t5PPjJIX--jLFy3ISsDSm5ynJoGUeXWWZaC77VTEPpWv8XzVMCIAYS0Q_IOT2dAKL4GKMWj7IE3sQcmAM2zh1_US_9e64Qt4fA"
        ]
    },
    luna: {
        name: "Луна",
        desc: "Луна — самая активная девочка на Васильевском острове. Ее утро начинается с погони за яблоками (ее любимое лакомство), а день заканчивается профессиональным дневным сном в позе «сплут». Идеальный компаньон для долгих прогулок у воды.",
        likes: 295,
        location: "Василеостровский",
        traits: ["Любит яблоки", "Мастер сна", "Ищет друзей"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCszIqEnpWfF0NfVnTJqwukx0CvczKc9UkShRVaEemv6_3Xz74RDgTCq7t6RaUdBc0Gt-MQ1uJ2GXdd-N59RgxuzjVbNkZpRnffsdDYAYU36ffAi0IBah-CelUuQKRb69Bxa5tN24bY3kJ1pvUXoelDAJNCKsUAMmVRibcdQFwWnZfgXuiyiTv6tLV8-ALcyTkULtygsflAfg-c58hWhI_CfYSYRCYe_K1kcSsvDs_iBXYVM5TABd_9X-b-KDUyVUHETfXgS38Mfkk",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA4H0sQ0YmDIaFmVkzjyqFxMZcPBuXRryeW1Jvzj4dwNYYDODwTfxY5fd7_AhEhitNNzKkkih-d_0W4AE9B1fHS-Q45koj2UcQBvAYt_lTx9CZm9D3DK-hkFenl1fMtQNUNUlo-W3KYoUtThvLhligjlGu3zuGVc0mGKG3HE0eVw_m-ur-8tfDHUeFGRJBUPwBZ9hLjmTzpdtbsqXgls-m4jzB7b-DaCQqa0pTJIG4FFV0qZ8AHSmGwFOk8soND6hAUW7RLdgVAJ50",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDee9n3Bn8usk807wNWIcE3qW_ZPtMlzI6qTqigOcqedqaGA3qdanwZqdcO3HEhr9jFIBSEQcKgIF2ydlbDfzJZRxIBwL5Xxm_yLPI2d0JE-lBFC6tTErFR72z-hkDoajbkkjTzta21mmSEbsEgF9DzyuTSlexrz0FXtCHrhhfSC_TUlUCBBRrT4QDzXZNQ8W3xpS0zJCmI-E09xK5NU3iPN6CYZZgWKjeVfa5iWjVBCA0MY5kvBZjCHC4JcaOgoznLx0sVUdVcNI4"
        ]
    },
    archi: {
        name: "Арчи",
        desc: "Арчи — профессиональный спортсмен. Если вы видите корги, летящего за фрисби в Приморском парке Победы, скорее всего это он. Он знает все команды, но выполняет их только за очень качественное поощрение.",
        likes: 142,
        location: "Приморский",
        traits: ["Бегун", "Ловец фрисби", "Знает команды"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBYP9vZHVBqURx3I0cdSFXNvYR7KiHdVqasMpW2xzXgeuVDXwODo9z7bTa3uG0XZB-RSsqQtnxxv5nW2sS0x7c7g8A0aWyHaBRyEcrJaDsJpSpOaxxLSRUT6MLostcelxVEomeRd_zNTFmghaG_RhTNkwhJwbWcWg8JyM2JVkO7Qis-_fpgpntNTo8aI3cIo8rrvgVWobFexy_wxQCKVqxd2uJ-YKs3jdJhqIjjoF1HByeQ2ECI9AmSWbExbRP3BVDAZQtmMr3l-Zk",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDS9t4cyAKMs7YJ72jAyu8rliMmh-gE410Br2dDE7jmR1oIUQPVo6K3L3MEGgSUwXVTnUA96z7w_89FZDG3aC2nvTf4gmwk3prywGPhL8bce6Y2KD2rYT5-M-6FXSsgJA4hySJShrZuMtBOZNExZGz4esprZtGHc7gKFRWu8C9I3BPHj3Xy3LC_WhQ6oFt24GOLcGTNNrlznbe_t6Z-iylj-6KfZ9Da85qfYdgxFGHxsxQznJ5VeUb3GH2ckIUJDLcrNCGX6nyH6Kg",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBhpMaE5rTy4WSY_1xF-ppzGCkQkdwKPpiYJpnkkNioqJ24UIutEI3yMDmBsf0e0V6GlSuNsN3wzCSphFQl9xgoQSdznLhz7RRBLuAhI0xPG-wtU-mM_EAmHz2GCSwnA0X6BWml8kDpQLjrfy2-0s1WXrfZo4HAH1C2Oy9L5qhzBP0pG4lwNDx1y4qUc0srEO93ECjDZBSNbn1SL8ed7ouhbTCDw2mCivqcc0JgwoOzfJeIZjVegmZbm0AmCCueTFqmt_LqOttt1rI"
        ]
    },
    bella: {
        name: "Белла",
        desc: "Звезда Петроградки и самая стильная девочка в нашем сообществе. У Беллы больше ошейников, чем у ее хозяина обуви. Обожает внимание, вспышки камер и когда ей чешут пузико на набережной.",
        likes: 412,
        location: "Петроградский",
        traits: ["Модница", "Душа компании", "Любит фото"],
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDIpFTZnKNW4nRu2JbwFHTGJSdHHu4Mx2zvDXNTmElhakyTGsZbs1sEmdJt-QgiClpxPQYIqJCpozo7XDlrUZ63-CMfQwfRTYjcWNwdUkvzT8ndCCcyKCRXqRmA5UrBzG4IUIcJncutLs5cdvTINYiiH2EDV7Hw0u_HR0EgK2UFiK2L_nCVika0TwNUoEYlxfM9G2e-JOTNOt69yUsrL0sUU4e04KH-AlDHwCFZ4BYxdslZslfQy1TzOp2BqBrvMjnMlotg0Lm60Yg",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAyGLLsHV3q2zbaorwYpV-anVjiqq78ZQQFb6eMDcp9JltDsdORnnppYIWsv7Pd_2_RmXDzPIHPK5BTm75YH0NQ4rQr9nhsWSlIPo0geX_AV84ZKL6cE_SXJlcOXnBqYKGx1VNwfegcrde-0Z4AmBdr0b2x0dgVIusoUrTkeJtzzc5Lbge0R9r2haEZ0HjeLULTIHewcbLgqjc09kS-3r698d9DHNaUjdyb_sKnvVSfk7KzJqbDRDly1Hijq5DxhFsqgNsoOUyZVz0",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBhpMaE5rTy4WSY_1xF-ppzGCkQkdwKPpiYJpnkkNioqJ24UIutEI3yMDmBsf0e0V6GlSuNsN3wzCSphFQl9xgoQSdznLhz7RRBLuAhI0xPG-wtU-mM_EAmHz2GCSwnA0X6BWml8kDpQLjrfy2-0s1WXrfZo4HAH1C2Oy9L5qhzBP0pG4lwNDx1y4qUc0srEO93ECjDZBSNbn1SL8ed7ouhbTCDw2mCivqcc0JgwoOzfJeIZjVegmZbm0AmCCueTFqmt_LqOttt1rI"
        ]
    }
};

export default function PetDetailPage({ params }: { params: { id: string } }) {
  const petId = params.id;
  const pet = PET_DATA[petId as keyof typeof PET_DATA] || PET_DATA['oliver'];

  return (
    <main className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <Link href="/pets" className="text-primary font-bold hover:underline mb-8 inline-flex items-center gap-2">
         <span className="material-symbols-outlined">arrow_back</span>
         Назад в галерею
      </Link>
      
      <div className="bg-surface-container-lowest w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-auto md:h-[600px] rounded-[2.5rem]">
        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 relative bg-stone-100 h-64 md:h-full">
          <img alt={pet.name} className="w-full h-full object-cover" crossOrigin="anonymous" src={pet.images[0]} />
          
          {/* Small Gallery Previews overlay */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
            {pet.images.map((img, idx) => (
              <div key={idx} className={`aspect-square rounded-lg border-2 ${idx === 0 ? 'border-primary' : 'border-transparent'} overflow-hidden shadow-lg cursor-pointer hover:border-primary transition-all`}>
                <img className="w-full h-full object-cover" crossOrigin="anonymous" src={img} alt={`${pet.name} photo ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-display text-4xl font-black text-on-surface tracking-tight mb-1">{pet.name}</h1>
              <div className="flex items-center gap-2 text-tertiary">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span className="text-sm font-medium">{pet.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
               <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
               <span className="text-primary font-black text-sm">{pet.likes} лапок</span>
            </div>
          </div>
          
          <div className="mb-10">
             <p className="text-on-surface-variant leading-relaxed text-lg italic">
               &quot;{pet.desc}&quot;
             </p>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-display font-black text-sm uppercase tracking-widest text-primary">Особенности</h4>
            <div className="flex flex-wrap gap-2">
              {pet.traits.map(trait => (
                <span key={trait} className="bg-surface-container-high px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6 flex flex-col gap-3">
             <button className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
               <span className="material-symbols-outlined">chat</span>
               Связаться с хозяином
             </button>
             <button className="w-full py-4 bg-surface-container-high text-on-surface rounded-full font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all duration-300 flex items-center justify-center gap-3">
               <span className="material-symbols-outlined">directions_walk</span>
               Позвать гулять
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
