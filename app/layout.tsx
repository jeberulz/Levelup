import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LevelUp App',
  description: 'LevelUp App - Financial education gamified',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

