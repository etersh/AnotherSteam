// src/pages/user/[steamid].js
// new userInformation.js

import { useRouter } from 'next/router';

import React from 'react';
import UserInfo from './userInfo';
import RecentlyPlayedGames from './recentlyPlayedGames';
import FriendInfo from './friendInfo';
import ProtectedRoute from '@/components/ProtectedRoute';
import Favorites from '@/components/Favorites';

export default function User() {
  const router = useRouter();
  const { steamid } = router.query;

  if (!steamid) {
    return <p>Loading...</p>;
  }

  //add favorites
  return (
    <ProtectedRoute>
      <h1>User steam ID: {steamid}</h1>
      <div>
        <UserInfo />
        <RecentlyPlayedGames />
        <FriendInfo />
        <Favorites steamid={steamid} />
      </div>
    </ProtectedRoute>
  );
}
