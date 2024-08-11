const { useState, useEffect } = require('react');
import { useAtom } from 'jotai';
const { favoriteAtom } = require('@/state/store');

const Favorites = ({ steamid }) => {
  const [favorites, setFavorites] = useAtom(favoriteAtom);
  const [error, setError] = useState(null);

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
  }, [steamid]); //CHECK DEPENDENCY setFavorites?

  const removeFavorite = async (gameId) => {
    try {
      const response = await fetch('/api/user/removeFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          steamid: steamid,
          gameId: gameId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      //update the favorites list after successful removal
      setFavorites(favorites.filter((game) => game !== gameId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Favorite Games</h2>
      {favorites.length === 0 ? (
        <p>No favorite games found.</p>
      ) : (
        <ul>
          {favorites.map((game, index) => (
            <li key={index}>
              {game}{' '}
              <button onClick={() => removeFavorite(game)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
