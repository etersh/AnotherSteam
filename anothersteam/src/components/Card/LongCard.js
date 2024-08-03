import React from "react";

export default function LongCard({ games = [] }) {
  console.log("(LongCard) games", games);

  return (
    <div>
      {Array.isArray(games) && games.length > 0 ? (
        games.map((game) => (
          
          <div key={game.id} className="longcard">
            <p>RANK: {game.rank}</p>
            <p>PHOTO: <img src={game.photo}></img> </p>
            <p>ID: {game.id}</p>
            <p>NAME: {game.name}</p>
            <p>Price: {game.discountPrice}</p>
          </div>
        ))
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
}
