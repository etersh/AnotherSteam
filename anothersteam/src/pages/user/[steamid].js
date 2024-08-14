// src/pages/user/[steamid].js

import React, { useEffect, useState } from "react";
import UserInfo from "./userInfo";
import RecentlyPlayedGames from "./recentlyPlayedGames";
import FriendInfo from "./friendInfo";
import ProtectedRoute from "@/components/ProtectedRoute";
import Favorites from "@/components/Favorites";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/state/store"; // , userTokenAtom

export default function User() {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [hydrated, setHydrated] = useState(false); // State to track hydration

  const [error, setError] = useState(null);

  useEffect(() => {
    setHydrated(true); // Mark as hydrated once the component has mounted
  }, []);

  if (!hydrated) {
    // Avoid rendering anything on the server
    return null;
  }
  if (!isAuthenticated) {
    // return <p>Loading...</p>;
    router.push("/user/login");
  }

  return (
    <ProtectedRoute>
      <div className="user-container">
        <div className="flex flex-col">
          <UserInfo />
          <div className="flex">
          <RecentlyPlayedGames />
          <div className="flex flex-col">
            <FriendInfo />
            {error ? <p>Error: {error}</p> : <Favorites steamid={user} />}
          </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
