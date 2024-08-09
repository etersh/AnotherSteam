import React from "react";
import { useRouter } from 'next/router';

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



export function LogoutButton(){
  // const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Remove user from local storage
      localStorage.removeItem('userJWT');
      // setUser(null); // Reset the user state atom

      // console.log('(/user/logout) Logout successful!');
      // console.log('(/user/logout) User: ', user);

      // Redirect to login page or home page
      router.push('/');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};
