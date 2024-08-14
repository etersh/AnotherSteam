// // src/context/AuthContext.js

import React, { createContext, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom, steamUserAtom } from "@/state/store";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [steamUser, setSteamUser] = useAtom(steamUserAtom);

  const [user, setUser] = useAtom(userAtom);
  const [userToken, setUserToken] = useAtom(userTokenAtom);

  useEffect(() => {
    const token = localStorage.getItem("userJWT");
    const steamid = localStorage.getItem("userSteamid");
    const userSteamdata = localStorage.getItem("userSteamData");

    if (token && steamid) {
      setUserToken(token); // Set the userToken with the token from localStorage
      setUser(steamid); // Set the user with the steamid from localStorage
      setSteamUser(userSteamdata);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userToken, steamUser, setUser, setUserToken, setSteamUser }}>
      {children}
    </AuthContext.Provider>
  );
};
