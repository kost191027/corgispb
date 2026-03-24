"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function PetModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onOpenChange(open: boolean) {
    if (!open) {
      router.back();
    }
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden sm:rounded-[2rem] border-none bg-surface">
        {children}
      </DialogContent>
    </Dialog>
  );
}
