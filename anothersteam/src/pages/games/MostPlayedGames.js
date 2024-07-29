import React, { useEffect, useState } from "react";

const MostPlayedGames = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		async function fetchTopGames() {
			try {
				//fetch top 3 game ids
				// const res = await fetch(
				// 	// `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?access_token=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}`
				// 	`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?access_token=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}`
				// );
				const res = await fetch(
					`http://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`,
					{ mode: "no-cors" }
				);
				const data = await res.json();

				const topGameIds = data.response.ranks
					.slice(0, 3)
					.map((game) => game.appid);

				//fetch details
				const gameDetails = await Promise.all(
					topGameIds.map(async (id) => {
						const res = await fetch(`api/appdetails?appids=${id}`);
						const data = await res.json();
						return data[id].data;
					})
				);

				//set game details to state
				const formattedGames = gameDetails.map((game) => ({
					name: game.name,
					photo: game.header_image,
					discountRate: game.price_overview?.discount_percent || 0,
					discountPrice:
						game.price_overview?.final_formatted || "Not Available",
					originalPrice:
						game.price_overview?.initial_formatted || "Not Available",
					discountUntil: "Not Available",
				}));

				setGames(formattedGames);
			} catch (err) {
				console.error("Error fetching top 3 most played games:", err);
			}
		}
		fetchTopGames();
	}, []);

	return (
		<div>
			<div className="game-list">
				{games.map((game, index) => (
					<div key={index} className="game">
						<h2>{game.name}</h2>
						<img src={game.photo} alt={game.name} />
						<p>Discount Rate: {game.discountRate}%</p>
						<p>Discount Price: {game.discountPrice}</p>
						<p>Original Price: {game.originalPrice}</p>
						<p>Discount Until: {game.discountUntil}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MostPlayedGames;
MostPlayedGames.js;
