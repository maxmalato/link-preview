import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Você pode definir metadados base aqui, que podem ser herdados
// ou sobrescritos pelas páginas.
export const metadata: Metadata = {
  title: "Meu Site Incrível",
  description: "Um site de exemplo para previews de link.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}