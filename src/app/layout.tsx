import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "StoryForge — Histoires Thriller, Drama & Relations Toxiques",
  description:
    "Plongez dans des histoires captivantes générées chaque jour : thrillers psychologiques, drames intenses et relations toxiques.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://storyforge.app"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
