"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type SosSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SosSuccessModal({
  isOpen,
  onClose,
}: SosSuccessModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[10010] bg-black/60 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-[2rem] bg-surface-container-lowest p-8 text-center shadow-[0_30px_90px_rgba(25,20,16,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mark_email_read
            </span>
          </div>
          <h3 className="mb-3 font-display text-3xl font-black text-on-surface">
            Сообщение отправлено
          </h3>
          <p className="mb-6 text-base font-medium leading-relaxed text-on-surface-variant">
            Ваше сообщение отправлено. Наши добровольцы и волонтеры обязательно
            свяжутся с вами.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-on-primary transition-colors hover:bg-primary/90 active:scale-95"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
