import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = {
  isConnected: null,
};

const MONGO_URI = process.env.MONGO_URI;
// console.log("Mongo URI: " + MONGO_URI);

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(MONGO_URI);
    connection.isConnected = db.connection.readyState;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
