import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register route
export async function register(req, res, next) {
  const data = req.body;
  if (!data?.email || !data?.password) {
    return next(createError(400, "email or password is missing!"));
  }

  await connectToDB();
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) {
    return next(createError(404, "User already exists!"));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.password, salt);

  const newUser = new User({ ...data, password: hash });
  await newUser.save();

  res.status(201).json("User registered!");
}

// login route
export async function login(req, res, next) {
  const data = req.body;
  if (!data.email || !data.password) {
    return next(createError(400, "Email or password is missing!"));
  }

  await connectToDB();
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return next(createError(400, "Invalid credentials."));
  }

  const isPassword = await bcrypt.compare(data.password, user.password);
  if (!isPassword) {
    return next(createError(400, "Invalid credentials."));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
  res.cookie("acess_token", token);
  res.status(200).json("User logged in!");
}

// logout route
export async function logout(req, res, next) {
  res.clearCookie("acess_token");
  res.status(200).json("logged out successfully!");
}
