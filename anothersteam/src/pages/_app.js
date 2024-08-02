// src/pages/_app.js
import '@/styles/globals.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserInformation from './user/UserInformation';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
