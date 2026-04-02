"use client";

import { useEffect, useState } from "react";
import { MEETINGS, type MeetingRecord } from "@/lib/meetings";

export function useMeetingsData() {
  const [meetings, setMeetings] = useState<MeetingRecord[]>(MEETINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMeetings() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/meetings", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load meetings");
        }

        const payload = (await response.json()) as {
          meetings?: MeetingRecord[];
        };

        if (payload.meetings?.length) {
          setMeetings(payload.meetings);
        } else {
          setMeetings([]);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Meetings fetch failed", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadMeetings();

    return () => controller.abort();
  }, []);

  return {
    isLoading,
    meetings,
    setMeetings,
  };
}
