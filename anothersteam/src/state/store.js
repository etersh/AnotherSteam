// src/state/store.js

import { atom } from 'jotai';

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// // USER
export const userTokenAtom = atom(
    typeof window !== "undefined" ? localStorage.getItem("userJWT") : null
  ); // Initialize from localStorage if available
  
  export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));
  
  export const userAtom = atom(
    typeof window !== "undefined" ? localStorage.getItem("userSteamid") : null
  ); // Initialize from localStorage if available
  
//   export const steamUserAtom = atom(null); // Initialize as null


  export const steamUserAtom = atom(
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userSteamData")) : null


    // const steamUser = JSON.parse(localStorage.getItem("userSteamData"));
  ); // Initialize from localStorage if available