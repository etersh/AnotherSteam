// src/pages/_app.js
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
