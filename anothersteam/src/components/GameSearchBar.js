// src/components/GameSearchBar.js

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";


export default function GameSearch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  // const [data, setData] = useState(null);
  // const [query, setQuery] = useState(null);

  const validateForm = (inputData) => {
    const trimmedInput = inputData.gameid.trim(); // Trim leading / trailing spaces
    if (trimmedInput === "") {
      setErrorMessage("Please enter a valid game id.");
      return;
    }
    const formattedInput = trimmedInput
      .replace(/\s*,\s*/g, ",") // Remove spaces around commas ("   ,  ")
      .replace(/\s+/g, " "); // Replace multiple spaces with a single space
    // setQuery(formattedInput);
    router.push(
      `/game/SearchResult?gameid=${encodeURIComponent(formattedInput)}`
    );
  };

  // useEffect(() => {
  //   if (query) {
  //     fetchGame(query);
  //   }
  // }, [query]); // Re-fetch data when query changes

  // const fetchGame = (query) => {
  //   // const url = `https://store.steampowered.com/api/appdetails?appids=${query}`

  //   const url = `/api/appdetails?appids=${query}`; // Use proxy URL

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (!result || Object.keys(result).length === 0) {
  //         setErrorMessage("No matching results");
  //         setData([]);
  //         return;
  //       } else {
  //         setErrorMessage("");
  //         setData(result);
  //         console.log(result);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(`Error fetching data: ${err}`);
  //       setErrorMessage("System error: cannot fetch game data");
  //     });
  // };

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

      {/* <div id="">{errorMessage}</div> */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* <SearchResult data={data} error={errorMessage}/> */}
    </div>
  );
}
