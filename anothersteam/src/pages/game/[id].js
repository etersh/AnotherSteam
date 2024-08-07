// src/pages/game/[id].js

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function GameDetail() {
  const [gameInfo, setGameInfo] = useState(null);  // Initialize with null
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/single-game?id=${id}`)  // Pass id to the API call
        .then((res) => {
          if (res.status === 304) {
            console.log("Using cached data for game");
            return res.json();
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setGameInfo(data.singleGame[id].data);  // Adjusted to access the actual game data
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);  // Dependency on id

  if (error) return <div>Error: {error}</div>;
  if (!gameInfo) return <div>Loading...</div>;

  return (
    <>
      <h1>Game: {id}</h1>
      <div>
        <h2>{gameInfo.name}</h2>
        <img src={gameInfo.header_image} alt={gameInfo.name} />
        <p>{gameInfo.short_description}</p>
        <p>Price: {gameInfo.price_overview?.final_formatted || "Not Available"}</p>
      </div>
    </>
  );
}
