// pages/api/fetch-game-with-id.js
export default async function handler(req, res) {
  try {
    //   const response = await fetch(
    //     `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
    //   );
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top games");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching top 3 most played games:", error);
    res.status(500).json({ error: error.message });
  }
}

// export default async function handler(req, res) {
//     const { id } = req.query;

//     try {
//       const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch game details');
//       }

//       const data = await response.json();
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
