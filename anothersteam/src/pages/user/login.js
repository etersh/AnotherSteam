// src/pages/user/login.js

import React, { useEffect } from "react"; //, { useState }
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
  }, [user]);

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

      console.log("(/user/login) userJWT: ", result.token);
      console.log("(/user/login) User: ", user);
      console.log("(/user/login) Login successful");

      // router.push(`/user/${user.steamid}`);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Username is required" })}
        placeholder="Username"
        type="text"
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
