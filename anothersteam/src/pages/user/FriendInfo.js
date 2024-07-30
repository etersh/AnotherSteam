import React from 'react';

const FriendInfo = ({ friends, friendSince, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  const getFlag = (countryCode) => {
    return countryCode !== 'Not Available'
      ? `https://flagsapi.com/${countryCode}/flat/32.png`
      : null;
  };
  //theme:flat/shiny supported
  //size:16/24/32/48/64px supported

  return (
    <div>
      {friends.map((friend, index) => (
        <div key={index} className="friend-info">
          <h2>
            {friend.name}
            <img src={friend.profilePic} style={{ marginLeft: '8px' }} />
          </h2>
          <p>
            Friend Since:{' '}
            {new Date(friendSince[index] * 1000).toLocaleDateString('en-GB')}
          </p>
          <p>Name: {friend.realName}</p>
          <p>Steam ID: {friend.steamID}</p>
          <p>
            Country:{' '}
            {friend.countryCode !== 'Not Available' ? (
              <img
                src={getFlag(friend.countryCode)}
                style={{ marginLeft: '8px' }}
              />
            ) : (
              'Not Available'
            )}
          </p>
          <p>City: {friend.cityID}</p>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    //fetch friend's list
    const tempSteamID = '76561198157968527';

    const res = await fetch(
      `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamid=${tempSteamID}&relationship=friend`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch friend list');
    }

    const data = await res.json();

    //map friend_since date for displaying (in return)
    const friendSince = data.friendslist.friends.map(
      (friend) => friend.friend_since
    );
    //map steam id for fetching each friend's information below
    const friendsList = data.friendslist.friends.map(
      (friend) => friend.steamid
    );

    //fetch friend information
    const friendInfo = await Promise.all(
      friendsList.map(async (id) => {
        const res = await fetch(
          `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_STEAM_API_ACCESS_TOKEN}&steamids=${id}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch information for friend ${id}`);
        }

        const data = await res.json();
        const friend = data.response.players[0];

        return {
          name: friend.personaname || 'Not Available',
          profilePic: friend.avatar || 'Not Available',
          realName: friend.realname || 'Not Available',
          steamID: friend.steamid || 'Not Available',
          countryCode: friend.loccountrycode || 'Not Available',
          cityID: friend.loccityid || 'Not Available',
        };
      })
    );

    return {
      props: {
        friends: friendInfo,
        friendSince,
      },
    };
  } catch (err) {
    console.error('Error fetching friends information', err);
    return {
      props: {
        friends: [],
        friendSince: [],
        error: err.message,
      },
    };
  }
}

export default FriendInfo;
