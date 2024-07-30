// src/components/Navbar.js

import React from 'react';
import Link from 'next/link';
import { HomeButton, NavButton } from './Button';

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

      <Link href="/users/UserInfo" passHref className="">
        <NavButton name="User Information" />
      </Link>
    </div>
  );
}
