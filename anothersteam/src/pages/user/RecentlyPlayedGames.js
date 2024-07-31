import React from 'react';

const RecentlyPlayedGames = ({ playtimeList, games, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="game-list">
        {games.map((game, index) => (
          <div key={index} className="game">
            <h2>{game.name}</h2>
            <img src={game.photo} alt={game.name} />
            <p>Playtime: {game.playtime} hours</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const tempSteamID = '76561198157968527';

    // Fetch recently played games list
    const res = await fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamid=${tempSteamID}&format=json`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch top games');
    }

    const data = await res.json();

    //map playtime for displaying (in return)
    const playtimeList = data.response.games.map(
      (game) => game.playtime_forever || 0
    );

    //map app id for fetching each game's information below
    const gamesIDList = data.response.games.map((game) => game.appid);

    //fetch game information
    const gameInfo = await Promise.all(
      gamesIDList.map(async (id) => {
        const res = await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${id}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch information for game ${id}`);
        }

        const data = await res.json();
        return data[id].data;
      })
    );

    const formattedGames = gameInfo.map((game, index) => ({
      name: game.name,
      photo: game.header_image,
      playtime: (playtimeList[index] / 60).toFixed(2),
    }));

    return {
      props: {
        games: formattedGames,
      },
    };
  } catch (err) {
    console.error('Error fetching recently played games:', err);
    return {
      props: {
        games: [],
        error: err.message,
      },
    };
  }
}

export default RecentlyPlayedGames;
