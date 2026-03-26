import type { Metadata } from "next";
import { getCurrentUser } from "@/actions/auth";
import { PetsGalleryClient } from "@/components/pets/PetsGalleryClient";
import { getPublicPets } from "@/lib/server/pets";

export const metadata: Metadata = {
  title: "Наши Любимцы — Корги СПб",
  description: "Познакомьтесь с главными жителями нашего сообщества. Здесь собраны реальные корги Петербурга из кабинетов пользователей.",
};

export const dynamic = "force-dynamic";

export default async function PetsGalleryPage() {
  const [pets, currentUser] = await Promise.all([getPublicPets(), getCurrentUser()]);

  return <PetsGalleryClient canAddPet={Boolean(currentUser)} pets={pets} />;
}
