// src/pages/user/userInfo.js
import React from "react";
import { useUser } from "@/context/UserContext";

const UserInfo = () => {
  const { steamUser } = useUser(); //  , loading, error 

  // if (loading) return <p>Loading...</p>;
  // if (error) return <div>Error: {error.message}</div>;

  const getFlag = (countryCode) => {
    return countryCode !== "Not Available"
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };

  return (
    <>
      {steamUser ? (
        <div>
          <div className="user-info">
            <h2>
              <img
                src={steamUser.steamPropic}
                style={{
                  marginLeft: "8px",
                  marginRight: "10px",
                  width: "200px",
                }}
                alt="Profile"
              />
              {steamUser.steamName}
            </h2>
            <p>Name: {steamUser.realName}</p>
            <p>Steam ID: {steamUser.steamid}</p>
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
            <p>City: {steamUser.cityid}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserInfo;

