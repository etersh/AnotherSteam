// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

// pages/api/steam-games.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}`
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
