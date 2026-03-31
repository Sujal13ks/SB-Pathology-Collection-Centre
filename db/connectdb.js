import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// check env
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in env ❌");
}

// global cache (important for Next.js)
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  try {
    // already connected
    if (cached.conn) return cached.conn;

    // create connection
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;

    console.log("MongoDB Connected ✅");

    return cached.conn;
  } catch (error) {
    console.log("MongoDB Error:", error);
    throw error;
  }
}

export default connectDB;
// import mongoose from "mongoose";

// const MONGODB_URI = "mongodb://localhost:27017/logindb";

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI);
//   }

//   cached.conn = await cached.promise;
//   global.mongoose = cached;

//   return cached.conn;
// }

// export default connectDB;

