// src/pages/games/trending.js

import React, { useEffect, useState } from "react";
import { CommonButton } from "@/components/Button";
import Link from "next/link";

const TrendingGames = () => {
  const [detailedGames, setDetailedGames] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trending-games")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch trending games");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setDetailedGames(data.trendingGames);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!detailedGames || !detailedGames.games) return <div>No games found.</div>;

  console.log("(TrendingGames) detailedGames: ", detailedGames);
  return (
    <div className="longcard-container">
      <h3>Trending Games</h3>

      {detailedGames.games.map((game, index) => (
        <div key={index} className="longcard">
          <div className="longcard-tag">
            <p className="text-dim text-smaller align-self-center">
              {index + 1}
            </p>
            <img src={game.photo} alt={game.name} />
            <h4>{game.name}</h4>
          </div>
          <div className="flex gap-l">
            <div className="flex flex-col gap-xs align-self-center">
              <p className="text-dim text-smaller">PLAYERS NOW</p>
              <p className="text-smaller">{game.currentPlayers}</p>
            </div>
            <Link href={`/game/${game.id}`} className="align-self-center">
              <CommonButton name="Browse" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingGames;
