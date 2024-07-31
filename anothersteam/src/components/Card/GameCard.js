import React from "react";

export default function GameCard({ games = [] }) {
  console.log("(GameCard) games", games);

  return (
    <div>
      {Array.isArray(games) && games.length > 0 ? (
        games.map((game) => (
          <div key={game.id} className="gamecard">
            <p>PHOTO: 'img' </p>
            <p>ID: {game.id}</p>
            <p>NAME: {game.name}</p>
          </div>
        ))
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
}
