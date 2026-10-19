import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seedling — AI automation & free community education",
  description: "Technology and AI automation for businesses, plus free education for our community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
