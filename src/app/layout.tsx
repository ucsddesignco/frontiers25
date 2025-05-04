import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Design Frontiers 2025: UCSD Design Co',
  description: `Design Frontiers is a day-long designathon where student teams compete to create authentic, innovative, and empathetic designs.`,
  keywords: 'Design Co, UCSD, Designathon, Design Frontiers 2025, Design Frontiers',
  authors: [
    { name: 'Aaron Chan' },
    { name: 'Edward New' },
    { name: 'Sahil Gathe' },
    { name: 'Victor Hsiao' }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster toastOptions={{ classNames: { toast: 'custom-toast' } }} visibleToasts={1} />
      </body>
    </html>
  );
}
