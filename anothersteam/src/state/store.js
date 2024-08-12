import { atom } from 'jotai';

// VIEWED HISTORY (TOGGLE)
export const recentlyViewedAtom = atom([]);
export const viewedAtom = atom([]);

// FAVOURITE LIST
export const favoriteAtom = atom([]);

// USER
export const userAtom = atom([]);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
