import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css'; // slick-carousel base styles
import 'slick-carousel/slick/slick-theme.css'; // slick-carousel theme styles

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '@/state/store';

export default function App({ Component, pageProps }) {


  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
