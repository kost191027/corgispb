import { getCurrentUserProfile } from "@/actions/auth";
import { Header } from "@/components/shared/Header";

export async function HeaderSession() {
  const user = await getCurrentUserProfile();

  return <Header user={user} />;
}
