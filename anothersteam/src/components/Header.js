import React, { useEffect, useState } from "react";
import Link from "next/link";

import { UserButton } from "./Button";
import Navbar from "./Navbar";

import { useAtom } from "jotai";
import { userAtom } from "@/state/store";

function Header() {
	const [user, setUser] = useState({ name: "", profilePic: "" });
	// const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const res = await fetch("/api/user-info");
				const data = await res.json();
				setUser(data.userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
		fetchUserData();
	}, []);

	return (
		<>
			<header className="header">
				<Link href="/" passHref className="text-decro-none">
					<div className="flex align-vertical-center gap-xs">
						<img
							src="/steam/logo/steam_Logo_with_name_header.png"
							className="header-logo"
						></img>
						<p className="grey">WEB API</p>
					</div>
				</Link>

				{/* <Link href="/user/userInformation" passHref className="right">
					<UserButton name={user.name} profilePic={user.profilePic} />
				</Link> */}

				{/* User functions */}
				<Link href="/user/login" passHref className="">
					<button>Login</button>
				</Link>

				<Link href="/user/register" passHref className="">
					<button>Register</button>
				</Link>

				<Link href="/user/logout" passHref className="">
					<button>Logout</button>
				</Link>
			</header>

			<Navbar />
		</>
	);
}

export default Header;
