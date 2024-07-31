import React from "react";
import { useAtom } from "jotai";


// GAME CARD for HOME display
export default function GameCard({games}) {


  return (
    <div className="mostPlayedGames-container">
      {games.map((game) => (
        <div key={game.id} className="card">
          <p>PHOTO: 'img' </p>
          <p>ID: {game.id}</p>
          <p>NAME: {game.name}</p>
        </div>
      ))}
    </div>
  );
}
