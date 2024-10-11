import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
     // Log the database name you're connected to
     console.log("Connected to database:", connection.connection.db.databaseName);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToMongoDB;
