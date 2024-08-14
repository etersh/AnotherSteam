import { atom } from 'jotai';

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// USER
export const userTokenAtom = atom([]); // store JWT: decode to get steamid
export const isAuthenticatedAtom = atom((get) => !!get(userTokenAtom)); // If user have token

export const userAtom = atom([]); // WE SHOULD STORE STEAM ID HERE instead of DB info

export const steamUserAtom = atom([]);