// src/pages/api/friend-info.js

// import { getCachedData, setCachedData } from '@/utils/cache';

export default async function handler(req, res) {

  // Example: Get userId from request headers or query params
  const steamid = req.query.steamid;

  // Ensure userId is available
  if (!steamid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // const cacheKey = 'friendInfo';
    // const cachedData = getCachedData(cacheKey);

    // if (cachedData) {
    //   return res.status(200).json({ friendInfo: cachedData });
    // }

    // fetch friends list
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamid=${steamid}&relationship=friend`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch friend list');
    }

    const data = await response.json();

    //map friend_since date for displaying (in return)
    const friends = data.friendslist.friends;

    //fetch friend information
    const friendInfo = await Promise.all(
      friends.map(async (friend) => {
        const res = await fetch(
          `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamids=${friend.steamid}`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch information for friend ${friend.steamid}`
          );
        }

        const data = await res.json();
        const player = data.response.players[0];

        return {
          name: player.personaname || 'Not Available',
          profilePic: player.avatar || 'Not Available',
          realName: player.realname || 'Not Available',
          steamID: player.steamid || 'Not Available',
          countryCode: player.loccountrycode || 'Not Available',
          cityID: player.loccityid || 'Not Available',
          friendSince: friend.friend_since || 'Not Available', // add friend_since date
        };
      })
    );
    // setCachedData(cacheKey, friendInfo);
    res.status(200).json({ friendInfo });
  } catch (err) {
    console.error('Error fetching friends information', err);
    res.status(500).json({ err: err.message });
  }
}
