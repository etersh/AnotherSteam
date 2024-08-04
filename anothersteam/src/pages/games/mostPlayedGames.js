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
        setDetailedGames(data.mostPlayedGames);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  console.log("(MostPlayedGames) detailedGames: ", detailedGames);
  return (
    <div>
      <div className="game-list">
        {detailedGames.map((game, index) => (
          <div key={index} className="game">
            <h2>{game.name}</h2>
            <img src={game.photo} alt={game.name} />
            <p>Rank: {game.rank}</p> {/* Displaying the rank */}
            <p>Peak Players: {game.peak}</p> {/* Displaying the peak players */}
            <div>
              {game.isFree ? (
                <p>FREE</p>
              ) : (
                <>
                  <p>Discount Rate: {game.discountRate}%</p>
                  <p>Discount Price: {game.discountPrice}</p>
                  <p>Original Price: {game.originalPrice}</p>
                  <p>Discount Until: {game.discountUntil}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPlayedGames;
