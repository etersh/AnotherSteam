// src/page/index.js

import React from "react";
// import GameSearch from "@/components/GameSearch";

import GameCard from "@/components/GameCard";
import MostPlayedGames from "./games/MostPlayedGames";
// import {useAtom} from 'jotai'
// import { mostPlayedGamesAtom } from "@/state/store";

export default function Home({ mostPlayedGames, error }) {
	// const [mostPlayedGames] = useAtom(mostPlayedGamesAtom);

	return (
		<>
			<img src="#" alt="HomeBanner"></img>
			<h1>HOME</h1>
			<p> SearchBar testing: </p>
			<ul>
				<li>october</li>
				<li>nightmare</li>
				<li>cyberpunk</li>
				<li>chained together</li>
				<li>don't starv</li>
			</ul>
			<div>after click on a game, get the game id, and search again</div>
			<GameCard games={mostPlayedGames} err={error} />
			{/* <MostPlayedGames games={mostPlayedGames} err={error} /> */}

		</>
	);
}


export async function getServerSideProps() {
	// const [mostPlayedGames, setMostPlayedGames] = useAtom(mostPlayedGamesAtom);
  
	try {
	  // Fetch top 3 game ids
	  // `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_XPAW_API_ACCESS_TOKEN}`
	  const res = await fetch(
		`https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/?`
	  );
  
	  if (!res.ok) {
		throw new Error("(MostPlayedGames) Failed to fetch top games");
	  }
  
	  const data = await res.json();
  
	  // setMostPlayedGames(data);
	  // console.log("mostPlayedGames :", mostPlayedGames);
  
	  const topGameIds = data.response.ranks
		.slice(0, 10)
		.map((game) => game.appid);
  
	  // Fetch game details
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
		discountPrice: game.price_overview?.final_formatted || "Not Available",
		originalPrice: game.price_overview?.initial_formatted || "Not Available",
		discountUntil: "Not Available",
	  }));
  
	  return {
		props: {
			mostPlayedGames: mostPlayedGames,
		},
	  };
	} catch (err) {
	  console.error("Error fetching top 3 most played games:", err);
	  return {
		props: {
		  games: [],
		  error: err.message,
		},
	  };
	}
  }