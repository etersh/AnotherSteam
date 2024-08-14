// src/state/store.js

import { atom } from 'jotai';

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// // USER
// export const userTokenAtom = atom([]); // not yet decoded token
// export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));

// export const userAtom = atom([]); // stored user steam id

// export const steamUserAtom = atom([]); // steam user object after user fetch data from api using userAtom (user Steam id)

// USER
// export const userTokenAtom = atom(() => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("userJWT") || null; // Initialize from localStorage
//   }
//   return null;
// });

// export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));

// export const userAtom = atom(() => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("userSteamid") || null; // Initialize from localStorage
//   }
//   return null;
// });

// export const steamUserAtom = atom(null); // steam user object, initialized as null

export const userTokenAtom = atom(
    typeof window !== "undefined" ? localStorage.getItem("userJWT") : null
  ); // Initialize from localStorage if available
  
  export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));
  
  export const userAtom = atom(
    typeof window !== "undefined" ? localStorage.getItem("userSteamid") : null
  ); // Initialize from localStorage if available
  
  export const steamUserAtom = atom(null); // Initialize as null