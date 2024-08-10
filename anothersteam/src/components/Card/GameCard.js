import React from "react";

export default function GameCard({ game = [] }) {
  console.log("(GameCard) games", game);

  return (
    <div key={game.id} className="gamecard">
      <img src={game.photo} alt="Avatar" />
      <h3>{game.name}</h3>
      <div className="gamecard-price">
        {game.isFree ? (
          "FREE"
        ) : (
          <>
            {game.discountPrice ? game.discountPrice : game.originalPrice}
          </>
        )}
      </div>
    </div>
  );
}
