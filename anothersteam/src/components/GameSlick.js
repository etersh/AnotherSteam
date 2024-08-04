// src/components/GameSlick.js

import React from "react";
import Slider from "react-slick";
import GameCard from "@/components/Card/GameCard";

// npm i react-slick slick-carousel

export default function MultipleItems({ games = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.id} className="gamecard">
            <GameCard game={game} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
