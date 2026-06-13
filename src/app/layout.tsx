import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PWARegistrar } from '@/components/pwa-registrar';

export const metadata: Metadata = {
  title: 'घरेलू उपाय केयर | Gharelu Upay Care',
  description: 'Ayurvedic traditional home remedies for a healthy life.',
  manifest: '/manifest.json',
  applicationName: 'Gharelu Upay Care',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'घरेलू उपाय',
  },
  icons: {
    apple: '/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="MVboRUnfOsCahICx3pIfAyiQckT1iDnl38k-OgYpVFo" />
        
        {/* PWA Recognition Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Gharelu Upay Care" />
        
        {/* Fonts and Other Head Elements */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <FirebaseClientProvider>
          <PWARegistrar />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
