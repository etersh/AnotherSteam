// src/pages/api/most-played-games.js

import { getCachedData, setCachedData } from "../../utils/cache";

export default async function handler(req, res) {
  try {
    const cacheKey = "mostPlayedGames";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return res.status(200).json({ mostPlayedGames: cachedData });
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch top games");
    }

    const data = await response.json();
    const topGames = data.response.ranks.slice(0, 10);

    const gameDetails = await Promise.all(
      topGames.map(async (game) => {
        try {
          // First API call to get game details
          const detailsRes = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
          );
          if (!detailsRes.ok) {
            throw new Error(`Failed to fetch details for game id: ${game.appid}`);
          }
          const detailsData = await detailsRes.json();
    
          // Second API call to get current number of players
          const playersRes = await fetch(
            `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${game.appid}`
          );
          if (!playersRes.ok) {
            throw new Error(`Failed to fetch player count for game id: ${game.appid}`);
          }
          const playersData = await playersRes.json();
    
          return {
            ...detailsData[game.appid].data,
            rank: game.rank,
            peak: game.peak_in_game,
            currentPlayers: playersData.response.player_count,
          };
        } catch (error) {
          console.error(`Error fetching data for game id: ${game.appid}`, error);
          return null;
        }
      })
    );
    // Filter out any null values from the gameDetails array
    const validGameDetails = gameDetails.filter((game) => game !== null);

    const mostPlayedGames = validGameDetails.map((game) => ({
      id: game.steam_appid,
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || "Not available",
      originalPrice: game.price_overview?.initial_formatted || "Not available",
      isFree: game.is_free,
      discountUntil: "Summer sale",
      rank: game.rank,
      peak: game.peak.toLocaleString('en-US'),
      currentPlayers: game.currentPlayers.toLocaleString('en-US'),
      platforms: {
        windows: game.platforms.windows || False,
        mac: game.platforms.max,
        linux: game.platforms.linux,
      },
    }));

    setCachedData(cacheKey, mostPlayedGames);
    res.status(200).json({ mostPlayedGames });
  } catch (error) {
    console.error("Error fetching top games:", error);
    res.status(500).json({ error: error.message });
  }
}
