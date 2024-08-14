// src/pages/user/friendInfo.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const FriendInfo = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { steamid } = router.query;

  useEffect(() => {
    if (steamid) {
      fetch(`/api/friend-info?steamid=${steamid}`)
        // fetch("/api/friend-info")
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            throw new Error(data.err);
          }
          setFriends(data.friendInfo);
        })
        .catch((err) => setError(err.message));
    }
  }, [steamid]);

  if (error) return <div>Error: {error}</div>;

  const getFlag = (countryCode) => {
    return countryCode !== "Not Available"
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };
  //theme:flat/shiny supported
  //size:16/24/32/48/64px supported

  return (
	<div className="user-info-container">
      <p className="mg-none user-text-minor text-highlight">Friends</p>
      <div className="mt-s  ml-xs">
        {friends.map((friend, index) => (
          <div key={index} className="friend-info mb-s">
            <div className="flex align-center">
              <img
                src={friend.profilePic}
                className="friend-propic align-self-center "
              />
              <div className="flex flex-col ml-xs">
                <p className="mt-none mb-xs">{friend.name}</p>
                <p className="mg-none user-text-minor">
                  Friend since:{" "}
                  {new Date(friend.friendSince * 1000).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>
            </div>
            {/* {friend.steamID} */}

            {/* <div className="flex align-center">
              <span className="align-self-center">Country: </span>
              {friend.countryCode !== "Not Available" ? (
                <img src={getFlag(friend.countryCode)} />
              ) : (
                "Not Available"
              )}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendInfo;
