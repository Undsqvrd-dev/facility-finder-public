import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { pageview } from '../lib/gtm';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';
import '../styles/globals.css';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    console.log('✅ _app.tsx wordt uitgevoerd!');
  }

  useEffect(() => {
    // Track page views when route changes
    const handleRouteChange = (url: string) => {
      pageview(url);
      if (window.gtag) {
        window.gtag('config', 'G-481R98VMEP', {
          page_path: url,
          anonymize_ip: true,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-481R98VMEP`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-481R98VMEP', { anonymize_ip: true });
        `}
      </Script>
      <Component {...pageProps} />
      <Toaster />
      <VercelAnalytics />
    </>
  );
} 