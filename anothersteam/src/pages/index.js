import React from "react";
// import GameSearch from "@/components/GameSearch";

import GameCard from "@/components/GameCard";
import {useAtom} from 'jotai'
import { mostPlayedGamesAtom } from "@/state/store";

export default function Home() {
	const [mostPlayedGames] = useAtom(mostPlayedGamesAtom);

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
			<GameCard games={mostPlayedGames} />

		</>
	);
}
