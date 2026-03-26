import { Metadata } from "next";
import { ForumPageClient } from "@/components/forum/ForumPageClient";

export const metadata: Metadata = {
  title: "Форум владельцев корги — Корги СПб",
  description: "Место для общения, обмена опытом и организации прогулок в культурной столице.",
};

export default function ForumPage() {
  return <ForumPageClient />;
}
