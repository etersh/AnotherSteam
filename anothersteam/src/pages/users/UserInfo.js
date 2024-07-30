import React from 'react';

const UserInfo = ({ userData, error }) => {
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
      <div className="user-info">
        <h2>
          {userData.name}
          <img src={userData.profilePic} style={{ marginLeft: '8px' }} />
        </h2>
        <p>Name: {userData.realName}</p>
        <p>Steam ID: {userData.steamID}</p>
        <p>
          Country:{' '}
          {userData.countryCode !== 'Not Available' ? (
            <img
              src={getFlag(userData.countryCode)}
              style={{ marginLeft: '8px' }}
            />
          ) : (
            'Not Available'
          )}
        </p>
        <p>City: {userData.cityID}</p>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch user information
    const tempSteamID = '76561198157968527';

    const res = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.NEXT_PUBLIC_XPAW_API_ACCESS_TOKEN}&steamids=${tempSteamID}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch user information');
    }

    const data = await res.json();
    const playerData = data.response.players[0];

    const userData = {
      name: playerData.personaname || 'Not Available',
      profilePic: playerData.avatar || 'Not Available',
      realName: playerData.realname || 'Not Available',
      steamID: playerData.steamid || 'Not Available',
      countryCode: playerData.loccountrycode || 'Not Available',
      cityID: playerData.loccityid || 'Not Available',
    };

    return {
      props: {
        userData,
      },
    };
  } catch (err) {
    console.error('Error fetching user information', err);
    return {
      props: {
        userData: {},
        error: err.message,
      },
    };
  }
}

export default UserInfo;
