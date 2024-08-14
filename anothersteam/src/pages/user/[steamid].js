// new userInformation.js
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserInfo from "./userInfo";
import RecentlyPlayedGames from "./recentlyPlayedGames";
import FriendInfo from "./friendInfo";
import ProtectedRoute from "@/components/ProtectedRoute";
import Favorites from "@/components/Favorites";

export default function User() {
	const router = useRouter();
	const { steamid } = router.query;
	const [error, setError] = useState(null);

	if (!steamid) {
		return <p>Loading...</p>;
	}

	return (
		<ProtectedRoute>
			<h1>User steam ID: {steamid}</h1>
			<div>
				<UserInfo />
				<RecentlyPlayedGames />
				<FriendInfo />
				{error ? <p>Error: {error}</p> : <Favorites steamid={steamid} />}
			</div>
		</ProtectedRoute>
	);
}
