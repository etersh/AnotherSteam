// src/components/GameSlick.js

import React from "react";
import Slider from "react-slick";
import GameCard from "@/components/Card/GameCard";


// npm i react-slick slick-carousel
// MUST NOT APPLY "flex"

export default function SlickMultiple({ games = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (

      <Slider {...settings}>
        {games.map((game) => (
          <GameCard game={game} />
        ))}
      </Slider>

  );
}
