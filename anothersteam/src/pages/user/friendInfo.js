// src/pages/user/friendInfo.js

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const FriendInfo = () => {
	const [friends, setFriends] = useState([]);
	const [error, setError] = useState(null);

	const router = useRouter();
	const { steamid } = router.query;

	useEffect(() => {
		if (steamid) {
			fetch(`/api/friend-info?steamid=${steamid}`)
		// fetch("/api/friend-info")
			.then((res) => res.json())
			.then((data) => {
				if (data.err) {
					throw new Error(data.err);
				}
				setFriends(data.friendInfo);
			})
			.catch((err) => setError(err.message));
		}
	}, [steamid]);

	if (error) return <div>Error: {error}</div>;

	const getFlag = (countryCode) => {
		return countryCode !== "Not Available"
			? `https://flagsapi.com/${countryCode}/flat/32.png`
			: null;
	};
	//theme:flat/shiny supported
	//size:16/24/32/48/64px supported

	return (
		<div>
			{friends.map((friend, index) => (
				<div key={index} className="friend-info">
					<h3>
						{friend.name}
						<img src={friend.profilePic} style={{ marginLeft: "8px" }} />
					</h3>
					{friend.steamID}
					<p>
						Friend Since:{" "}
						{new Date(friend.friendSince * 1000).toLocaleDateString("en-GB")}
					</p>
		
					<p>
						Country:{" "}
						{friend.countryCode !== "Not Available" ? (
							<img
								src={getFlag(friend.countryCode)}
								style={{ marginLeft: "8px" }}
							/>
						) : (
							"Not Available"
						)}
					</p>
				</div>
			))}
		</div>
	);
};

export default FriendInfo;
