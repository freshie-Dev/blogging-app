import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToMongoDB;
