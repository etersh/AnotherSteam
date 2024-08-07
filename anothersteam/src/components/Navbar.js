import React, { useEffect } from "react";
import Link from "next/link";
import { HomeButton, NavButton } from "./Button";
import GameSearchBar from "./GameSearchBar";
import Select from "react-select";
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/game/${game.id}`}>{game.name}</Link>
        <button
          onClick={() => deleteGameFromHistory(game.id)}
          style={{
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          ❌
        </button>
      </div>
    ),
  }));

  options.push({
    value: "clear-history",
    label: (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearData();
          }}
          style={{
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "5px 10px",
          }}
        >
          Clear History
        </button>
      </div>
    ),
    isClearHistory: true,
  });

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "300px", // Adjust this width as needed
    }),
    option: (provided, { data }) => ({
      ...provided,
      display: "flex",
      justifyContent: data.isClearHistory ? "center" : "space-between",
      whiteSpace: "normal", // Allow text to wrap
    }),
  };

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

      <div className="flex right">
        <Select
          options={options}
          placeholder="View"
          isClearable
          styles={customStyles}
          onChange={(selectedOption) => {
            if (selectedOption && selectedOption.value !== "clear-history") {
              window.location.href = `/game/${selectedOption.value}`;
            }
          }}
          onInputChange={(inputValue, { action }) => {
            if (action === "input-blur") {
              return;
            }
          }}
        />

      <div>
        <GameSearchBar />
      </div>
      </div>
      
    </div>
  );
}
