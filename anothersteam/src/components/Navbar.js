import React from "react";
import Link from "next/link";
import { HomeButton, NavButton } from "./Button";

import GameSearchBar from "./GameSearchBar";

export default function Navbar() {
	return (
		<div className="navbar">
			<div className="button-container">
				<Link href="/" passHref>
					<HomeButton />
				</Link>

				<Link href="/games/mostPlayedGames" passHref>
					<NavButton name="Most Played Games" />
				</Link>

				<Link href="/games/trendingGames" passHref>
					<NavButton name="Trending Games" />
				</Link>
			</div>
			<GameSearchBar />
		</div>
	);
}
