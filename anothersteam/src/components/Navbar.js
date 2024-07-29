// src/components/Navar.js

import React from "react";
import Link from "next/link";
import { HomeButton, NavButton } from "./Button"

export default function Navbar() {
  return (
    <div className="navbar">
      <Link href="/" passHref className="">
        <HomeButton />
      </Link>

      <Link href="/" passHref className="">
        <NavButton name="Most Played Game" />
      </Link>

      <Link href="/" passHref className="">
        <NavButton name="Trending" />
      </Link>
    </div>
  );
}
