import '@/styles/globals.css';
import Header from '../components/Header';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
<<<<<<< HEAD
=======
// import UserInformation from './user/UserInformation';
>>>>>>> nc-mostPlayedGames-render

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
