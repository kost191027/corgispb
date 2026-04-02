"use client";

const COMMUNITY_MAP_CLICK_COUNTS_KEY = "corgi-community-map-click-counts";

export type CommunityMapClickCounts = Record<string, number>;

export function readCommunityMapClickCounts(): CommunityMapClickCounts {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(COMMUNITY_MAP_CLICK_COUNTS_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as CommunityMapClickCounts;

    return Object.entries(parsed).reduce<CommunityMapClickCounts>(
      (accumulator, [key, value]) => {
        if (typeof value === "number" && Number.isFinite(value) && value > 0) {
          accumulator[key] = value;
        }

        return accumulator;
      },
      {},
    );
  } catch {
    return {};
  }
}

export function writeCommunityMapClickCounts(counts: CommunityMapClickCounts) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      COMMUNITY_MAP_CLICK_COUNTS_KEY,
      JSON.stringify(counts),
    );
  } catch {
    // Ignore localStorage quota and privacy mode errors
  }
}

export function incrementCommunityMapClickCount(pointId: string) {
  const current = readCommunityMapClickCounts();
  const next = {
    ...current,
    [pointId]: (current[pointId] || 0) + 1,
  };

  writeCommunityMapClickCounts(next);

  return next;
}
