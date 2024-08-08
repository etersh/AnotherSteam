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
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userJWT');
    if (token) {
      // Fetch user data using the token and update the user state
      fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem('userJWT');
          router.push('/user/login');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('userJWT');
        router.push('/user/login');
      });
    }
  }, [setUser, router]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}



// // src/pages/_app.js

// import '@/styles/globals.css';
// import 'slick-carousel/slick/slick.css'; // slick-carousel base styles
// import 'slick-carousel/slick/slick-theme.css'; // slick-carousel theme styles

// import Header from '../components/Header';
// import Footer from '../components/Footer';

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Header />
//       {/* <Navbar /> */}
//       <Component {...pageProps} />
//       <Footer />
//     </>
//   );
// }
