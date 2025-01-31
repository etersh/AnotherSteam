// src/components/Navbar.js

import React, { useEffect } from "react";
import Link from "next/link";
import { HomeButton, NavButton } from "./Button";
import GameSearchBar from "./GameSearchBar";
import SelectView from "@/components/SelectView";
import { useAtom } from "jotai";
import { viewedAtom, recentlyViewedAtom } from "@/state/store";

export default function Navbar() {
  const [allViewedGames, setAllViewedGames] = useAtom(viewedAtom);
  const [recentlyViewed, setRecentlyViewed] = useAtom(recentlyViewedAtom);

  useEffect(() => {
    const loadData = () => {
      const storedGames = localStorage.getItem("viewedGames");
      if (storedGames) {
        const games = JSON.parse(storedGames);
        console.log("Games loaded from local storage:", games);
        setAllViewedGames(games);
      }
    };

    loadData();
  }, [setAllViewedGames]);

  useEffect(() => {
    setRecentlyViewed(allViewedGames.slice(-6));
  }, [allViewedGames, setRecentlyViewed]);

  const clearData = () => {
    setAllViewedGames([]);
    localStorage.removeItem("viewedGames");
  };

  const deleteGameFromHistory = (gameId) => {
    const updatedGames = allViewedGames.filter((game) => game.id !== gameId);
    setAllViewedGames(updatedGames);
    localStorage.setItem("viewedGames", JSON.stringify(updatedGames));
  };

  const options = recentlyViewed.map((game) => ({
    value: game.id,
    label: (
      <div className="flex justify-space-between">
        <Link href={`/game/${game.id}`} className="view-option">{game.name}</Link>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation
            deleteGameFromHistory(game.id);
          }}
          className="delete-view"
        >
          X
        </button>
      </div>
    ),
  }));

  options.push({
    value: "clear-history",
    label: (
      <div className="text-center">
        <button
          className="clear-history"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation
            clearData();
          }}
        >
          Clear History
        </button>
      </div>
    ),
    isClearHistory: true,
  });

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

      <div className="flex gap-s right">
        <SelectView options={options} />

        <div>
          <GameSearchBar />
        </div>
      </div>
    </div>
  );
}
