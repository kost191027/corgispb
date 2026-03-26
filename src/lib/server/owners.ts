import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { getPublicPets } from "@/lib/server/pets";
import type { OwnerProfileRecord } from "@/lib/owners";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const USERS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "users_corgi";

type OwnerDocument = {
  $id: string;
  $createdAt?: string;
  name?: string;
  city?: string;
  district?: string;
  avatar_url?: string;
  bio?: string;
};

export async function getOwnerProfiles(limit = 100): Promise<OwnerProfileRecord[]> {
  try {
    const { databases } = await createAdminClient();
    const [profilesResponse, publicPets] = await Promise.all([
      databases.listDocuments(DB_ID, USERS_COLLECTION, [Query.orderDesc("$createdAt"), Query.limit(limit)]),
      getPublicPets(limit * 4),
    ]);

    const petStats = new Map<string, { count: number; photoUrl?: string }>();

    publicPets.forEach((pet) => {
      const current = petStats.get(pet.ownerId) || { count: 0, photoUrl: undefined };
      petStats.set(pet.ownerId, {
        count: current.count + 1,
        photoUrl: current.photoUrl || pet.mainPhotoUrl || undefined,
      });
    });

    return profilesResponse.documents.map((document) => {
      const profile = document as unknown as OwnerDocument;
      const stats = petStats.get(profile.$id);

      return {
        id: profile.$id,
        createdAt: profile.$createdAt,
        name: String(profile.name || "Участник сообщества"),
        city: profile.city ? String(profile.city) : undefined,
        district: profile.district ? String(profile.district) : undefined,
        avatarUrl: profile.avatar_url ? String(profile.avatar_url) : undefined,
        heroPhotoUrl: profile.avatar_url ? String(profile.avatar_url) : stats?.photoUrl,
        bio: profile.bio ? String(profile.bio) : undefined,
        petCount: stats?.count || 0,
      } satisfies OwnerProfileRecord;
    });
  } catch (error) {
    console.error("Owner profiles load failed", error);
    return [];
  }
}
