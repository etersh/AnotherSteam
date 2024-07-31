import React, { useEffect, useState } from "react";

const MostPlayedGames = () => {
  const [detailedGames, setDetailedGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/most-played-games")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        // Correctly access mostPlayedGames instead of data.response.ranks
        setDetailedGames(data.mostPlayedGames);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="game-list">
      {detailedGames.map((game, index) => (
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
  );
};

export default MostPlayedGames;
