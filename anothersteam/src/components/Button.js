// src/components/Button.js
import React from "react";

export function HomeButton() {
  return <button className="button home-button">Home</button>;
}

export function NavButton({ name }) {
  return <button className="button nav-button">{name}</button>;
}


/* NEED USER INFOMATION HERE */
export function UserButton({ name }) {
  return (
    <button className="">
      <div className="flex align-vertical-center">
        <img>
        
        </img>
        {name}</div>
    </button>
  );
}
