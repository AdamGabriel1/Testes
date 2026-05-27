import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'eSports Manager - Next.js',
  description: 'Gerenciador de eSports com Next.js + Prisma + SQLite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
