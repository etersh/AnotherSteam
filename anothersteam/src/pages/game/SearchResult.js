// src/pages/game/SearchResult.js

// THIS SHOULD BE A CARD, USER CAN CLICK ON IT AND IT WILL GO TO [id].js


import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const router = useRouter();
  const { gameid } = router.query;
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (gameid) {
      // query
      fetchGame(gameid);
    }
  }, [gameid]); // Re-fetch data when gameid changes

  const fetchGame = (query) => {
    // const url = `https://store.steampowered.com/api/appdetails?appids=${query}`

    const url = `/api/appdetails?appids=${query}`; // Use proxy URL

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (!result || Object.keys(result).length === 0) {
          setErrorMessage("No matching results");
          setData([]);
          return;
        } else {
          setErrorMessage("");
          setData(result);
          console.log(result);
        }
      })
      .catch((err) => {
        console.error(`Error fetching data: ${err}`);
        setErrorMessage("System error: cannot fetch game data");
      });
  };

  return (
    <div>
      {data &&
        Object.keys(data).map((appId) => (
          <div key={appId} className="game-details">
            <h2>{data[appId].data.name}</h2>
            <img
              src={data[appId].data.header_image}
              alt={data[appId].data.name}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: data[appId].data.detailed_description,
              }}
            ></p>
            <p>
              Price:{" "}
              {data[appId].data.price_overview
                ? data[appId].data.price_overview.final_formatted
                : "Free"}
            </p>
            <p>Developers: {data[appId].data.developers.join(", ")}</p>
            <p>
              Genres:{" "}
              {data[appId].data.genres
                .map((genre) => genre.description)
                .join(", ")}
            </p>
          </div>
        ))}
    </div>
  );
}
