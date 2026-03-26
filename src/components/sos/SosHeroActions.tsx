"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SosSuccessModal } from "@/components/sos/SosSuccessModal";

const SosModal = dynamic(() => import("@/components/shared/SosModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  ),
});

export function SosHeroActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [mode, setMode] = useState<"lost" | "found">("lost");

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row">
        <button
          onClick={() => {
            setMode("lost");
            setIsOpen(true);
          }}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-primary-container px-8 py-5 text-lg font-bold text-on-primary-container shadow-xl shadow-primary/20 transition-all hover:shadow-primary/30 active:scale-95 sm:w-auto"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            report_gmailerrorred
          </span>
          Пропала собака
        </button>
        <button
          onClick={() => {
            setMode("found");
            setIsOpen(true);
          }}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-secondaryContainer bg-secondary-container px-8 py-5 text-lg font-bold text-on-secondary-container shadow-md transition-all hover:shadow-lg active:scale-95 sm:w-auto"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
          Нашел собаку
        </button>
      </div>

      <SosModal
        initialMode={mode}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => setIsSuccessOpen(true)}
      />
      <SosSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
