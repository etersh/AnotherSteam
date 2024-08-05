// src/lib/mongodb.js

// Purpose: connect to mongoDB

// MongoDB connection utility
import mongoose from "mongoose";

// Retrieve the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Check if the MONGODB_URI environment variable is set, if not, throw an error
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Declare a variable to cache the database connection globally
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// asynchronous function to handle database connection
async function dbConnect() {
  // If a cached connection already exists, return it without creating a new connection
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Connect to MongoDB using the MONGODB_URI, and set the options
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Await the promise to establish the connection, cache it, and then return the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
