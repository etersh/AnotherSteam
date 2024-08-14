import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { favoriteAtom } from "@/state/store";

const Favorites = ({ steamid }) => {
	const [favorites, setFavorites] = useAtom(favoriteAtom);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFavorites = async () => {
			if (!Array.isArray(favorites) || favorites.length === 0) {
				try {
					const response = await fetch(
						`/api/user/favorites?steamid=${steamid}`
					);
					if (!response.ok) {
						throw new Error(`Error: ${response.status}`);
					}
					const data = await response.json();
					setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
				} catch (err) {
					setError(err.message);
				}
			}
		};

		fetchFavorites();
	}, [steamid, setFavorites]);

	const removeFavorite = async (gameId) => {
		try {
			const response = await fetch("/api/user/removeFavorite", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					steamid: steamid,
					gameId: gameId,
				}),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			} else {
				setFavorites(favorites.filter((game) => game !== gameId)); //added
			}
		} catch (err) {
			setError(err.message);
		}
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h2>Favorite Games</h2>
			{favorites.length === 0 ? (
				<p>No favorite games found.</p>
			) : (
				<ul>
					{favorites.map((game, index) => (
						<li key={index}>
							{game} <button onClick={() => removeFavorite(game)}>❌</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Favorites;
