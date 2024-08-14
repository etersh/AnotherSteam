// new userInformation.js
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import UserInfo from "./userInfo";
// import RecentlyPlayedGames from './recentlyPlayedGames';
// import FriendInfo from './friendInfo';
import ProtectedRoute from "@/components/ProtectedRoute";
// import Favorites from '@/components/Favorites';

import { useAtom } from "jotai";
import { userAtom } from "@/state/store"; // , userTokenAtom

export default function User() {
  const [user] = useAtom(userAtom);
  const [hydrated, setHydrated] = useState(false); // State to track hydration

  useEffect(() => {
    setHydrated(true); // Mark as hydrated once the component has mounted
  }, []);

  if (!hydrated) {
    // Avoid rendering anything on the server
    return null;
  }
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRoute>
      <h1>User steam ID: {user}</h1>
      <div>
        <UserInfo />
        {/* <RecentlyPlayedGames />
        <FriendInfo /> */}
        {/* {error ? (
          <p>Error: {error}</p>
        ) : (
          <Favorites
            steamid={steamid}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )} */}
      </div>
    </ProtectedRoute>
  );
}
