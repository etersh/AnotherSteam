import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { viewedAtom } from '@/state/store';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [gameInfo, setGameInfo] = useState(null);
  const [error, setError] = useState(null);
  const [allViewedGames, setAllViewedGames] = useAtom(viewedAtom);

  useEffect(() => {
    if (id) {
      fetch(`/api/single-game?id=${id}`)
        .then((res) => {
          if (res.status === 304) {
            console.log('Using cached data for game');
            return res.json();
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setGameInfo(data.singleGame[id].data);

          //check if game exists in history already
          const gameIndex = allViewedGames.findIndex((g) => g.id === id);

          if (gameIndex === -1) {
            const newGame = {
              id: id,
              name: data.singleGame[id].data.name,
            };

            const updatedViewed = [...allViewedGames, newGame];
            localStorage.setItem('viewedGames', JSON.stringify(updatedViewed));
            setAllViewedGames(updatedViewed);
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [id, allViewedGames]);

  if (error) return <div>Error: {error}</div>;
  if (!gameInfo) return <div>Loading...</div>;

  return (
    <>
      <h1>Game: {id}</h1>
      <div>
        <h2>{gameInfo.name}</h2>
        <img src={gameInfo.header_image} alt={gameInfo.name} />
        <p>{gameInfo.short_description}</p>
        <p>
          Price: {gameInfo.price_overview?.final_formatted || 'Not Available'}
        </p>
      </div>
    </>
  );
}
