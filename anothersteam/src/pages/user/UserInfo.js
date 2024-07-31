import React, { useEffect, useState } from "react";

const UserInfo = () => {
	const [user, setUser] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("/api/user-info")
			.then((res) => res.json())
			.then((data) => {
				if (data.err) {
					throw new Error(data.err);
				}
				setUser(data.userData);
			})
			.catch((err) => setError(err.message));
	}, []);

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
			<div className="user-info">
				<h2>
					{user.name}
					<img src={user.profilePic} style={{ marginLeft: "8px" }} />
				</h2>
				<p>Name: {user.realName}</p>
				<p>Steam ID: {user.steamID}</p>
				<p>
					Country:{" "}
					{user.countryCode !== "Not Available" ? (
						<img
							src={getFlag(user.countryCode)}
							style={{ marginLeft: "8px" }}
						/>
					) : (
						"Not Available"
					)}
				</p>
				<p>City: {user.cityID}</p>
			</div>
		</div>
	);
};

export default UserInfo;
