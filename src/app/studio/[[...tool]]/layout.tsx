import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "LONM DECOR — Painel Administrativo",
  robots: { index: false, follow: false }, // ocultar do Google
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
