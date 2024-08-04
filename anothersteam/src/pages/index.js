import React from 'react';
import SlickMultiple from '@/components/GameSlick';
import { setCachedData } from '@/utils/cache';

export default function Home({ mostPlayedGames, trendingGames, error }) {
  return (
    <>
      <div className="home">
        {/* <img
          // src="/steam/home-banner.png" // Summer Sale
          // src="https://i.redd.it/id7chkilm62c1.gif" // Autumn Sale1
          // src="https://i.redd.it/4xyeokdnm62c1.gif"  // Autumn Sale2
          // src="https://i.redd.it/u73pmphmm62c1.gif"  // Autumn Sale3
          // src="/steam/home-super-banner.png"            // Autumn

          alt="HomeBanner"
          className="homeBanner"
        ></img> */}
        <video className="homeBanner" autoPlay muted loop playsInline>
          <source
            src="https://cdn.donmai.us/original/e1/60/__steam_delivery_girl_atlas_and_p_body_portal_and_4_more_drawn_by_nemupan__e16074d688bee3764db908243a9b3e67.webm"
            type="video/webm"
          />

          {/* <source src="https://preview.redd.it/f6wxdatim6oa1.gif?width=2316&format=mp4&s=d0d7d71075cf409f827874ba5d2d953381f4521a" type="video/webm" /> */}
        </video>
      </div>

      <div className="slick-container">
        <h4>Most Played Games</h4>
        <div className="gamecard-container">
          <SlickMultiple games={mostPlayedGames} />
        </div>
      </div>

      {/* <div className="slick-container">
        <h4>Trending Games</h4>
        <div className="gamecard-container">
          <SlickMultiple games={trendingGames} />
        </div>
      </div> */}

      <div className="slick-container">
        <h4>Trending Games</h4>
        <div className="gamecard-container">
          <SlickMultiple games={trendingGames} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // const [mostPlayedGames, setMostPlayedGames] = useAtom(mostPlayedGamesAtom);

  try {
    //1. Most Played Games
    const cacheKey = 'mostPlayedGames';
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      res.setHeader('Cache-Control', 'max-age=3600, must-revalidate');
      return res.status(200).json({ mostPlayedGames: cachedData });
    }

    const res = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch most played games');
    }

    const data = await res.json();

    const topGameIds = data.response.ranks
      .slice(0, 15)
      .map((game) => game.appid);

    const gameDetails = await Promise.all(
      topGameIds.map(async (id) => {
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

    const mostPlayedGames = gameDetails.map((game) => ({
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || 'Not Available',
      originalPrice: game.price_overview?.initial_formatted || 'Not Available',
      discountUntil: 'Not Available',
    }));

    setCachedData(cacheKey, mostPlayedGames);

    //2. Trending Games
    const cacheKey2 = 'trendingGames';
    const cachedData2 = getCachedData(cacheKey2);

    if (cachedData2) {
      return res.status(200).json({ trendingGames: cachedData2 });
    }

    const res2 = await fetch(
      `https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?access_token=${process.env.NEXT_PUBLIC_XPAW_API_ACCESS_TOKEN}`
    );

    if (!res2.ok) {
      throw new Error('Failed to fetch trending games');
    }

    const data2 = await res2.json();
    const mostRecentMonthPage = data2.response.pages[0];
    const appIds = mostRecentMonthPage.item_ids
      .slice(0, 15)
      .map((game) => game.appid);

    const gameDetails2 = await Promise.all(
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
    const validGameDetails = gameDetails2.filter((game) => game !== null);

    const trendingGames = validGameDetails.map((game) => ({
      //id: game.steam_appid,
      name: game.name,
      photo: game.header_image,
      discountRate: game.price_overview?.discount_percent || 0,
      discountPrice: game.price_overview?.final_formatted || 'Not Available',
      originalPrice: game.price_overview?.initial_formatted || 'Not Available',
      discountUntil: 'Not Available',
    }));
    setCachedData(cacheKey2, trendingGames);

    return {
      props: {
        mostPlayedGames: mostPlayedGames,
        trendingGames: trendingGames,
      },
    };
  } catch (err) {
    console.error('Error fetching games:', err);
    return {
      props: {
        games: [],
        error: err.message,
      },
    };
  }
}
