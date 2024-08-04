import { getCachedData, setCachedData } from '@/utils/cache';

export default async function handler(req, res) {
  try {
    const cacheKey = 'recentlyPlayedGames';
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return res.status(200).json({ formattedGames: cachedData });
    }

    const tempSteamID = '76561198157968527';

    // Fetch recently played games list
    const response = await fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamid=${tempSteamID}&format=json`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recently played games');
    }

    const data = await response.json();

    //map playtime for displaying (in return)
    const playtimeList = data.response.games.map(
      (game) => game.playtime_forever || 0
    );

    //map app id for fetching each game's information below
    const gamesIDList = data.response.games.map((game) => game.appid);

    //fetch game information
    const gameInfo = await Promise.all(
      gamesIDList.map(async (id) => {
        const gameResponse = await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${id}`
        );

        if (!gameResponse.ok) {
          throw new Error(`Failed to fetch information for game ${id}`);
        }

        const gameData = await gameResponse.json();
        return gameData[id].data;
      })
    );

    const formattedGames = gameInfo.map((game, index) => ({
      name: game.name,
      photo: game.header_image,
      playtime: (playtimeList[index] / 60).toFixed(2),
    }));

    setCachedData(cacheKey, formattedGames);
    res.status(200).json({ formattedGames });
  } catch (err) {
    console.error('Error fetching recently played games information', err);
    res.status(500).json({ err: err.message });
  }
}
