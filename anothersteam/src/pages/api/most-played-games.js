export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch top games');
    }

    const data = await response.json();
<<<<<<< HEAD
    const topGames = data.response.ranks.slice(0, 10);
    console.log("TOPGAME", topGames)
    const topGameIds = data.response.ranks.slice(0, 10).map((game) => game.appid);
=======
    const topGameIds = data.response.ranks
      .slice(0, 15)
      .map((game) => game.appid);
>>>>>>> d040cd514154c0c8907878b92fdb008306725f5d

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
        // return {
        //   ...data[id].data,
        //   rank: topGames[index].rank, // Access the rank from topGames
        // };  
      })
    );

    const mostPlayedGames = gameDetails.map((game) => ({
      id: game.steam_appid,
      name: game.name,
      rank: topGames.rank,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
<<<<<<< HEAD
      discountPrice: game.price_overview?.final || "Not Available",
      originalPrice: game.price_overview?.initial || "Not Available",
      discountUntil: "Not Available",
=======
      discountPrice: game.price_overview?.final_formatted || 'Not Available',
      originalPrice: game.price_overview?.initial_formatted || 'Not Available',
      discountUntil: 'Not Available',
>>>>>>> d040cd514154c0c8907878b92fdb008306725f5d
    }));

    res.status(200).json({ mostPlayedGames });
  } catch (error) {
    console.error('Error fetching top games:', error);
    res.status(500).json({ error: error.message });
  }
}
