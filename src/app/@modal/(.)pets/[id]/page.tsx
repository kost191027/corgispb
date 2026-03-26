import { notFound } from "next/navigation";
import { PetDetailContent } from "@/components/pets/PetDetailContent";
import { PetModal } from "@/components/pets/PetModal";
import { getPetById } from "@/lib/server/pets";

export default async function PetInterceptedPage({ params }: { params: { id: string } }) {
  const pet = await getPetById(params.id);

  if (!pet) {
    notFound();
  }

  return (
    <PetModal>
      <PetDetailContent pet={pet} />
    </PetModal>
  );
}
