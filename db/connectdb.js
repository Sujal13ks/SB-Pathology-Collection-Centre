import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // if already connected, skip
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw error;
    }
};

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

