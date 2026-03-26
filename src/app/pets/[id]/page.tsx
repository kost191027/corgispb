import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PetDetailContent } from "@/components/pets/PetDetailContent";
import { getPetById } from "@/lib/server/pets";

export const metadata: Metadata = {
  title: "Карточка Питомца — Корги СПб",
};

export default async function PetDetailPage({ params }: { params: { id: string } }) {
  const pet = await getPetById(params.id);

  if (!pet) {
    notFound();
  }

  return (
    <main className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <Link className="text-primary font-bold hover:underline mb-8 inline-flex items-center gap-2" href="/pets">
        <span className="material-symbols-outlined">arrow_back</span>
        Назад в галерею
      </Link>

      <PetDetailContent pet={pet} />
    </main>
  );
}
