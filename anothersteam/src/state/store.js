// src/state/store.js

import { atom } from "jotai";

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// USER

// Initialize from localStorage if available
export const userTokenAtom = atom( // storing user token (undecoded)
  typeof window !== "undefined" ? localStorage.getItem("userJWT") : null
);
// authentication base on if userJWT is found
export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));

export const userAtom = atom( // storing user steam id after retrieving it from Database
  typeof window !== "undefined" ? localStorage.getItem("userSteamid") : null
);

export const steamUserAtom = atom( // storing whole user steam data after API call
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userSteamData"))
    : null
);
