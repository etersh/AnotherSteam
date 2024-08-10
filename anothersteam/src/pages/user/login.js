// src/pages/user/login.js

import React, { useEffect } from "react"; //, { useState }
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAtom } from "jotai";
import { userAtom } from "@/state/store";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    console.log("(/user/login) User state updated:", user);
    if (user) {
      router.push(`/user/${user.steamid}`);
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
      localStorage.setItem("userJWT", result.token);
      setUser(result.user); // Update the user state atom

      // console.log("(/user/login) userJWT: ", result.token);
      // console.log("(/user/login) User: ", user);
      console.log("(/user/login) Login successful");

      // router.push(`/user/${user.steamid}`);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="login-background login-background-filter">
      <div className="login-container">
        <h1 className="font-w-900 font-motiva-test">
          Sign in
        </h1>
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
            {/* Uncomment to display errors */}
            {/* {errors.username && <p>{errors.username.message}</p>} */}
          </div>
  
          <div>
            <label htmlFor="password" className="font-motiva-test font-w-300 text-smaller">PASSWORD</label>
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
            {/* Uncomment to display errors */}
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>
  
          <button type="submit" className="signin-button signin-color">
            Sign in
          </button>
  
          <Link href="/user/register" className="signup-button">Don't have an account yet?</Link>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
