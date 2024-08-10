// src/pages/user/userInfo.js
import React from "react";
import { useUser } from "@/context/UserContext";

const UserInfo = () => {
  const { user } = useUser(); //  , loading, error 

  // if (loading) return <p>Loading...</p>;
  // if (error) return <div>Error: {error.message}</div>;

  const getFlag = (countryCode) => {
    return countryCode !== "Not Available"
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };

  return (
    <>
      {user ? (
        <div>
          <div className="user-info">
            <h2>
              <img
                src={user.steamPropic}
                style={{
                  marginLeft: "8px",
                  marginRight: "10px",
                  width: "200px",
                }}
                alt="Profile"
              />
              {user.steamName}
            </h2>
            <p>Name: {user.realName}</p>
            <p>Steam ID: {user.steamid}</p>
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
            <p>City: {user.cityid}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserInfo;

