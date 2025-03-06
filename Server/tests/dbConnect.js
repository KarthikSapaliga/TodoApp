import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGODB_URI;

try {
  const db = await mongoose.connect(URI);
  console.log("connected to db.");
} catch (error) {
  console.log(error);
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: "Tests" }
);

const User = mongoose.model("Tests", userSchema);

const newuser = new User({
  email: "abcd@gmail.com",
  password: "asfinfsdk",
});

User.insertOne({
  email: "one user",
  password: "jsdfklas",
});

User.insertMany([
  {
    email: "aaa",
    password: "bbb",
  },
  {
    email: "djfs",
    password: "djsfnkm",
  },
]);

newuser.save();
