import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    const { username, password, steamid } = data;
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, steamid }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("Registration successful", result);
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/user/login'); // Use the router to navigate to the login page
      }, 3000);  // Redirect after 3 seconds
    } else {
      console.error("Registration failed", result);
    }
  };

  return (
    <div className="register-background register-background-filter">
      <div className="register-container">
        <h1 className="font-w-900 font-motiva-test">Create an account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div>
            <label
              for="username"
              className="font-w-400 font-motiva-test text-smaller"
            >
              USERNAME
            </label>
            <input
              {...register("username", {
                required: "Please input your username.",
              })}
              type="text"
            />
          </div>

          <div>
            <label
              for="password"
              className="font-w-400 font-motiva-test text-smaller"
            >
              PASSWORD
            </label>
            <input
              {...register("password", {
                required: "Passwords must have at least 8 characters long.",
                minLength: 8,
              })}
              type="password"
            />
          </div>

          <div>
            <label
              for="steamid"
              className="font-w-400 font-motiva-test text-smaller"
            >
              STEAM ID
            </label>
            <input
              {...register("steamid", {
                required: "Please input your steam id.",
              })}
              type="text"
            />
          </div>

          {errors.username && <p>{errors.username.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {errors.steamid && <p>{errors.steamid.message}</p>}

          <button type="submit" className="register-button register-color">
            Register
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
