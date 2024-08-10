import React from "react";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userAtom } from "@/state/store";

export function HomeButton() {
  return <button className="button home-button">Home</button>;
}

export function NavButton({ name }) {
  return <button className="button nav-button">{name}</button>;
}

export function UserButton({ name, profilePic }) {
  return (
    <button className="button user-button">
      <div className="flex align-vertical-center">
        <img src={profilePic} className="user-profile-pic" />
        {name}
      </div>
    </button>
  );
}

export function CommonButton({ name }) {
  return (
    <button className="button common-button align-self-center">{name}</button>
  );
}

export function LogoutButton() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userJWT");
      setUser(null); // Reset the user state atom
      router.push("/");
    }
  };

  return <button onClick={handleLogout} className="logout-button">Logout</button>;
}
