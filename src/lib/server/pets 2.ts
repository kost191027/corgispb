import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { mapPetDocument, type PetDocument, type PetRecord } from "@/lib/pets";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || "corgi_db";
const PETS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_PETS_COLLECTION || "pets_corgi";

export async function getPetsByUser(userId: string): Promise<PetRecord[]> {
  const { databases } = await createAdminClient();
  const response = await databases.listDocuments(DB_ID, PETS_COLLECTION, [
    Query.equal("user_id", userId),
    Query.orderDesc("$createdAt"),
    Query.limit(100),
  ]);

  return response.documents.map((document) => mapPetDocument(document as unknown as PetDocument));
}

export async function getPublicPets(limit = 100): Promise<PetRecord[]> {
  const { databases } = await createAdminClient();
  const response = await databases.listDocuments(DB_ID, PETS_COLLECTION, [
    Query.orderDesc("$createdAt"),
    Query.limit(limit),
  ]);

  return response.documents
    .map((document) => mapPetDocument(document as unknown as PetDocument))
    .filter((pet) => pet.isPublic);
}

export async function getPetById(id: string): Promise<PetRecord | null> {
  try {
    const { databases } = await createAdminClient();
    const document = await databases.getDocument(DB_ID, PETS_COLLECTION, id);
    const pet = mapPetDocument(document as unknown as PetDocument);
    return pet.isPublic ? pet : null;
  } catch {
    return null;
  }
}
