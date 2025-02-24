import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.acess_token;
  console.log(token);
  if (!token) {
    return next(createError(401, "Not authenticated"));
  }
  jwt.verify(token, process.env.JWT_TOKEN, (error, user) => {
    if (error) return next(createError(403, "Invalid token"));
    req.user = user;
    next();
  });
};
