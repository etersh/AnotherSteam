// src/components/Login.js or src/pages/login.js
// import React, { useState } from 'react';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from 'next/router';

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const { username, password } = data;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("jwt", result.token);
      console.log("Login successful");
      router.push('/user/userInformation');
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
