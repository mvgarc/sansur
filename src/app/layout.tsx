import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "San Sur — Condominio",
  description: "Sistema de administración de pagos del Condominio San Sur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white font-sans text-base text-sansur-ink">
        {children}
      </body>
    </html>
  );
}
