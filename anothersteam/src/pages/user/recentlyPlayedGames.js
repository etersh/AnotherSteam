// src/pages/user/recentlyPlayedGames.js

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
    <div className="user-info-container">
      <p className="mg-none user-text-minor text-highlight">Recently played</p>{" "}
      <div className="mt-s">
        {games.map((game, index) => (
          <div key={index} className="recently-played">
            <img src={game.photo} alt={game.name} />
            <p className="mt-none ml-s">{game.name}</p>
            <p className="mg-none recently-played-hour">Played {game.playtime} hours</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayedGames;
