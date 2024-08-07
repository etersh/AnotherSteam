// src/pages/user/userInfo.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { steamid } = router.query;

  useEffect(() => {
    if (steamid) {
      fetch(`/api/user-info?steamid=${steamid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) { 
            throw new Error(data.error);
          }
          setUser(data.userData);
        })
        .catch((err) => setError(err.message));
    }
  }, [user]); // steamid

  if (error) return <div>Error: {error}</div>;

  const getFlag = (countryCode) => {
    return countryCode !== "Not Available"
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };
  //theme:flat/shiny supported
  //size:16/24/32/48/64px supported
  return (
    <>
      {user ? (
        <div>
          <div className="user-info">
            <h2>
              <img
                src={user.profilePic}
                style={{
                  marginLeft: "8px",
                  marginRight: "10px",
                  width: "50px",
                }}
                alt="Profile"
              />
              {user.name}
            </h2>
            <p>Name: {user.realName}</p>
            <p>Steam ID: {user.steamID}</p>
            <p>
              Country:{" "}
              {user.countryCode !== "Not Available" ? (
                <img
                  src={getFlag(user.countryCode)}
                  style={{ marginLeft: "8px" }}
                  alt="Country flag"
                />
              ) : (
                "Not Available"
              )}
            </p>
            <p>City: {user.cityID}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserInfo;
