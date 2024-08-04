// src/components/Card/GameCard.js

import React from "react";

export default function GameCard({ game = [] }) {
  console.log("(GameCard) games", game);

  return (
    <>
      <img src={game.photo} alt="Avatar" />
      <h3>{game.name}</h3>
      <div>
        <img src="/" alt="" />
        <p>until</p>
        <div>
          <p>discount%</p>
          <div>
            <p>original $</p>
            <p>discounted $</p>
          </div>
        </div>
      </div>
    </>
  );
}
