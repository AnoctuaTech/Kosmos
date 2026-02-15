import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kosmos Admin - Panel de Administración",
  description: "Backoffice operativo de Kosmos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
