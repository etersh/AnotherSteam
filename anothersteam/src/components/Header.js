// src/components/Header.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, LogoutButton } from "./Button";
import Navbar from "./Navbar";

import { useAtom } from "jotai";
import { steamUserAtom } from "@/state/store"; 

function Header() {
  const [steamUser] = useAtom(steamUserAtom);
  // const steamUser = localStorage.getItem("userSteamData")
  // const steamUser = JSON.parse(localStorage.getItem("userSteamData"));
  const [hydrated, setHydrated] = useState(false); // State to track hydration

  useEffect(() => {
    setHydrated(true); // Set hydrated to true once the component has mounted
  }, []);

  useEffect(() => {
    if (steamUser) {
      console.log("User has logged in:", steamUser);
    }
  }, [steamUser]);

  if (!hydrated) {
    // Avoid rendering anything on the server
    return null;
  }

  return (
    <>
      <header className="header">
        <Link href="/" passHref className="text-decro-none">
          <div className="flex align-vertical-center gap-xs">
            <img
              src="/steam/logo/steam_Logo_with_name_header.png"
              className="header-logo"
            />
            <p className="text-primary">WEB API</p>
          </div>
        </Link>

        <div className="flex right align-center gap-s">
          {steamUser ? (
            <>
              <Link href={`/user/${steamUser.steamid}`} passHref>
                <UserButton
                  name={steamUser.steamName}
                  profilePic={steamUser.steamPropic}
                />
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/user/login" passHref>
                <button className="login-button">Login</button>
              </Link>
            </>
          )}
        </div>
      </header>

      <Navbar />
    </>
  );
}

export default Header;

