// src/components/GameSearch.js

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function GameSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (inputData) => {
    const trimmedInput = inputData.gameid.trim(); // Trim leading / trailing spaces
    if (trimmedInput === "") {
      setErrorMessage("Please enter a valid game id.");
      return;
    }
    const formattedInput = trimmedInput
      .replace(/\s*,\s*/g, ",") // Remove spaces around commas ("   ,  ")
      .replace(/\s+/g, " "); // Replace multiple spaces with a single space
    setQuery(formattedInput);
  };

  useEffect(() => {
    if (query) {
      fetchGame(query);
    }
  }, [query]); // Re-fetch data when query changes

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
    <div className="">
      {errors.gameid && <span className="">{errors.gameid.message}</span>}
      <form onSubmit={handleSubmit(validateForm)} id="searchForm" className="">
        <input
          type="text"
          id="userInput"
          placeholder="> Enter game id"
          aria-label="searchById"
          className=""
          {...register("gameid", {
            required: "Game ID is required",
            minLength: {
              value: 7,
              message: "Game ID must be 7 characters long",
            },
          })}
        />
        <button type="submit" className="">
          Search
        </button>
      </form>

      <div id="">{errorMessage}</div>

      {/* 
      - Push id to routes
      - DISPLAY game details on /game/[id] page
      */}

      {/*
      <div>
        {data && Object.keys(data).map((appId) => (
          <div key={appId} className="game-details">
            <h2>{data[appId].data.name}</h2>
            <img src={data[appId].data.header_image} alt={data[appId].data.name} />
            <p dangerouslySetInnerHTML={{ __html: data[appId].data.detailed_description }}></p>
            <p>Price: {data[appId].data.price_overview ? data[appId].data.price_overview.final_formatted : "Free"}</p>
            <p>Developers: {data[appId].data.developers.join(", ")}</p>
            <p>Genres: {data[appId].data.genres.map(genre => genre.description).join(", ")}</p>
          </div>
        ))}
      </div>*/}

    </div>
  );
}
