// import { getCachedData, setCachedData } from '@/utils/cache';

export default async function handler(req, res) {
  try {
    // const cacheKey = 'userInfo';
    // const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      return res.status(200).json({ userData: cachedData });
    }

    // Fetch user information
    // const tempSteamID = '76561198157968527';
    const tempSteamID = '76561198119596896';

    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamids=${tempSteamID}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    const data = await response.json();
    const playerData = data.response.players[0];

    const userData = {
      name: playerData.personaname || 'Not Available',
      profilePic: playerData.avatar || 'Not Available',
      realName: playerData.realname || 'Not Available',
      steamID: playerData.steamid || 'Not Available',
      countryCode: playerData.loccountrycode || 'Not Available',
      cityID: playerData.loccityid || 'Not Available',
    };

    // setCachedData(cacheKey, userData);
    res.status(200).json({ userData });
  } catch (err) {
    console.error('Error fetching user information', err);
    res.status(500).json({ err: err.message });
  }
}
