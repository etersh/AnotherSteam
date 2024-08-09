import React from "react";
import Slider from "react-slick";
import Link from "next/link";
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
      {games.map((game, index) => (
        <Link href={`/game/${game.id}`} className="link-none" key={game.id || index}>
          <GameCard game={game} />
        </Link>
      ))}
    </Slider>
  );
}