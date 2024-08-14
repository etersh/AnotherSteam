// new userInformation.js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserInfo from './userInfo';
// import RecentlyPlayedGames from './recentlyPlayedGames';
// import FriendInfo from './friendInfo';
import ProtectedRoute from '@/components/ProtectedRoute';
// import Favorites from '@/components/Favorites';

import { useAtom } from "jotai";
import { userAtom } from "@/state/store"; // , userTokenAtom

export default function User() {
  // const router = useRouter();
  // const { steamid } = router.query;
  // const [favorites, setFavorites] = useState([]);
  // const [error, setError] = useState(null);

const [user] = useAtom(userAtom)

  // useEffect(() => {
  //   if (steamid) {
  //     const fetchFavorites = async () => {
  //       try {
  //         const response = await fetch(
  //           `/api/user/favorites?steamid=${steamid}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`Error: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
  //       } catch (err) {
  //         setError(err.message);
  //       }
  //     };

  //     fetchFavorites();
  //   }
  // }, [steamid]);

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
