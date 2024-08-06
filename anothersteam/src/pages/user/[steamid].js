// src/pages/user/[steamid].js
// new userInformation.js

import { useRouter } from "next/router";

import React from "react";
import UserInfo from "./userInfo";
import RecentlyPlayedGames from "./recentlyPlayedGames";
import FriendInfo from "./friendInfo";

export default function User() {
  const router = useRouter();
  const { steamid } = router.query;

  if (!steamid) {
    return(
      <p>Loading...</p>
  )}

  return (
    <>
      <h1>User steam ID: {steamid}</h1>
      <div>
        <UserInfo />
        <RecentlyPlayedGames />
        <FriendInfo />
      </div>
    </>
  );
}
