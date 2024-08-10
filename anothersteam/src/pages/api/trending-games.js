// src/pages/api/trending-games.js

import { getCachedData, setCachedData } from "@/utils/cache";

export default async function handler(req, res) {
  try {
    const cacheKey = "trendingGames";
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return res.status(200).json({ trendingGames: cachedData });
    }

    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch trending games");
    }

    //1. pages (recent 3 months) array
    //2. they have a page name (pages.name)
    //ex. Top Releases of April
    //3. they have an array of the top items(games) each page
    //ex. items_ids : {appid: 1492070}, {appid: 2446550} ...

    const data = await response.json();

    const topReleaseDate = data.response.pages[0].name;

    const mostRecentMonthPage = data.response.pages[0];
    const appIds = mostRecentMonthPage.item_ids
      .slice(0, 10)
      .map((item) => item.appid);

    const gameDetails = await Promise.all(
      appIds.map(async (id) => {
        try {
          const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}&cc=ca`
          );
          if (res.status === 403) {
            console.warn(
              `Access forbidden for game id: ${id} with status ${res.status}`
            );
            return null;
          }
          if (!res.ok) {
            console.warn(
              `Failed to fetch details for game id: ${id} with status ${res.status}`
            );
            return null;
          }
          const details = await res.json();
          if (!details[id] || !details[id].data) {
            console.warn(`No data found for game id: ${id}`);
            return null;
          }

          // Second API call to get current number of players
          const playersRes = await fetch(
            `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${id}`
          );
          if (!playersRes.ok) {
            console.warn(`Failed to fetch player count for game id: ${id}`);
            return {
              ...details[id].data,
              currentPlayers: "Not Available",
            };
          }
          const playersData = await playersRes.json();
          const currentPlayers =
            playersData.response?.player_count || "Not Available";

          return {
            ...details[id].data,
            currentPlayers,
          };
        } catch (error) {
          console.warn(
            `Error fetching details for game id: ${id} - ${error.message}`
          );
          return null;
        }
      })
    );

    //filter out null values
    const validGameDetails = gameDetails.filter((game) => game !== null);

    const trendingGames = {
      topReleaseDate: topReleaseDate,
      games: validGameDetails.map((game) => ({
        id: game.steam_appid,
        name: game.name,
        photo: game.header_image,
        isFree: game.is_free,
        discountRate: game.price_overview?.discount_percent || 0,
        discountPrice: game.price_overview?.final_formatted || "Not Available",
        originalPrice:
          game.price_overview?.initial_formatted || "Not Available",
          currentPlayers: game.currentPlayers.toLocaleString("en-US"),
      })),
    };

    setCachedData(cacheKey, trendingGames);
    res.status(200).json({ trendingGames });
  } catch (error) {
    console.error("Error fetching trending games:", error);
    res.status(500).json({ error: error.message });
  }
}
