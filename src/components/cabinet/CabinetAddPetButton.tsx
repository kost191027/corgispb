"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AddPetModal = dynamic(
  () => import("@/components/shared/AddPetModal"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-md">
        <div className="h-14 w-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    ),
  },
);

type CabinetAddPetButtonProps = {
  className?: string;
};

export function CabinetAddPetButton({ className }: CabinetAddPetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-bold transition-all active:scale-95",
          className,
        )}
      >
        <span className="material-symbols-outlined text-[18px]">add_circle</span>
        Добавить питомца
      </button>

      <AddPetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
