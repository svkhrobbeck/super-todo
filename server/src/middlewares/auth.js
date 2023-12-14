import {
  CustomError,
  NotFoundError,
  UnauthenticatedError,
} from "../helpers/errors.js";
import { verifyJwt } from "../helpers/token.js";
import User from "../models/user.js";

export const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnauthenticatedError("invalid authentication");

  const [access, token] = authorization.split(" ");
  const isValidAuth = !token || (access !== "Bearer" && access !== "Token");

  if (isValidAuth) throw new UnauthenticatedError("invalid authentication");

  try {
    const { userId, role } = verifyJwt(token);
    req.user = { userId, role };

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("user doesn't exist");
    next();
  } catch ({ message, name, statusCode }) {
    throw new CustomError(message, name, statusCode);
  }
};
