import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userAtom } from "@/state/store";

const Logout = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    // Check if window object is available, indicating a browser environment
    if (typeof window !== "undefined") {
      // Remove user from local storage
      localStorage.removeItem("userJWT");
      setUser(null); // Reset the user state atom

      // Redirect to login page
      router.push("/");
      console.log("Logged out");
    }
  }, [router, user]);

  return null;
};

export default Logout;

// import { useRouter } from 'next/router';

// const Logout = () => {
//     const Router = useRouter()

//     // remove user from local storage, publish null to user subscribers and redirect to login page
//     localStorage.removeItem('userJWT');
//     userSubject.next(null);
//     Router.push('/login');
//     console.log("Logged out")
//   return
// };

// export default Logout;
