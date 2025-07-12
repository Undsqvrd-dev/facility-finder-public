import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/Favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/logos/Favicon.svg" />

        {/* Open Graph Meta Tags voor betere link sharing */}
        <meta property="og:title" content="Facility Finder - Vind facilitaire organisaties" />
        <meta property="og:description" content="Ontdek facilitaire organisaties via onze interactieve kaart. Handig voor bijbanen, stages en banen in de facilitaire branche." />
        <meta property="og:image" content="https://www.facilityfinder.nl/logos/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.facilityfinder.nl" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Facility Finder - Vind facilitaire organisaties" />
        <meta name="twitter:description" content="Ontdek facilitaire organisaties via onze interactieve kaart. Handig voor bijbanen, stages en banen in de facilitaire branche." />
        <meta name="twitter:image" content="https://www.facilityfinder.nl/logos/preview.png" />

        {/* Additional Meta Tags */}
        <meta name="description" content="Ontdek facilitaire organisaties via onze interactieve kaart. Handig voor bijbanen, stages en banen in de facilitaire branche." />
        <meta name="keywords" content="facility management, facilitaire organisaties, stages, bijbanen, banen, FM" />
        <meta name="author" content="UNDSQVRD" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 