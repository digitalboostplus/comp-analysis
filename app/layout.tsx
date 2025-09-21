import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Intelligence Lab",
  description:
    "An interactive SEO command center that crafts technical, content, and authority roadmaps from your competitor landscape."
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-thin">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e3a8a33,transparent_45%),radial-gradient(circle_at_bottom,#0f766e26,transparent_45%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
