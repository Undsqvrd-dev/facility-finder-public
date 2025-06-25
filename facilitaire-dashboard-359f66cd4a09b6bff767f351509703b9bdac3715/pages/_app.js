import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Force a repaint to ensure styles are applied
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;