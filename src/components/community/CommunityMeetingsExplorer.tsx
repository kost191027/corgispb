"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddCommunityGroupModal } from "@/components/community/AddCommunityGroupModal";
import { ClientYandexMap } from "@/components/map/ClientYandexMap";
import { AddMeetingModal } from "@/components/meetings/AddMeetingModal";
import { useMeetingsData } from "@/components/meetings/useMeetingsData";
import type { CommunityGroup } from "@/lib/community-groups";
import type { OwnerProfileRecord } from "@/lib/owners";
import {
  getMeetingTypes,
  getMeetingAccentClasses,
  type MeetingRecord,
  toMeetingMapMarker,
} from "@/lib/meetings";
import { formatOwnersLabel, formatPointsLabel } from "@/lib/map-spots";

type CommunityMeetingsExplorerProps = {
  owners: OwnerProfileRecord[];
  viewer: {
    id: string;
    name: string;
    district?: string;
    avatarUrl?: string | null;
  } | null;
};

function formatMembersLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} участник`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} участника`;
  }

  return `${count} участников`;
}

export function CommunityMeetingsExplorer({
  owners,
  viewer,
}: CommunityMeetingsExplorerProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("Все");
  const [selectedMeetingId, setSelectedMeetingId] = useState("");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>([]);
  const [isGroupsLoading, setIsGroupsLoading] = useState(true);
  const [joiningGroupId, setJoiningGroupId] = useState<string | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { meetings, setMeetings } = useMeetingsData();

  useEffect(() => {
    const controller = new AbortController();

    async function loadGroups() {
      try {
        setIsGroupsLoading(true);
        const response = await fetch("/api/community-groups", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load groups");
        }

        const payload = (await response.json()) as {
          groups?: CommunityGroup[];
          joinedGroupIds?: string[];
        };

        setGroups(payload.groups || []);
        setJoinedGroupIds(payload.joinedGroupIds || []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Community groups fetch failed", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsGroupsLoading(false);
        }
      }
    }

    loadGroups();

    return () => controller.abort();
  }, []);

  const districtStats = useMemo(() => {
    const ownerCounts = new Map<string, number>();
    const meetingCounts = new Map<string, number>();

    owners.forEach((owner) => {
      const district = String(owner.district || "").trim();

      if (!district) {
        return;
      }

      ownerCounts.set(district, (ownerCounts.get(district) || 0) + 1);
    });

    meetings.forEach((meeting) => {
      const district = String(meeting.district || "").trim();

      if (!district) {
        return;
      }

      meetingCounts.set(district, (meetingCounts.get(district) || 0) + 1);
    });

    return Array.from(
      new Set([
        ...Array.from(ownerCounts.keys()),
        ...Array.from(meetingCounts.keys()),
      ]),
    )
      .map((district) => ({
        district,
        ownersCount: ownerCounts.get(district) || 0,
        meetingsCount: meetingCounts.get(district) || 0,
      }))
      .sort((left, right) => {
        if (right.ownersCount !== left.ownersCount) {
          return right.ownersCount - left.ownersCount;
        }

        if (right.meetingsCount !== left.meetingsCount) {
          return right.meetingsCount - left.meetingsCount;
        }

        return left.district.localeCompare(right.district, "ru");
      });
  }, [meetings, owners]);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      const matchesDistrict =
        !selectedDistrict || meeting.district === selectedDistrict;
      const matchesType =
        selectedType === "Все" || meeting.type === selectedType;

      return matchesDistrict && matchesType;
    }).sort((left, right) => left.eventDate.localeCompare(right.eventDate));
  }, [meetings, selectedDistrict, selectedType]);

  const selectedMeeting =
    filteredMeetings.find((meeting) => meeting.id === selectedMeetingId) ??
    filteredMeetings[0] ??
    null;

  useEffect(() => {
    if (!filteredMeetings.find((meeting) => meeting.id === selectedMeetingId)) {
      setSelectedMeetingId(filteredMeetings[0]?.id ?? "");
    }
  }, [filteredMeetings, selectedMeetingId]);

  const visibleDistricts = useMemo(() => districtStats.slice(0, 4), [districtStats]);
  const meetingTypes = useMemo(() => getMeetingTypes(meetings), [meetings]);
  const markers = useMemo(
    () => filteredMeetings.map(toMeetingMapMarker),
    [filteredMeetings],
  );
  const scheduleMeetings = useMemo(
    () => filteredMeetings.slice(0, 3),
    [filteredMeetings],
  );
  const ownersCountByDistrict = useMemo(() => {
    return new Map(
      districtStats.map((districtStat) => [
        districtStat.district,
        districtStat.ownersCount,
      ]),
    );
  }, [districtStats]);
  const sortedGroups = useMemo(() => {
    return [...groups].sort((left, right) => {
      const rightMembers = right.membersCount || 0;
      const leftMembers = left.membersCount || 0;

      if (rightMembers !== leftMembers) {
        return rightMembers - leftMembers;
      }

      const rightOwners = ownersCountByDistrict.get(right.district) || 0;
      const leftOwners = ownersCountByDistrict.get(left.district) || 0;

      if (rightOwners !== leftOwners) {
        return rightOwners - leftOwners;
      }

      const rightDate = right.createdAt ? Date.parse(right.createdAt) : 0;
      const leftDate = left.createdAt ? Date.parse(left.createdAt) : 0;

      if (rightDate !== leftDate) {
        return rightDate - leftDate;
      }

      return left.name.localeCompare(right.name, "ru");
    });
  }, [groups, ownersCountByDistrict]);
  const activeGroups = useMemo(() => sortedGroups, [sortedGroups]);

  async function handleCreateGroup(formData: FormData) {
    const response = await fetch("/api/community-groups", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      message?: string;
      group?: CommunityGroup;
      joinedGroupId?: string;
    };

    if (!response.ok || !payload.ok || !payload.group) {
      throw new Error(
        payload.message || "Не удалось сохранить группу сообщества.",
      );
    }

    setGroups((currentGroups) => {
      const nextGroups = currentGroups.filter(
        (group) => group.id !== payload.group?.id,
      );
      return [payload.group as CommunityGroup, ...nextGroups];
    });
    if (payload.joinedGroupId) {
      setJoinedGroupIds((current) =>
        current.includes(payload.joinedGroupId as string)
          ? current
          : [payload.joinedGroupId as string, ...current],
      );
    }
  }

  async function handleJoinGroup(groupId: string) {
    if (!viewer) {
      window.location.href = "/login";
      return;
    }

    setJoiningGroupId(groupId);

    try {
      const response = await fetch(`/api/community-groups/${groupId}/join`, {
        method: "POST",
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        joinedGroupId?: string;
      };

      if (!response.ok || !payload.ok || !payload.joinedGroupId) {
        throw new Error(payload.message || "Не удалось вступить в группу.");
      }

      setJoinedGroupIds((current) =>
        current.includes(groupId) ? current : [groupId, ...current],
      );
      setGroups((currentGroups) =>
        currentGroups.map((group) =>
          group.id === groupId
            ? { ...group, membersCount: (group.membersCount || 0) + 1 }
            : group,
        ),
      );
    } finally {
      setJoiningGroupId(null);
    }
  }

  async function handleCreateMeeting(formData: FormData) {
    const response = await fetch("/api/meetings", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      message?: string;
      meeting?: MeetingRecord | null;
    };

    if (!response.ok || !payload.ok || !payload.meeting) {
      throw new Error(payload.message || "Не удалось сохранить событие.");
    }

    setMeetings((currentMeetings) =>
      [...currentMeetings, payload.meeting as MeetingRecord].sort((left, right) =>
        left.eventDate.localeCompare(right.eventDate),
      ),
    );
    setSelectedMeetingId(payload.meeting.id);
  }

  return (
    <main className="bg-background pb-20 pt-24">
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <div className="relative flex min-h-[500px] items-center overflow-hidden rounded-[2.5rem] bg-surface-container-low">
          <div className="absolute inset-0 z-0">
            <img
              alt="Corgis and owners in St. Petersburg"
              className="h-full w-full object-cover opacity-80 mix-blend-multiply"
              crossOrigin="anonymous"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx63EACF2vtIIG-U4xhr_Isu1VNod7fe4BgnqPzoFTtJH9-KMqOg2cZvyVAd4A3nZEtN4QRlBypiweh5Hzg1ylBLnDul8nuJ0Xep6kGU071pKKrw08ldN0Cr2a_waV2nenMmUeHTfw17OzKvkTkQaRC15WDIu-nEPhr5AZsGEirNNfyofMWSuB4zpT7IxFH-BHtLEDBu1DLslmUIGJMzyOux5lFutNp85VKe_jPe5YGuQDhk495oDcMqLF6y2RjMkYWjhn0neOFmY"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/45 to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl px-6 md:pl-16 lg:pl-20">
            <h1 className="mb-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-on-surface md:text-6xl">
              Комьюнити <br />
              <span className="text-primary italic">корги-родителей</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-on-surface-variant">
              Самое пушистое сообщество Петербурга. Делимся опытом, гуляем
              вместе и создаем лучшие моменты для наших коротколапых друзей.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                className="rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-bold text-on-primary shadow-lg transition-all duration-300 hover:-translate-y-1"
                type="button"
              >
                Присоединиться к нам
              </button>
              <button
                className="rounded-full bg-surface-container-highest px-8 py-4 font-bold text-on-surface-variant transition-colors hover:bg-surface-variant"
                type="button"
              >
                О сообществе
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="w-full space-y-6 md:w-1/3">
            <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-container/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-on-tertiary-container">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Районы города
            </div>
            <h2 className="font-display text-4xl font-black leading-none text-on-surface">
              Где мы встречаемся?
            </h2>
            <p className="leading-relaxed text-on-surface-variant">
              Найдите единомышленников в своём районе. Здесь видно, где уже есть
              активные владельцы и ближайшие встречи сообщества.
            </p>

            <div className="max-h-[352px] space-y-3 overflow-y-auto pr-1">
              {visibleDistricts.map((districtStat, index) => {
                const isActive = selectedDistrict === districtStat.district;

                return (
                  <button
                    key={districtStat.district}
                    className={`flex w-full items-center justify-between rounded-2xl p-4 text-left transition-colors ${
                      isActive || (!selectedDistrict && index === 0)
                        ? "border-l-4 border-primary bg-surface-container-low"
                        : "bg-surface-container-lowest hover:bg-surface-container"
                    }`}
                    onClick={() =>
                      setSelectedDistrict((current) =>
                        current === districtStat.district
                          ? null
                          : districtStat.district,
                      )
                    }
                    type="button"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface">
                        {districtStat.district}
                      </p>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {formatPointsLabel(districtStat.meetingsCount)} в
                        календаре
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                      {formatOwnersLabel(districtStat.ownersCount)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[500px] w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-sm md:w-2/3">
            <ClientYandexMap
              activeMarkerId={selectedMeeting?.id ?? null}
              center={[30.3158, 59.9391]}
              enableClustering
              height="500px"
              loadingLabel="Подгружаем карту мероприятий..."
              markers={markers}
              onMarkerClick={(marker) => setSelectedMeetingId(marker.id)}
              zoom={10.8}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-7xl overflow-x-auto px-6 no-scrollbar">
        <div className="flex items-center gap-3 border-y border-stone-100 py-4">
          <span className="mr-4 text-xs font-bold uppercase tracking-widest text-stone-400">
            Фильтры:
          </span>
          <button
            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
              selectedType === "Все"
                ? "bg-primary text-white shadow-md"
                : "bg-surface-container-high text-on-surface-variant hover:bg-stone-200"
            }`}
            onClick={() => setSelectedType("Все")}
            type="button"
          >
            Все встречи
          </button>
          {meetingTypes.filter((type) => type !== "Все").map((type) => {
            const isActive = selectedType === type;

            return (
              <button
                key={type}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-stone-200"
                }`}
                onClick={() => setSelectedType(type)}
                type="button"
              >
                {type}
              </button>
            );
          })}
          {(selectedDistrict || selectedType !== "Все") && (
            <button
              className="whitespace-nowrap rounded-full bg-surface-container-low px-6 py-2.5 text-sm font-bold text-primary"
              onClick={() => {
                setSelectedDistrict(null);
                setSelectedType("Все");
              }}
              type="button"
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <h3 className="flex items-center gap-2 text-2xl font-bold">
              <span className="material-symbols-outlined text-primary">
                groups
              </span>
              Активные группы
            </h3>

            <div className="max-h-[33rem] space-y-4 overflow-y-auto pr-1">
              {activeGroups.map((group) => {
                const districtOwnersCount =
                  ownersCountByDistrict.get(group.district) || 0;

                return (
                  <article
                    key={group.id}
                    className="group relative overflow-hidden rounded-[1.75rem] bg-surface-container-low p-5 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                        {group.imageUrl ? (
                          <img
                            alt={group.name}
                            className="h-full w-full object-cover"
                            src={group.imageUrl}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-primary">
                            groups
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-[0.14em] text-primary">
                            {group.district}
                          </span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-on-surface-variant shadow-sm">
                            {formatMembersLabel(group.membersCount || districtOwnersCount)}
                          </span>
                        </div>
                        <Link
                          className="truncate font-bold text-on-surface transition-colors hover:text-primary"
                          href={`/community/groups/${group.id}`}
                        >
                          {group.name}
                        </Link>
                      </div>
                    </div>
                    <p className="mb-2 text-sm font-semibold text-on-surface">
                      Сегодня обсуждают:{" "}
                      <span className="font-medium text-on-surface-variant">
                        {group.todayTopic}
                      </span>
                    </p>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
                      {group.description}
                    </p>
                    <button
                      className="w-full rounded-full border border-primary/20 bg-white py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      disabled={joiningGroupId === group.id || joinedGroupIds.includes(group.id)}
                      onClick={() => void handleJoinGroup(group.id)}
                      type="button"
                    >
                      {joinedGroupIds.includes(group.id)
                        ? "Вы уже в группе"
                        : joiningGroupId === group.id
                          ? "Добавляем..."
                          : "Вступить в группу"}
                    </button>
                  </article>
                );
              })}

              {!activeGroups.length && !isGroupsLoading ? (
                <div className="rounded-[1.75rem] bg-surface-container-low p-6 text-sm text-on-surface-variant">
                  Пока нет групп. Создайте первую районную группу для своего
                  сообщества.
                </div>
              ) : null}
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-orange-600"
              onClick={() => setIsGroupModalOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                add_circle
              </span>
              Добавить группу
            </button>

            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="material-symbols-outlined text-primary">
                view_cozy
              </span>
              Все группы
            </div>

            <div className="space-y-4">
              {sortedGroups.map((group) => {
                const districtOwnersCount =
                  ownersCountByDistrict.get(group.district) || 0;

                return (
                  <article
                    key={`all-${group.id}`}
                    className="rounded-[1.75rem] bg-surface-container-lowest p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-surface-container shadow-sm">
                        {group.imageUrl ? (
                          <img
                            alt={group.name}
                            className="h-full w-full object-cover"
                            src={group.imageUrl}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-primary">
                            groups
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-[0.14em] text-primary">
                            {group.district}
                          </span>
                          <span className="rounded-full bg-tertiary-container/30 px-2 py-0.5 text-[11px] font-bold text-on-surface-variant">
                            {formatMembersLabel(group.membersCount || districtOwnersCount)}
                          </span>
                        </div>
                        <Link
                          className="text-lg font-bold text-on-surface transition-colors hover:text-primary"
                          href={`/community/groups/${group.id}`}
                        >
                          {group.name}
                        </Link>
                        <p className="mt-1 text-sm text-on-surface-variant">
                          {group.todayTopic}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
                      {group.description}
                    </p>
                    <button
                      className="rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      disabled={joiningGroupId === group.id || joinedGroupIds.includes(group.id)}
                      onClick={() => void handleJoinGroup(group.id)}
                      type="button"
                    >
                      {joinedGroupIds.includes(group.id)
                        ? "Вы уже в группе"
                        : joiningGroupId === group.id
                          ? "Добавляем..."
                          : "Вступить в группу"}
                    </button>
                  </article>
                );
              })}

              {!sortedGroups.length && !isGroupsLoading ? (
                <div className="rounded-[1.75rem] bg-surface-container-low p-6 text-sm text-on-surface-variant">
                  Список групп пока пуст. Первую группу может создать любой
                  зарегистрированный владелец.
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <span className="material-symbols-outlined text-primary">
                  calendar_month
                </span>
                Расписание встреч
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                  onClick={() => setIsMeetingModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Добавить событие
                </button>
                <Link
                  className="text-sm font-bold text-primary hover:underline"
                  href="/meetings"
                >
                  Весь календарь →
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {scheduleMeetings.map((meeting) => {
                const accent = getMeetingAccentClasses(meeting.accent);

                return (
                  <div
                    key={meeting.id}
                    className="group flex flex-col gap-6 rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-sm transition-transform hover:translate-x-2 md:flex-row md:items-center"
                  >
                    <div className="shrink-0 text-center md:border-r md:border-stone-100 md:pr-6">
                      <div className="text-2xl font-black text-primary">
                        {meeting.dateLabel.split(" ")[0]}
                      </div>
                      <div className="text-xs font-bold uppercase text-stone-400">
                        {meeting.dateLabel.split(" ")[1]}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${accent.badge}`}
                        >
                          {meeting.type}
                        </span>
                        <span className="text-xs text-stone-400">
                          {meeting.timeLabel}
                        </span>
                      </div>
                      <h4 className="mb-1 font-display text-lg font-bold">
                        {meeting.title}
                      </h4>
                      <p className="flex items-center gap-1 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">
                          location_on
                        </span>
                        {meeting.location}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary/10 text-[10px] font-bold text-primary">
                          +{Math.max(meeting.participants - 30, 6)}
                        </div>
                      </div>
                      <button
                        className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg"
                        type="button"
                      >
                        Участвовать
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AddCommunityGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        viewer={viewer}
      />
      <AddMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onCreateMeeting={handleCreateMeeting}
        viewer={viewer}
      />
    </main>
  );
}
