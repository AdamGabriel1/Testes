import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eSports Manager",
  description: "Gerenciamento de estatísticas de eSports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-900 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
