import React from 'react';

const MostPlayedGames = ({ games, error }) => {
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
            <p>Discount Rate: {game.discountRate}%</p>
            <p>Discount Price: {game.discountPrice}</p>
            <p>Original Price: {game.originalPrice}</p>
            <p>Discount Until: {game.discountUntil}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch top 3 game ids
    const res = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch top games');
    }

    const data = await res.json();
    const topGameIds = data.response.ranks
      .slice(0, 3)
      .map((game) => game.appid);

    // Fetch game details
    const gameDetails = await Promise.all(
      topGameIds.map(async (id) => {
        const res = await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${id}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch details for game id: ${id}`);
        }

        const data = await res.json();
        return data[id].data;
      })
    );

    const formattedGames = gameDetails.map((game) => ({
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || 'Not Available',
      originalPrice: game.price_overview?.initial_formatted || 'Not Available',
      discountUntil: 'Not Available',
    }));

    return {
      props: {
        games: formattedGames,
      },
    };
  } catch (err) {
    console.error('Error fetching top 3 most played games:', err);
    return {
      props: {
        games: [],
        error: err.message,
      },
    };
  }
}

export default MostPlayedGames;
