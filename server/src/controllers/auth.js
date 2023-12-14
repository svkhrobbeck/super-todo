import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import { generateJwt } from "../helpers/token.js";
import { passwordEmptyErrors } from "../helpers/constants.js";
import { BadRequestError, UnauthenticatedError } from "./../helpers/errors.js";
import { comparePass, hashPass } from "../helpers/password.js";

export const registerUser = async (req, res) => {
  const hashedPassword = await hashPass(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "user created" });
};

export const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user.password) {
    throw new BadRequestError(passwordEmptyErrors);
  }

  const access_token = generateJwt({ userId: user?._id, role: user.role });

  const isValidPassword = await comparePass(password, user.password);
  if (!isValidPassword) throw new UnauthenticatedError("invalid credentials");

  res.status(StatusCodes.OK).json({ access_token });
};
