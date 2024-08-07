// src/pages/games/trending.js

import React, { useEffect, useState } from 'react';

const TrendingGames = () => {
  const [detailedGames, setDetailedGames] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trending-games')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch trending games');
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

  console.log('(TrendingGames) detailedGames: ', detailedGames);
  return (
    <div>
      <h1>Trending Games (Release Date: {detailedGames.topReleaseDate})</h1>
      <div className="game-list">
        {detailedGames.games.map((game, index) => (
          <div key={index} className="game">
            <h2>{game.name}</h2>
            <img src={game.photo} alt={game.name} />

            <div>
              <p>Discount Rate: {game.discountRate}%</p>
              <p>Discount Price: {game.discountPrice}</p>
              <p>Original Price: {game.originalPrice}</p>
              <p>Discount Until: {game.discountUntil}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;
