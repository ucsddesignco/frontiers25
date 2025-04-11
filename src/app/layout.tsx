import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
  description: `Design Frontiers is Design Co's very own long day sprint, where student teams of all backgrounds come together to create innovative solutions for real-world problems.`,
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
