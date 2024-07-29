import React from "react";
import GameSearch from "@/components/GameSearch";

export default function Home() {
  return (
    <>
      <img src="#" alt="HomeBanner"></img>
      <h1>HOME</h1>
      <p>Phase1: Fetching data from Steam Web API</p>
      <div>Top 3 Most played games</div>


      <div>Single Game Data: e.g. 1091500</div>
      <GameSearch />
    </>
  );
}
