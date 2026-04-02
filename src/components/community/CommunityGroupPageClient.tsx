"use client";

import Link from "next/link";
import { useState } from "react";
import type { CommunityGroup } from "@/lib/community-groups";
import type { PetRecord } from "@/lib/pets";
import type {
  CommunityGroupMember,
  CommunityGroupPost,
} from "@/lib/server/community-groups";

type CommunityGroupPageClientProps = {
  group: CommunityGroup;
  initialMembers: CommunityGroupMember[];
  initialPosts: CommunityGroupPost[];
  pets: PetRecord[];
  viewer: {
    id: string;
    name: string;
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

function formatPostDate(value?: string) {
  if (!value) {
    return "Только что";
  }

  const date = new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function CommunityGroupPageClient({
  group,
  initialMembers,
  initialPosts,
  pets,
  viewer,
}: CommunityGroupPageClientProps) {
  const [members, setMembers] = useState(initialMembers);
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isMember = Boolean(
    viewer && members.some((member) => member.userId === viewer.id),
  );

  async function handleJoin() {
    if (!viewer) {
      window.location.href = "/login";
      return;
    }

    setIsJoining(true);
    setFeedback(null);

    try {
      const response = await fetch(`/api/community-groups/${group.id}/join`, {
        method: "POST",
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Не удалось вступить в группу.");
      }

      setMembers((current) => {
        if (current.some((member) => member.userId === viewer.id)) {
          return current;
        }

        return [
          {
            id: `local-${viewer.id}`,
            groupId: group.id,
            userId: viewer.id,
            userName: viewer.name,
            avatarUrl: viewer.avatarUrl || undefined,
          },
          ...current,
        ];
      });
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Не удалось вступить в группу.",
      );
    } finally {
      setIsJoining(false);
    }
  }

  async function handlePost() {
    if (!viewer) {
      window.location.href = "/login";
      return;
    }

    if (!isMember) {
      setFeedback("Сначала вступите в группу, чтобы писать на ее стене.");
      return;
    }

    const trimmedContent = postContent.trim();

    if (!trimmedContent) {
      setFeedback("Напишите сообщение для стены группы.");
      return;
    }

    setIsPosting(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("content", trimmedContent);

      const response = await fetch(`/api/community-groups/${group.id}/posts`, {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        post?: CommunityGroupPost;
      };

      if (!response.ok || !payload.ok || !payload.post) {
        throw new Error(payload.message || "Не удалось опубликовать сообщение.");
      }

      setPosts((current) => [payload.post as CommunityGroupPost, ...current]);
      setPostContent("");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Не удалось опубликовать сообщение.",
      );
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <main className="bg-background pb-20 pt-24">
      <section className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-container-low shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-tertiary-container/35" />
          <div className="relative grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
            <div className="space-y-5">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary"
                href="/community"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Назад к комьюнити
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">
                  {group.district}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {formatMembersLabel(members.length || group.membersCount || 0)}
                </span>
              </div>
              <div>
                <h1 className="font-display text-5xl font-black leading-[0.95] text-on-surface">
                  {group.name}
                </h1>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                  {group.description}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-sm">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-primary">
                  Сегодня в центре внимания
                </p>
                <p className="mt-3 text-base font-semibold text-on-surface">
                  {group.todayTopic}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-orange-600 disabled:opacity-60"
                  disabled={isJoining || isMember}
                  onClick={() => void handleJoin()}
                  type="button"
                >
                  {isMember
                    ? "Вы уже в группе"
                    : isJoining
                      ? "Добавляем..."
                      : "Вступить в группу"}
                </button>
                <button
                  className="rounded-full bg-surface-container-high px-6 py-3 font-bold text-on-surface transition-colors hover:bg-surface-container"
                  type="button"
                >
                  Пригласить друга
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white/85 shadow-sm">
              {group.imageUrl ? (
                <img
                  alt={group.name}
                  className="h-full min-h-[320px] w-full object-cover"
                  src={group.imageUrl}
                />
              ) : (
                <div className="flex min-h-[320px] items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-6xl text-primary/70">
                    groups
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  forum
                </span>
                <h2 className="text-2xl font-black text-on-surface">
                  Стена группы
                </h2>
              </div>

              <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                <textarea
                  className="min-h-[120px] w-full resize-none rounded-[1.25rem] border-none bg-surface-container-low px-4 py-4 text-on-surface outline-none focus:ring-2 focus:ring-primary/30"
                  maxLength={1500}
                  onChange={(event) => setPostContent(event.target.value)}
                  placeholder="Поделитесь новостью, маршрутом прогулки или вопросом для группы..."
                  value={postContent}
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    {postContent.length}/1500
                  </span>
                  <button
                    className="rounded-full bg-primary px-5 py-2.5 font-bold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
                    disabled={isPosting || !isMember}
                    onClick={() => void handlePost()}
                    type="button"
                  >
                    {isPosting ? "Публикуем..." : "Опубликовать"}
                  </button>
                </div>
              </div>

              {feedback ? (
                <div className="rounded-[1.25rem] bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  {feedback}
                </div>
              ) : null}

              <div className="space-y-4">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-[1.5rem] bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface-container">
                        {post.authorAvatarUrl ? (
                          <img
                            alt={post.authorName}
                            className="h-full w-full object-cover"
                            src={post.authorAvatarUrl}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-primary">
                            pets
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">
                          {post.authorName}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {formatPostDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-on-surface-variant">
                      {post.content}
                    </p>
                  </article>
                ))}

                {!posts.length ? (
                  <div className="rounded-[1.5rem] bg-white p-5 text-sm text-on-surface-variant shadow-sm">
                    На стене пока тихо. Первое сообщение может задать тон всей
                    группе.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  photo_library
                </span>
                <h2 className="text-2xl font-black text-on-surface">
                  Галерея питомцев
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {pets.map((pet) => (
                  <Link
                    key={pet.id}
                    className="group overflow-hidden rounded-[1.5rem] bg-white shadow-sm transition-transform hover:-translate-y-1"
                    href={`/pets/${pet.id}`}
                  >
                    <div className="aspect-[1.12/1] overflow-hidden bg-surface-container">
                      {pet.mainPhotoUrl ? (
                        <img
                          alt={pet.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          src={pet.mainPhotoUrl}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="material-symbols-outlined text-5xl text-primary/60">
                            pets
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-on-surface">{pet.name}</h3>
                        <span className="text-xs font-bold text-on-surface-variant">
                          {pet.breed}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant">
                        {members.find((member) => member.userId === pet.ownerId)?.userName ||
                          "Участник группы"}
                      </p>
                    </div>
                  </Link>
                ))}

                {!pets.length ? (
                  <div className="rounded-[1.5rem] bg-white p-5 text-sm text-on-surface-variant shadow-sm">
                    Пока участники не добавили публичных карточек питомцев.
                  </div>
                ) : null}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  group
                </span>
                <h2 className="text-2xl font-black text-on-surface">
                  Участники
                </h2>
              </div>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 rounded-[1.25rem] bg-white p-3 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-surface-container">
                      {member.avatarUrl ? (
                        <img
                          alt={member.userName}
                          className="h-full w-full object-cover"
                          src={member.avatarUrl}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-primary">
                          pets
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-on-surface">
                        {member.userName}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {member.district || "Санкт-Петербург"}
                      </p>
                    </div>
                    <Link
                      className="rounded-full bg-surface-container-high px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                      href={`/owners/${member.userId}`}
                    >
                      Профиль
                    </Link>
                  </div>
                ))}

                {!members.length ? (
                  <div className="rounded-[1.25rem] bg-white p-4 text-sm text-on-surface-variant shadow-sm">
                    В группе пока нет участников.
                  </div>
                ) : null}
              </div>
            </section>

            <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  auto_awesome
                </span>
                <h2 className="text-2xl font-black text-on-surface">
                  Атмосфера группы
                </h2>
              </div>
              <p className="rounded-[1.5rem] bg-white p-5 leading-relaxed text-on-surface-variant shadow-sm">
                Эта группа живет в ритме района: здесь договариваются о встречах,
                делятся фото корги и помогают друг другу с маршрутом прогулок,
                ветеринаром и бытовыми находками для хвостиков.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
