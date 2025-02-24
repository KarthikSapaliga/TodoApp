import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";

export async function register(req, res, next) {
  const data = req.body;

  if (!data.email || !data.password) {
    return next(createError(404, "email or password is missing!"));
  }

  await connectToDB();
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) {
    return next(createError(404, "User already exists!"));
  }

  console.log(data);
  res.send("register route");
}

export async function login(req, res, next) {
  res.send("login route");
}

export async function logout(req, res, next) {
  res.send("logout route");
}
