import React, { useEffect, useState } from 'react';
import fetchGames from '@/utils/fetchGames';

const MostPlayedGames = () => {
  const [topGames, setTopGames] = useState([]);
  const [detailedGames, setDetailedGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/most-played-games')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const gameIds = data.response.ranks.map((game) => game.appid);
        setTopGames(gameIds);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (topGames.length > 0) {
      fetchGames(topGames)
        .then((data) => setDetailedGames(data.props.games))
        .catch((err) => setError(err.message));
    }
  }, [topGames]);

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



// export async function fetchGames(topGames){
//     try {
// 	  // Fetch game details
// 	  const gameDetails = await Promise.all(
// 		topGames.map(async (id) => {
// 		  const res = await fetch(
// 			`https://store.steampowered.com/api/appdetails?appids=${id}`
// 		  );
  
// 		  if (!res.ok) {
// 			throw new Error(`Failed to fetch details for game id: ${id}`);
// 		  }
  
// 		  const data = await res.json();
// 		  return data[id].data;
// 		})
// 	  );
  
// 	  const formattedGames = gameDetails.map((game) => ({
// 		name: game.name,
// 		photo: game.header_image,
// 		discountRate: game.price_overview?.discount_percent || 0,
// 		discountPrice: game.price_overview?.final_formatted || "Not Available",
// 		originalPrice: game.price_overview?.initial_formatted || "Not Available",
// 		discountUntil: "Not Available",
// 	  }));
  
// 	  return {
// 		props: {
// 			games: formattedGames,
// 		},
// 	  };
// 	} catch (err) {
// 	  console.error("(MostPlayedGames) Error fetching most played games:", err);
// 	  return {
// 		props: {
// 		  games: [],
// 		  error: err.message,
// 		},
// 	  };
// 	}
//   }