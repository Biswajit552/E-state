import jwt from "jsonwebtoken";
import { errorHandller } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandller(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandller(403, "forbidden"));

    req.user = user;
    next();
  });
};
