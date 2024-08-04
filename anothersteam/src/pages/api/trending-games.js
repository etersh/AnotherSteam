export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?access_token=${process.env.NEXT_PUBLIC_XPAW_API_ACCESS_TOKEN}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch trending games');
    }

    //1. pages (recent 3 months) array
    //2. they have a page name (pages.name)
    //ex. Top Releases of April
    //3. they have an array of the top items(games) each page
    //ex. items_ids : {appid: 1492070}, {appid: 2446550} ...

    const data = await response.json();
    //display the most recent month only
    const mostRecentMonthPage = data.response.pages[0];
    const appIds = mostRecentMonthPage.item_ids
      .slice(0, 15)
      .map((item) => item.appid);

    const gameDetails = await Promise.all(
      appIds.map(async (id) => {
        try {
          const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}`
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
          return details[id].data;
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

    const trendingGames = validGameDetails.map((game) => ({
      id: game.steam_appid,
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || 'Not Available',
      originalPrice: game.price_overview?.initial_formatted || 'Not Available',
      isFree: game.is_free,
      discountUntil: "Summer sale",
    }));

    res.status(200).json({ trendingGames });
  } catch (error) {
    console.error('Error fetching trending games:', error);
    res.status(500).json({ error: error.message });
  }
}
