import mongoose from "mongoose";

const connection = {
  isConnected: null,
};

const MONGO_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(MONGO_URI);
    connection.isConnected = db.connection[0].readyState;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
