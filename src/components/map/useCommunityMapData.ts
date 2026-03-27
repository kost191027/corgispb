"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { COMMUNITY_MAP_SPOTS, type CommunityMapSpot } from "@/lib/map-spots";

type CommunityMapViewer = {
  id: string;
  name: string;
  district?: string;
  avatarUrl?: string;
} | null;

type CreateCommunityPointPayload = {
  category: "parks" | "cafes" | "community";
  district: string;
  title: string;
  subtitle: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
};

export function useCommunityMapData() {
  const [viewer, setViewer] = useState<CommunityMapViewer>(null);
  const [dynamicPoints, setDynamicPoints] = useState<CommunityMapSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPoints = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/community-points", {
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        viewer: CommunityMapViewer;
        points?: CommunityMapSpot[];
      };

      setViewer(payload.viewer);
      setDynamicPoints(
        (payload.points || []).filter((point) => point.source === "community"),
      );
    } catch (loadError) {
      console.error("Community map load failed", loadError);
      setError("Не удалось обновить пользовательские точки.");
      setDynamicPoints([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPoints();
  }, [loadPoints]);

  const points = useMemo(
    () => [...dynamicPoints, ...COMMUNITY_MAP_SPOTS],
    [dynamicPoints],
  );

  const createPoint = useCallback(
    async (payload: CreateCommunityPointPayload) => {
      const response = await fetch("/api/community-points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        point?: CommunityMapSpot | null;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Не удалось сохранить точку.");
      }

      if (result.point) {
        setDynamicPoints((current) => [result.point!, ...current]);
      }
    },
    [],
  );

  return {
    viewer,
    points,
    isLoading,
    error,
    reload: loadPoints,
    createPoint,
  };
}
