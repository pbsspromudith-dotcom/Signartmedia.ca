import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#eb3b14',
};

export const metadata: Metadata = {
  title: 'Sign Art Media - Billboard Rentals & Outdoor Advertising',
  description:
    'Sign Art Media provides premium static & digital billboard rentals across prime Canadian highway corridors and urban hubs. Explore interactive maps, transparent pricing, 3D billboard preview simulator, and instant online booking.',
  metadataBase: new URL('https://signartmedia.ca'),
  alternates: {
    canonical: 'https://signartmedia.ca/',
  },
  openGraph: {
    title: 'Sign Art Media - Billboard Rentals & Outdoor Advertising',
    description:
      'Sign Art Media provides premium static & digital billboard rentals across prime Canadian highway corridors and urban hubs. Explore interactive maps, transparent pricing, 3D billboard preview simulator, and instant online booking.',
    url: 'https://signartmedia.ca/',
    siteName: 'Sign Art Media',
    images: [
      {
        url: '/assets/aistudio/image_e9fdca64.png',
        width: 1200,
        height: 630,
        alt: 'Sign Art Media Billboard Rentals',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Art Media - Billboard Rentals & Outdoor Advertising',
    description:
      'Sign Art Media provides premium static & digital billboard rentals across prime Canadian highway corridors and urban hubs.',
    images: ['/assets/aistudio/image_e9fdca64.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}>
      <body className="bg-[#f5f2eb] text-[#121212] antialiased selection:bg-[#eb3b14] selection:text-white">
        {children}
      </body>
    </html>
  );
}

