// src/pages/user/login.js

import React, { useEffect } from "react"; //, { useState }
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "@/state/store";

import jwtDecode from "jwt-decode";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useAtom(userAtom);
  const [, setUserToken] = useAtom(userTokenAtom);
  const router = useRouter();

  useEffect(() => {
    console.log("(/user/login) User state updated:", user);
    if (user) {
      router.push(`/user/${user}`);
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    const { username, password } = data;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {

      // const decodedToken = jwtDecode(result.token);
      // console.log("(login) decodedToken :", decodedToken);

      setUserToken(result.token);
      setUser(result.user.steamid); // Store the steamid

      localStorage.setItem("userJWT", result.token);
      localStorage.setItem("userSteamid", result.user.steamid);

      console.log("(/user/login) Login successful");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="login-background login-background-filter">
      <div className="login-container">
        <h1 className="font-w-900 font-motiva-test">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div>
            <label
              htmlFor="username"
              className="text-highlight font-w-500 font-motiva-test text-smaller"
            >
              SIGN IN WITH ACCOUNT NAME
            </label>
            <input
              {...register("username", { required: true })}
              placeholder=""
              type="text"
            />

          </div>

          <div>
            <label
              htmlFor="password"
              className="font-motiva-test font-w-300 text-smaller"
            >
              PASSWORD
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              placeholder=""
              type="password"
            />

          </div>

          <button type="submit" className="signin-button signin-color">
            Sign in
          </button>

          <Link href="/user/register" className="signup-button">
            Don&apos;t have an account yet?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
