import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import type { CommunityGroup } from "@/lib/community-groups";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const COMMUNITY_GROUPS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUPS_COLLECTION ||
  "community_groups_corgi";
const COMMUNITY_GROUP_MEMBERS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUP_MEMBERS_COLLECTION ||
  "community_group_members_corgi";
const COMMUNITY_GROUP_POSTS_COLLECTION =
  process.env.NEXT_PUBLIC_APPWRITE_COMMUNITY_GROUP_POSTS_COLLECTION ||
  "community_group_posts_corgi";

type CommunityGroupDocument = {
  $id: string;
  $createdAt?: string;
  name?: string;
  district?: string;
  today_topic?: string;
  description?: string;
  image_url?: string;
  author_id?: string;
  author_name?: string;
};

type CommunityGroupMemberDocument = {
  $id: string;
  $createdAt?: string;
  group_id?: string;
  user_id?: string;
  user_name?: string;
  avatar_url?: string;
  district?: string;
};

type CommunityGroupPostDocument = {
  $id: string;
  $createdAt?: string;
  group_id?: string;
  user_id?: string;
  author_name?: string;
  author_avatar_url?: string;
  content?: string;
};

export type CommunityGroupMember = {
  id: string;
  joinedAt?: string;
  groupId: string;
  userId: string;
  userName: string;
  avatarUrl?: string;
  district?: string;
};

export type CommunityGroupPost = {
  id: string;
  createdAt?: string;
  groupId: string;
  userId: string;
  authorName: string;
  authorAvatarUrl?: string;
  content: string;
};

function mapCommunityGroup(
  document: CommunityGroupDocument,
  membersCount = 0,
): CommunityGroup {
  return {
    id: document.$id,
    name: String(document.name || "Новая группа"),
    district: String(document.district || "Санкт-Петербург"),
    todayTopic: String(document.today_topic || "Обсуждаем районные новости"),
    description: String(document.description || ""),
    imageUrl: document.image_url ? String(document.image_url) : undefined,
    membersCount,
    source: "community",
    authorId: document.author_id ? String(document.author_id) : undefined,
    authorName: document.author_name ? String(document.author_name) : undefined,
    createdAt: document.$createdAt,
  };
}

function mapCommunityGroupMember(
  document: CommunityGroupMemberDocument,
): CommunityGroupMember {
  return {
    id: document.$id,
    joinedAt: document.$createdAt,
    groupId: String(document.group_id || ""),
    userId: String(document.user_id || ""),
    userName: String(document.user_name || "Участник сообщества"),
    avatarUrl: document.avatar_url ? String(document.avatar_url) : undefined,
    district: document.district ? String(document.district) : undefined,
  };
}

function mapCommunityGroupPost(
  document: CommunityGroupPostDocument,
): CommunityGroupPost {
  return {
    id: document.$id,
    createdAt: document.$createdAt,
    groupId: String(document.group_id || ""),
    userId: String(document.user_id || ""),
    authorName: String(document.author_name || "Участник сообщества"),
    authorAvatarUrl: document.author_avatar_url
      ? String(document.author_avatar_url)
      : undefined,
    content: String(document.content || ""),
  };
}

export async function listCommunityGroups(): Promise<CommunityGroup[]> {
  try {
    const { databases } = await createAdminClient();
    const [groupsResponse, membersResponse] = await Promise.all([
      databases.listDocuments(DB_ID, COMMUNITY_GROUPS_COLLECTION, [
        Query.orderDesc("$createdAt"),
        Query.limit(200),
      ]),
      databases
        .listDocuments(DB_ID, COMMUNITY_GROUP_MEMBERS_COLLECTION, [
          Query.limit(500),
        ])
        .catch(() => ({ documents: [] })),
    ]);

    const membersCountByGroup = new Map<string, number>();

    (
      membersResponse.documents as unknown as CommunityGroupMemberDocument[]
    ).forEach((member) => {
      const groupId = String(member.group_id || "").trim();

      if (!groupId) {
        return;
      }

      membersCountByGroup.set(groupId, (membersCountByGroup.get(groupId) || 0) + 1);
    });

    return (
      groupsResponse.documents as unknown as CommunityGroupDocument[]
    ).map((document) =>
      mapCommunityGroup(document, membersCountByGroup.get(document.$id) || 0),
    );
  } catch (error) {
    console.error("Community groups list failed", error);
    return [];
  }
}

export async function getCommunityGroupById(
  id: string,
): Promise<CommunityGroup | null> {
  try {
    const { databases } = await createAdminClient();
    const [groupDocument, membersResponse] = await Promise.all([
      databases.getDocument(DB_ID, COMMUNITY_GROUPS_COLLECTION, id),
      databases
        .listDocuments(DB_ID, COMMUNITY_GROUP_MEMBERS_COLLECTION, [
          Query.equal("group_id", id),
          Query.limit(1),
        ])
        .catch(() => ({ total: 0 })),
    ]);

    return mapCommunityGroup(
      groupDocument as unknown as CommunityGroupDocument,
      typeof membersResponse.total === "number" ? membersResponse.total : 0,
    );
  } catch {
    return null;
  }
}

export async function getCommunityGroupMembers(
  groupId: string,
  limit = 60,
): Promise<CommunityGroupMember[]> {
  try {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(
      DB_ID,
      COMMUNITY_GROUP_MEMBERS_COLLECTION,
      [Query.equal("group_id", groupId), Query.orderDesc("$createdAt"), Query.limit(limit)],
    );

    return (
      response.documents as unknown as CommunityGroupMemberDocument[]
    ).map(mapCommunityGroupMember);
  } catch (error) {
    console.error("Community group members load failed", error);
    return [];
  }
}

export async function getCommunityGroupPosts(
  groupId: string,
  limit = 50,
): Promise<CommunityGroupPost[]> {
  try {
    const { databases } = await createAdminClient();
    const response = await databases.listDocuments(
      DB_ID,
      COMMUNITY_GROUP_POSTS_COLLECTION,
      [Query.equal("group_id", groupId), Query.orderDesc("$createdAt"), Query.limit(limit)],
    );

    return (
      response.documents as unknown as CommunityGroupPostDocument[]
    ).map(mapCommunityGroupPost);
  } catch (error) {
    console.error("Community group posts load failed", error);
    return [];
  }
}
