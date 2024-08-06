import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RecentlyPlayedGames = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { steamid } = router.query;

  useEffect(() => {
    if (steamid) {
      fetch(`/api/recently-played-games?steamid=${steamid}`)
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
    }
  }, [steamid]);

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
