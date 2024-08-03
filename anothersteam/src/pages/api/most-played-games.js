// pages/api/most-played-games.js
export default async function handler(req, res) {
  try {
    const response = await fetch(`https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`);
    if (!response.ok) {
      throw new Error("Failed to fetch top games");
    }

    const data = await response.json();
    const topGames = data.response.ranks.slice(0, 10);
    console.log("TOPGAME", topGames)
    const topGameIds = data.response.ranks.slice(0, 10).map((game) => game.appid);

    const gameDetails = await Promise.all(
      topGameIds.map(async (id) => {
        const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`);
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
      discountPrice: game.price_overview?.final || "Not Available",
      originalPrice: game.price_overview?.initial || "Not Available",
      discountUntil: "Not Available",
    }));

    res.status(200).json({ mostPlayedGames });
  } catch (error) {
    console.error("Error fetching top games:", error);
    res.status(500).json({ error: error.message });
  }
}


// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// // export default function handler(req, res) {
// //   res.status(200).json({ name: "John Doe" });
// // }

// // pages/api/most-played-games.js
// export default async function handler(req, res) {
//   // `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}`
//   try {
//     const response = await fetch(
//       `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch top games");
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching top 3 most played games:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

