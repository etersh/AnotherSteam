import React from 'react';
import UserInfo from '../../components/UserInfo';
import RecentlyPlayedGames from '../../components/RecentlyPlayedGames';
import FriendInfo from '../../components/FriendInfo';

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
