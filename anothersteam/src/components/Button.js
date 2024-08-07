import React from "react";

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
