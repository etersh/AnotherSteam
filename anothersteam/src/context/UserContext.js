// src/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

import { useAtom } from 'jotai';
import { userAtom, steamUserAtom } from '@/state/store';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [steamUser, setSteamUser] = useAtom(steamUserAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user || !user.steamid) {
        // If there's no user or steamid, reset the user state and stop loading
        // setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/user-info?steamid=${user.steamid}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await res.json();
        setSteamUser(data.userData);
        setError(null);
        console.log("(UserContext) user info:", data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, setUser]);

  return (
    <UserContext.Provider value={{ user: steamUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};