// // // src/context/UserContext.js


// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userToken, setUserToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("userJWT");
//     const steamid = localStorage.getItem("userSteamid");

//     if (token && steamid) {
//       setUserToken(token); // Set the userToken with the token from localStorage
//       setUser(steamid); // Set the user with the steamid from localStorage
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, userToken, setUser, setUserToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };



// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useAtom } from 'jotai';
// // import { useRouter } from 'next/router';

// import { userAtom, steamUserAtom } from '@/state/store'; // userAtom should the DB, steamUser from api call


// const UserContext = createContext();

// export const UserProvider = ({ children }) => {

//   // const router = useRouter();
//   // const { steamid } = router.query;


//   const [user, setUser] = useAtom(userAtom);
//   const [steamUser, setSteamUser] = useAtom(steamUserAtom);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchUserData() {


//       try {
//         const res = await fetch(`/api/user-info?steamid=${user}`);
//         if (!res.ok) {
//           throw new Error('Failed to fetch user information');
//         }
//         const data = await res.json();
//         setSteamUser(data.userData);

//         setError(null);
//         console.log("(UserContext) user info:", data.userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ steamUser, loading, error }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };