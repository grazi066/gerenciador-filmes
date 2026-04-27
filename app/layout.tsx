import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gerenciador de Filmes',
  description: 'Sua lista pessoal de filmes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <h1 className="text-xl font-bold">🎬 Gerenciador de Filmes</h1>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}