export async function fetchGames(topGames) {
    try {
      const gameDetails = await Promise.all(
        topGames.map(async (id) => {
          const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}`
          );
  
          if (!res.ok) {
            throw new Error(`Failed to fetch details for game id: ${id}`);
          }
  
          const data = await res.json();
          return data[id].data;
        })
      );
  
      const formattedGames = gameDetails.map((game) => ({
        name: game.name,
        photo: game.header_image,
        discountRate: game.price_overview?.discount_percent || 0,
        discountPrice: game.price_overview?.final_formatted || "Not Available",
        originalPrice: game.price_overview?.initial_formatted || "Not Available",
        discountUntil: "Not Available",
      }));
  
      return {
        props: {
          games: formattedGames,
        },
      };
    } catch (err) {
      console.error("(MostPlayedGames) Error fetching most played games:", err);
      return {
        props: {
          games: [],
          error: err.message,
        },
      };
    }
  }
  
  export default fetchGames;
  