import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getCurrentUser } from "@/actions/auth";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Корги СПб — Главное сообщество любителей корги",
  description: "Встречи, советы ветеринаров, карта прогулок и проверенные заводчики корги в Петербурге.",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="ru">
      <body className="antialiased bg-surface text-on-surface min-h-screen flex flex-col relative">
        <QueryProvider>
          <Header user={user} />
          <main className="flex-1 flex flex-col relative z-0">
            {children}
          </main>
          {modal}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
