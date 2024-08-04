import Pagination from '@/components/Pagination';
import React, { useEffect, useState } from 'react';

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  useEffect(() => {
    fetch('/api/trending-games')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setTrendingGames(data.trendingGames);
      })
      .catch((err) => setError(err.message));
  }, []);

  const lastGameIdx = currentPage * gamesPerPage;
  const firstGameIdx = lastGameIdx - gamesPerPage;
  const currentGames = trendingGames.slice(firstGameIdx, lastGameIdx);
  const totalPages = Math.ceil(trendingGames.length / gamesPerPage);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="game-list">
        {currentGames.map((game, index) => (
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
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default TrendingGames;
