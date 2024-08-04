// src/app/component/Footer.js
import React from "react";
import Link from "next/link";

import { NavButton, UserButton } from "./Button";
import Navbar from "./Navbar";
// import '../styles/globals.css';

function Header() {
  return (
    <>
      <header className="header">
        <Link href="/" passHref className="text-decro-none">
          <div className="flex align-vertical-center gap-xs">
            <img
              src="/steamicon/steam_Logo_with_name_header.png"
              className="header-logo"
            ></img>
            <p className="grey">API</p>
           {/* <p className="grey">
              STEAM-API
              <span className="trademark">&reg;</span>
            </p> */}
          </div>
        </Link>

        <Link href="/user/UserInformation" passHref className="right">
          <UserButton name="User Information" />
        </Link>
      </header>

      <Navbar />
    </>
  );
}

export default Header;
