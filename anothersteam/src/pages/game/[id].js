import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import {
  favoriteAtom,
  isAuthenticatedAtom,
  viewedAtom,
  userAtom,
} from "@/state/store"; // userAtom

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [allViewedGames, setAllViewedGames] = useAtom(viewedAtom);
  const [gameInfo, setGameInfo] = useState(null);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useAtom(favoriteAtom);
  const [addFavoriteErr, setAddFavoriteErr] = useState(null);
  const [addFavoriteSuccess, setAddFavoriteSuccess] = useState(false);

  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(userAtom);

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

  const addFavorite = async () => {
    if (isAuthenticated) {
      try {
        setAddFavoriteSuccess(false);
        setAddFavoriteErr(null);

        const response = await fetch("/api/user/addFavorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            steamid: user,
            gameId: id,
            gameName: gameInfo.name,
          }),
        });

        if (!response.ok) {
          setAddFavoriteSuccess(false);
          if (response.status === 400) {
            setAddFavoriteErr("Game is already in favorites");
          }
        } else {
          setFavorites([...favorites, id]);
          setAddFavoriteSuccess(true);
        }
      } catch (error) {
        setAddFavoriteErr(error.message);
      }
    }
  };

  if (error) return <div>Error: {addFavoriteErr}</div>;
  if (!gameInfo) return <div>Loading...</div>;

  //for the "Add to Favorites" button, temporarily added another button's css
  const videoUrl = gameInfo.movies[0].webm["480"];

  const secureVideoUrl = videoUrl.replace(/^http:/, 'https:');
  return (
    <>
      <div className="id-container">
        <h2 style={{ margin: "2rem 0 1px 0" }}>{gameInfo.name}</h2>
        <p style={{ color: "var(--text-dim)" }}>{id}</p>
        <div className="id-media">
          {gameInfo.movies[0].webm["480"] ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "600px", marginRight: "1rem" }}
            >
              <source src={secureVideoUrl} type="video/webm" />
            </video>
          ) : (
            <p>Video not available</p>
          )}

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
              <p>{gameInfo.price_overview?.final_formatted}</p>
            )}

            {isAuthenticated ? (
              <>
                <button onClick={addFavorite} className="logout-button">
                  Add to Favorites
                </button>
                {addFavoriteErr && (
                  <p style={{ color: "red" }}>{addFavoriteErr}</p>
                )}
                {addFavoriteSuccess && (
                  <p style={{ color: "green" }}>Game added to favorites!</p>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
