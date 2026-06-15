import mongoose from "mongoose";
import { seedDatabase } from "./seeder.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.name}`
    );
    
    // Seed default items if the collection is empty
    await seedDatabase();
  } catch (error) {
    console.error("==========================================================");
    console.error("MongoDB Atlas Connection Failed:", error.message);
    console.error("Please check your internet connection and Atlas IP whitelist.");
    console.error("The server will remain active to allow local frontend review.");
    console.error("==========================================================");
  }
};

export default connectDB;