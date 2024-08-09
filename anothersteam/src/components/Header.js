
import React from "react";
import Link from "next/link";
import { UserButton, LogoutButton } from "./Button";
import Navbar from "./Navbar";
import { useUser } from "@/context/UserContext";

function Header() {
  const { user, loading, error } = useUser();

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

        {user ? (
          <>
            <Link href={`/user/${user.steamid}`} passHref className="right">
              <UserButton name={user.steamName} profilePic={user.steamPropic} />
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/user/login" passHref>
              <button>Login</button>
            </Link>
            <Link href="/user/register" passHref>
              <button>Register</button>
            </Link>
          </>
        )}
      </header>

      <Navbar />
    </>
  );
}

export default Header;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { UserButton, LogoutButton } from "./Button"; //LogoutButton
// import Navbar from "./Navbar";
// import { useAtom } from "jotai";
// import { userAtom } from "@/state/store";

// function Header() {

//   const [user, setUser] = useAtom(userAtom);
//   const [loading, setLoading] = useState(true);

//   async function fetchUserData() {
//     try {
//       const res = await fetch(`/api/user-info?steamid=${user.steamid}`);
//       const data = await res.json();
//       setUser(data.userData);
//       console.log("(Header) user info :", user)
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     // if (loading) {
//       fetchUserData();
//     // }
//   }, []); // user

//   return (
//     <>
//       <header className="header">
//         <Link href="/" passHref className="text-decro-none">
//           <div className="flex align-vertical-center gap-xs">
//             <img
//               src="/steam/logo/steam_Logo_with_name_header.png"
//               className="header-logo"
//             ></img>
//             <p className="text-primary">WEB API</p>
//           </div>
//         </Link>

//         {/* User functions */}
//         {user ? (
//           <>
//             <Link href={`/user/${user.steamid}`} passHref className="right">
//               <UserButton name={user.steamName} profilePic={user.steamPropic} />
//               {/* <UserButton name={steamuser.name} profilePic={steamuser.profilePic} /> */}
//             </Link>
//             {/* <Link href="/user/logout" passHref>
//               <button>Logout</button>
//             </Link> */}
//             <LogoutButton />
//           </>
//         ) : (
//           <>
//             <Link href="/user/login" passHref>
//               <button>Login</button>
//             </Link>
//             <Link href="/user/register" passHref>
//               <button>Register</button>
//             </Link>
//           </>
//         )}
//       </header>

//       <Navbar />
//     </>
//   );
// }

// export default Header;
