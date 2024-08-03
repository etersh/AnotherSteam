import React, { useEffect, useState } from "react";
import LongCard from "@/components/Card/LongCard";

const MostPlayedGames = () => {
  const [topGames, setTopGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/most-played-games")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        // Correctly access mostPlayedGames instead of data.response.ranks
        setTopGames(data.mostPlayedGames);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (

    <LongCard games={topGames}/>
  );
};

export default MostPlayedGames;
