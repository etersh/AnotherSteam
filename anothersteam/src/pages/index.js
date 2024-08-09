// src/pages/index.js

import React, { useEffect, useState } from "react";
import SlickMultiple from "@/components/GameSlick";

export default function Home({ mostPlayedGames, trendingGames, error }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  return (
    <>
      <div className="home">
        {isClient && (
          <video className="homeBanner" autoPlay muted loop playsInline>
            <source
              src="https://cdn.donmai.us/original/e1/60/__steam_delivery_girl_atlas_and_p_body_portal_and_4_more_drawn_by_nemupan__e16074d688bee3764db908243a9b3e67.webm"
              type="video/webm"
            />
          </video>
        )}
      </div>

      <div className="slick-container">
        <h4>Most Played Games</h4>
        <div className="gamecard-container">
          <SlickMultiple games={mostPlayedGames} />
        </div>
      </div>

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
    // Most Played Games
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/most-played-games` // fetch games using api. NEXT_PUBLIC_API_URL: http://localhost:3000 need to change when deployed
    );
    if (!res.ok) {
      throw new Error("Failed to fetch most played games");
    }
    const { mostPlayedGames } = await res.json();


    // Trending Games
    // trendingGames.games, trendingGames.topReleaseDate
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trending-games`
    );
    if (!res2.ok) {
      throw new Error("Failed to fetch trending games");
    }
    const { trendingGames } = await res2.json();


    return {
      props: {
        mostPlayedGames: mostPlayedGames,
        trendingGames: trendingGames.games,
      },
    };
  } catch (err) {
    console.error("Error fetching games:", err);
    return {
      props: {
        games: [],
        error: err.message,
      },
    };
  }
}
