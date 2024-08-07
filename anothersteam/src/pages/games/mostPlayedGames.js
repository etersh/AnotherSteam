// src/pages/games/mostPlayedGames.js

import React, { useEffect, useState } from "react";
import { CommonButton } from "@/components/Button";
import Link from "next/link";


const MostPlayedGames = () => {
  const [detailedGames, setDetailedGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/most-played-games")
      .then((res) => {
        if (res.status === 304) {
          console.log("Using cached data for most played games");
          return res.json();
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setDetailedGames(data.mostPlayedGames);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  console.log("(MostPlayedGames) detailedGames: ", detailedGames);
  return (
    <div className="longcard-container">
      <h3>Most Played Games</h3>

      {detailedGames.map((game, index) => (
        <div key={index} className="longcard">
          <div className="longcard-tag">
            <p className="text-dim text-smaller align-self-center">{game.rank}</p>
            <img src={game.photo} alt={game.name} />
            <h4>{game.name}</h4>
          </div>
          <div className="flex gap-l">
          <div className="flex flex-col gap-xs align-self-center">
              <p className="text-dim text-smaller">PLAYERS NOW</p>
              <p className="text-smaller">{game.currentPlayers}</p>
            </div>
            <div className="flex flex-col gap-xs align-self-center">
              <p className="text-dim text-smaller">24H PEAK</p>
              <p className="text-smaller">{game.peak}</p>
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

export default MostPlayedGames;
