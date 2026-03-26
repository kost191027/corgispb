import { Metadata } from "next";
import { BreedersPageClient } from "@/components/breeders/BreedersPageClient";

export const metadata: Metadata = {
  title: "Заводчики — Корги СПб",
  description: "Проверенные заводчики корги в Санкт-Петербурге. Элитные питомники.",
};

export default function BreedersPage() {
  return <BreedersPageClient />;
}
