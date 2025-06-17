import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting to MongoDB URI:", uri);

    const conn = await mongoose.connect(uri); // Clean and modern

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
