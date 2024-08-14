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
    <div>
      {friends.map((friend, index) => (
        <div key={index} className="friend-info">
          <div className="flex align-center">
            <img src={friend.profilePic} style={{ marginLeft: "8px" }} />
            <span className="align-self-center">{friend.name}</span>
          </div>
          {/* {friend.steamID} */}
          <p>
            Friend since:{" "}
            {new Date(friend.friendSince * 1000).toLocaleDateString("en-GB")}
          </p>

		  <div className="flex align-center">
		  <span className="align-self-center">Country:{" "}</span>
            {friend.countryCode !== "Not Available" ? (
              <img src={getFlag(friend.countryCode)} />
            ) : (
              "Not Available"
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendInfo;
