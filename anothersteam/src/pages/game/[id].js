import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { viewedAtom } from "@/state/store";

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
            console.log("Using cached data for game");
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
            localStorage.setItem("viewedGames", JSON.stringify(updatedViewed));
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
      <div className="id-container">
        <h2 style={{ margin: "2rem 0 1px 0" }}>{gameInfo.name}</h2>
        <p style={{ color: "var(--text-dim)" }}>{id}</p>
        <div className="id-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "600px", marginRight: "1rem" }}
          >
            <source src={gameInfo.movies[0].webm["480"]} type="video/webm" />
          </video>
          <div className="id-info">
            <img
              src={gameInfo.header_image}
              alt={gameInfo.name}
              style={{ width: "100%" }}
            />
            <p>{gameInfo.short_description}</p>
            {gameInfo.is_free ? (
               <p>FREE </p>
            ) : (
              <p>
                {gameInfo.price_overview?.final_formatted}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
