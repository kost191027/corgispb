import { OwnersGalleryClient } from "@/components/owners/OwnersGalleryClient";
import { getOwnerProfiles } from "@/lib/server/owners";

export default async function OwnersPage() {
  const owners = await getOwnerProfiles();

  return <OwnersGalleryClient owners={owners} />;
}
