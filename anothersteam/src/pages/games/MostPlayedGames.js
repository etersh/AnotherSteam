<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import LongCard from "@/components/Card/LongCard";
=======
import Pagination from '@/components/Pagination';
import React, { useEffect, useState } from 'react';
>>>>>>> d040cd514154c0c8907878b92fdb008306725f5d

const MostPlayedGames = () => {
  const [topGames, setTopGames] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  useEffect(() => {
    fetch('/api/most-played-games')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
<<<<<<< HEAD
        // Correctly access mostPlayedGames instead of data.response.ranks
        setTopGames(data.mostPlayedGames);
=======
        setDetailedGames(data.mostPlayedGames);
>>>>>>> d040cd514154c0c8907878b92fdb008306725f5d
      })
      .catch((err) => setError(err.message));
  }, []);

  const lastGameIdx = currentPage * gamesPerPage;
  const firstGameIdx = lastGameIdx - gamesPerPage;
  const currentGames = detailedGames.slice(firstGameIdx, lastGameIdx);
  const totalPages = Math.ceil(detailedGames.length / gamesPerPage);

  if (error) return <div>Error: {error}</div>;

  return (
<<<<<<< HEAD

    <LongCard games={topGames}/>
=======
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
>>>>>>> d040cd514154c0c8907878b92fdb008306725f5d
  );
};

export default MostPlayedGames;
