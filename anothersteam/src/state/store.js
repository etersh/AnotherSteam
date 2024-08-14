// src/state/store.js

import { atom } from "jotai";

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// USER

// Initialize from localStorage if available
export const userTokenAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("userJWT") : null
);
// authentication base on if userJWT is found
export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom));

export const userAtom = atom(
  typeof window !== "undefined" ? localStorage.getItem("userSteamid") : null
);

export const steamUserAtom = atom(
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userSteamData"))
    : null
);
