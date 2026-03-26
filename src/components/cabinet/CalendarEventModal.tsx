"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createCalendarEvent } from "@/actions/calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CALENDAR_EVENT_TYPES, CALENDAR_EVENT_TYPE_STYLES } from "@/lib/calendar";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarEventModal({ isOpen, onClose }: CalendarEventModalProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [eventType, setEventType] = React.useState<(typeof CALENDAR_EVENT_TYPES)[number]>("Уход");
  const [remindEnabled, setRemindEnabled] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle("");
    setEventDate("");
    setLocation("");
    setDescription("");
    setEventType("Уход");
    setRemindEnabled(true);
    setErrorMessage("");
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("eventDate", eventDate);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("type", eventType);
      formData.append("remindEnabled", String(remindEnabled));

      const result = await createCalendarEvent(formData);

      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Calendar event submit failed", error);
      setErrorMessage("Не удалось добавить событие. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[min(620px,calc(100vw-24px))] max-w-[620px] max-h-[calc(100dvh-24px)] overflow-y-auto border-none bg-surface-container-lowest p-0 sm:rounded-[2rem]">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight">Новое событие</h2>
              <p className="text-on-surface-variant mt-2">Создайте свое напоминание или встречу и сохраните ее прямо в календарь кабинета.</p>
            </div>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors" onClick={onClose} type="button">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Категория</label>
              <div className="flex flex-wrap gap-2">
                {CALENDAR_EVENT_TYPES.map((type) => {
                  const isActive = eventType === type;
                  return (
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        isActive ? `${CALENDAR_EVENT_TYPE_STYLES[type]} ring-2 ring-primary/15 shadow-sm` : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                      }`}
                      key={type}
                      onClick={() => setEventType(type)}
                      type="button"
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Название</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setTitle(event.target.value)}
                required
                type="text"
                value={title}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Дата и время</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setEventDate(event.target.value)}
                required
                type="datetime-local"
                value={eventDate}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Место</label>
              <input
                className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all"
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Напр. Ветклиника, парк или дом"
                type="text"
                value={location}
              />
            </div>

            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Комментарий</label>
              <textarea
                className="w-full px-6 py-4 bg-surface-container-high rounded-[1.5rem] focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all resize-none"
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                value={description}
              />
            </div>

            <label className="flex items-center justify-between rounded-[1.5rem] bg-surface-container-high px-5 py-4 cursor-pointer">
              <div>
                <p className="font-bold text-on-surface">Напомнить</p>
                <p className="text-sm text-on-surface-variant mt-1">За 1 час до события в уведомлениях появится красный индикатор.</p>
              </div>
              <span className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${remindEnabled ? "bg-primary" : "bg-outline-variant/50"}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${remindEnabled ? "translate-x-6" : "translate-x-1"}`} />
              </span>
              <input
                checked={remindEnabled}
                className="sr-only"
                onChange={(event) => setRemindEnabled(event.target.checked)}
                type="checkbox"
              />
            </label>

            {errorMessage ? (
              <div className="rounded-2xl bg-error-container/70 px-5 py-4 text-sm font-medium text-on-error-container">{errorMessage}</div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                className="bg-gradient-to-r from-primary to-primary-container text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex-1"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Сохраняем..." : "Добавить в календарь"}
              </button>
              <button
                className="px-10 py-4 bg-surface-container-highest text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-all flex-1 active:scale-95"
                disabled={isSubmitting}
                onClick={onClose}
                type="button"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
