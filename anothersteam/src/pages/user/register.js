import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { username, password, steamid } = data;
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, steamid })
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Registration successful', result);
      // Optionally redirect the user to the login page or somewhere else
    } else {
      console.error('Registration failed', result);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: true })}
        placeholder="Username"
        type="text"
      />
      {errors.username && <p>Username is required.</p>}

      <input
        {...register("password", { required: true, minLength: 6 })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <p>Password is required and should be at least 6 characters long.</p>}

      <input
        {...register("steamid", { required: true })}
        placeholder="SteamID"
        type="text"
      />
      {errors.steamid && <p>SteamID is required.</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
