import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';

const proximaNova = localFont({
  src: [
    {
      path: '../../public/fonts/ProximaNova-Reg.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/ProximaNova-Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/ProximaNova-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-proxima-nova'
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
  ],
  icons: {
    icon: [
      {
        url: '/favicon-light.png',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/favicon-dark.png',
        media: '(prefers-color-scheme: light)'
      }
    ]
  }
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

        {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className={`${proximaNova.variable} antialiased`}>
        {children}
        <Toaster toastOptions={{ classNames: { toast: 'custom-toast' } }} visibleToasts={1} />
      </body>
    </html>
  );
}
