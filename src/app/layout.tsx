import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://df25.ucsddesign.co/'),
  title: 'Design Frontiers 2025: UCSD Design Co',
  description: `Design Frontiers is Design Co's annual designathon—a two-day sprint where teams tackle real-world challenges with creative design solutions.`,
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
      <GoogleAnalytics gaId="G-YFF64V3JQF" />
      <head>
        <meta name="theme-color" content="#000"></meta>
        <link
          rel="icon"
          href="favicon-light.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        ></link>
        <link
          rel="icon"
          href="favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: light)"
        ></link>
        {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster toastOptions={{ classNames: { toast: 'custom-toast' } }} visibleToasts={1} />
      </body>
    </html>
  );
}
