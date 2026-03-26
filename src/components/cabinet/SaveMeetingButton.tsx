"use client";

import React from "react";
import { saveSiteEventToCalendar } from "@/actions/calendar";

interface SaveMeetingButtonProps {
  event: {
    id: string;
    title: string;
    eventDate: string;
    location: string;
    type: string;
    description: string;
  };
  className?: string;
}

export function SaveMeetingButton({ event, className }: SaveMeetingButtonProps) {
  const [statusMessage, setStatusMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleSave() {
    setStatusMessage("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("sourceId", event.id);
      formData.append("title", event.title);
      formData.append("eventDate", event.eventDate);
      formData.append("location", event.location);
      formData.append("type", event.type);
      formData.append("description", event.description);
      formData.append("remindEnabled", "true");

      const result = await saveSiteEventToCalendar(formData);
      setStatusMessage(result.message);
    } catch (error) {
      console.error("Save meeting button failed", error);
      setStatusMessage("Не удалось добавить событие.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        className={className || "w-full py-3 rounded-full bg-surface-container-high text-on-surface font-bold hover:bg-surface-container-highest transition-colors"}
        disabled={isSaving}
        onClick={handleSave}
        type="button"
      >
        {isSaving ? "Сохраняем..." : "В мой календарь"}
      </button>
      {statusMessage ? <p className="text-xs text-on-surface-variant text-center">{statusMessage}</p> : null}
    </div>
  );
}
