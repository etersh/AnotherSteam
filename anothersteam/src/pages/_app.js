// src/pages/_app.js

import "@/styles/globals.css";
import "slick-carousel/slick/slick.css"; // slick-carousel base styles
import "slick-carousel/slick/slick-theme.css"; // slick-carousel theme styles

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userTokenAtom, userAtom } from '@/state/store';

// import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }) {
  const [, setUser] = useAtom(userAtom);
  const [, setUserToken] = useAtom(userTokenAtom);

  useEffect(() => {
    const token = localStorage.getItem('userJWT');
    const steamid = localStorage.getItem('userSteamid');

    if (token) {
      try {
        setUser(steamid); // Set the user atom with the decoded token
        setUserToken(token); // Set the token atom
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        localStorage.removeItem('userJWT'); // Optionally clear invalid token
        localStorage.removeItem('userSteamid'); // Optionally clear invalid steamid
      }
    } else if (steamid) {
      setUser({ steamid }); // If only steamid is available, store it
    }
  }, [setUser, setUserToken]);

  return (
    // <UserProvider>
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
    // </UserProvider>
  );
}
