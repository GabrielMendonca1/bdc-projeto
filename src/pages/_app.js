// _app.js
import React from 'react';
import '@/styles/globals.css'; // Keep your global styles import here
import Overlay from '@/components/Overlay';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Overlay />
    </>
  );
}
