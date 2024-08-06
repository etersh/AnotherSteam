import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAtom } from 'jotai';
import { userAtom } from '@/state/store';

const Logout = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    // Check if window object is available, indicating a browser environment
    if (typeof window !== 'undefined') {
      // Remove user from local storage
      localStorage.removeItem('userJWT');
      setUser(null); // Reset the user state atom

      console.log('(/user/logout) Logout successful!');
      console.log('(/user/logout) User: ', user);
      // Redirect to login page
      router.push('/');
    }
  }, [router, user]);

  return null;
};

export default Logout;
