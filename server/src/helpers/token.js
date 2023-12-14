import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "./constants.js";

export const generateJwt = payload => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  return token;
};

export const verifyJwt = token => {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};
