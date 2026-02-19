import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { NavBar } from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://avishmaranmusic.com'),
  title: {
    default: 'Avishmaran Pradhan | Composer · Pianist · Creator',
    template: '%s | Avishmaran Pradhan'
  },
  description: 'A cinematic personal music platform featuring compositions, performances, and digital scores.',
  openGraph: {
    title: 'Avishmaran Pradhan',
    description: 'Composer · Pianist · Creator',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bgPrimary text-textPrimary">
        <div className="noise-overlay fixed inset-0 pointer-events-none opacity-40" />
        <NavBar />
        <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 md:px-10">{children}</main>
      </body>
    </html>
  );
}
