export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch top games");
    }

    const data = await response.json();
    const topGames = data.response.ranks.slice(0, 16);

    const gameDetails = await Promise.all(
      topGames.map(async (game) => {
        const res = await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch details for game id: ${game.appid}`);
        }
        const data = await res.json();
        return {
          ...data[game.appid].data,
          rank: game.rank,
          peak: game.peak_in_game,
        };
      })
    );

    const mostPlayedGames = gameDetails.map((game) => ({
      id: game.steam_appid,
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || "Not available",
      originalPrice: game.price_overview?.initial_formatted || "Not available",
      isFree: game.is_free,
      discountUntil: "Summer sale",
      rank: game.rank,
      peak: game.peak,
    }));

    console.log("(api most-played-games) mostPlayedGames:", mostPlayedGames);

    res.status(200).json({ mostPlayedGames });
  } catch (error) {
    console.error("Error fetching top games:", error);
    res.status(500).json({ error: error.message });
  }
}
