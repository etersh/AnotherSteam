// src/pages/api/user-info.js

// import { getCachedData, setCachedData } from '@/utils/cache';

export default async function handler(req, res) {
   const steamid = req.query.steamid;
    
   // Ensure userId is available
   if (!steamid) {
     return res.status(400).json({ error: 'User ID is required' });
   }

  try {
    // const cacheKey = 'userInfo';
    // const cachedData = getCachedData(cacheKey);

    // if (cachedData) {
    //   return res.status(200).json({ userData: cachedData });
    // }

    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamids=${steamid}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    const data = await response.json();
    const playerData = data.response.players[0];

    const userData = {
      steamName: playerData.personaname || 'Not Available',
      steamPropic: playerData.avatar || 'Not Available',
      realName: playerData.realname || 'Not Available',
      steamid: playerData.steamid || 'Not Available',
      countryCode: playerData.loccountrycode || 'Not Available',
      cityid: playerData.loccityid || 'Not Available',
    };

    // setCachedData(cacheKey, userData);
    res.status(200).json({ userData });
  } catch (err) {
    console.error('Error fetching user information', err);
    res.status(500).json({ err: err.message });
  }
}
