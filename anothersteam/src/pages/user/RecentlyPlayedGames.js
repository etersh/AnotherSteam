import React, { useEffect, useState } from "react";

const RecentlyPlayedGames = () => {
	const [games, setGames] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("/api/recently-played-games")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Error : status ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				if (data.err) {
					throw new Error(data.err);
				}
				setGames(data.formattedGames);
			})
			.catch((err) => setError(err.message));
	}, []);

	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<div className="game-list">
				{games.map((game, index) => (
					<div key={index} className="game">
						<h2>{game.name}</h2>
						<img src={game.photo} alt={game.name} />
						<p>Playtime: {game.playtime} hours</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentlyPlayedGames;
