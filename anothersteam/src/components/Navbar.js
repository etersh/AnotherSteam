// src/components/Navbar.js

import React from 'react';
import Link from 'next/link';
import { HomeButton, NavButton } from './Button';

import GameSearchBar from './GameSearchBar';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link href="/" passHref className="">
        <HomeButton />
      </Link>

      <Link href="/games/MostPlayedGames" passHref className="">
        <NavButton name="Most Played Games" />
      </Link>

      <Link href="/" passHref className="">
        <NavButton name="Trending" />
      </Link>

      <Link href="/user/UserInformation" passHref className="">
        <NavButton name="User Information" />
      </Link>

      {/* 
      <Link href="/user/UserInfo" passHref className="">
        <NavButton name="User Information" />
      </Link>

      <Link href="/user/FriendInfo" passHref className="">
        <NavButton name="Friend's Information" />
      </Link>

      <Link href="/user/RecentlyPlayedGames" passHref className="">
        <NavButton name="Recently Played Games" />
      </Link> */}

      <GameSearchBar />
    </div>
  );
}
