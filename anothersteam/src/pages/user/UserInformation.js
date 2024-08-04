import React from 'react';
import UserInfo from './userInfo';
import RecentlyPlayedGames from './recentlyPlayedGames';
import FriendInfo from './friendInfo';

const UserInformation = () => {
  return (
    <div>
      <UserInfo />
      <RecentlyPlayedGames />
      <FriendInfo />
    </div>
  );
};

export default UserInformation;
