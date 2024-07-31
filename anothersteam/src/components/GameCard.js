import React from "react";



// GAME CARD for HOME display
export default function GameCard({ game }) {

  return (
    <div className="card">
      <p>PHOTO: 'img' </p>
      <p>ID: {game.id}</p>
      <p>NAME: {game.name}</p>
    </div>
  );
}
