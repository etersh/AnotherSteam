import React, {useState, useEffect} from "react";
import Link from "next/link";
import { UserButton, LogoutButton } from "./Button";
// import { useRouter } from 'next/router';
import Navbar from "./Navbar";
import { useUser } from "@/context/UserContext";

function Header() {
  const { steamUser, loading, error } = useUser(); // user


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

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