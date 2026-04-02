import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentUserProfile } from "@/actions/auth";
import { CommunityGroupPageClient } from "@/components/community/CommunityGroupPageClient";
import { getPublicPets } from "@/lib/server/pets";
import {
  getCommunityGroupById,
  getCommunityGroupMembers,
  getCommunityGroupPosts,
} from "@/lib/server/community-groups";

type CommunityGroupPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: CommunityGroupPageProps): Promise<Metadata> {
  const group = await getCommunityGroupById(params.id);

  if (!group) {
    return {
      title: "Группа не найдена — Корги СПб",
    };
  }

  return {
    title: `${group.name} — Корги СПб`,
    description: group.description,
  };
}

export default async function CommunityGroupPage({
  params,
}: CommunityGroupPageProps) {
  const [group, members, posts, allPets, viewer] = await Promise.all([
    getCommunityGroupById(params.id),
    getCommunityGroupMembers(params.id, 40),
    getCommunityGroupPosts(params.id, 40),
    getPublicPets(300),
    getCurrentUserProfile(),
  ]);

  if (!group) {
    notFound();
  }

  const memberIds = new Set(members.map((member) => member.userId));
  const pets = allPets.filter((pet) => memberIds.has(pet.ownerId)).slice(0, 12);

  return (
    <CommunityGroupPageClient
      group={group}
      initialMembers={members}
      initialPosts={posts}
      pets={pets}
      viewer={
        viewer
          ? {
              id: viewer.$id,
              name: viewer.name,
              avatarUrl: viewer.avatarUrl,
            }
          : null
      }
    />
  );
}
