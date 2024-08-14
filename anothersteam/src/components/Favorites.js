import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { favoriteAtom } from "@/state/store";
import { useRouter } from "next/router";

const Favorites = ({ steamid }) => {
  const [favorites, setFavorites] = useAtom(favoriteAtom);
  const [gamesDetails, setGamesDetails] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!Array.isArray(favorites) || favorites.length === 0) {
        try {
          const response = await fetch(
            `/api/user/favorites?steamid=${steamid}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchFavorites();
  }, [steamid, setFavorites]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const details = await Promise.all(
          favorites.map(async (gameId) => {
            const response = await fetch(`/api/single-game?id=${gameId}`);
            if (!response.ok) {
              throw new Error(`Error fetching game details for ID: ${gameId}`);
            }
            const data = await response.json();
            return {
              id: gameId,
              name: data.singleGame[gameId].data.name,
            };
          })
        );
        setGamesDetails(details);
      } catch (err) {
        setError(err.message);
      }
    };

    if (favorites.length > 0) {
      fetchGameDetails();
    }
  }, [favorites]);

  const removeFavorite = async (gameId) => {
    try {
      const response = await fetch("/api/user/removeFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          steamid: steamid,
          gameId: gameId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      } else {
        setFavorites(favorites.filter((game) => game !== gameId));
        setGamesDetails(gamesDetails.filter((game) => game.id !== gameId));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGameClick = (gameId) => {
    router.push(`/game/${gameId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p className="mg-none user-text-minor text-highlight">Favorites</p>
      {gamesDetails.length === 0 ? (
        <p>No favorite games found.</p>
      ) : (
        <ul>
          {gamesDetails.map((game) => (
            <li key={game.id}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleGameClick(game.id)}
              >
                {game.name} (ID: {game.id}){" "}
              </span>{" "}
              <button onClick={() => removeFavorite(game.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
