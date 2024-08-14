// src/pages/user/userInfo.js
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, steamUserAtom } from "@/state/store";

const UserInfo = () => {
  const [steamUser, setSteamUser] = useAtom(steamUserAtom);
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (user) {
      setLoading(true); // Start loading
      fetch(`/api/user-info?steamid=${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            throw new Error(data.err);
          }

          localStorage.setItem("userSteamData", JSON.stringify(data.userData));
          setSteamUser(data.userData);

          setLoading(false); // Stop loading after success
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false); // Stop loading after error
        });
    }
  }, [user]);

  const getFlag = (countryCode) => {
    return countryCode !== "Not Available"
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };

  return (
    <div>
      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && steamUser && (
        <div className="user-info">
          <h2>
            <img
              src={steamUser.steamPropic}
          className="user-propic"
              alt="Profile"
            />
            {steamUser.steamName}
            <p>{steamUser.steamid}</p>
          </h2>
          <p>
            Country:{" "}
            {steamUser.countryCode !== "Not Available" ? (
              <img
                src={getFlag(steamUser.countryCode)}
                style={{ marginLeft: "8px" }}
                alt="Country flag"
              />
            ) : (
              "Not Available"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
