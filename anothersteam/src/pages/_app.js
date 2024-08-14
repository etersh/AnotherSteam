// src/pages/_app.js
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css"; // slick-carousel base styles
import "slick-carousel/slick/slick-theme.css"; // slick-carousel theme styles

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
