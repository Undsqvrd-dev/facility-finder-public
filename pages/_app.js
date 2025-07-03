import '../styles/globals.css';
import { useEffect } from 'react';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    console.log('✅ /pages/_app.js wordt uitgevoerd!');
  }

  useEffect(() => {
    // Force a repaint to ensure styles are applied
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  }, []);

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
      <VercelAnalytics />
    </>
  );
}

export default MyApp;