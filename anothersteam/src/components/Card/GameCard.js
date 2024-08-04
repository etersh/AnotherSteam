import React from 'react';

export default function GameCard({ game = [] }) {
  console.log('(GameCard) games', game);

  return (
    <div key={game.id} className="gamecard">
      <img src={game.photo} alt="Avatar" />
      <h3>{game.name}</h3>
      <div className="flex">
        <img src="/" alt="" />
        <span>until time</span>
        <div>
          <span>discount%</span>
          {/* <div>
            <p>original $</p>
            <p>discounted $</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
