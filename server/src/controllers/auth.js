import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import { generateJwt } from "../helpers/token.js";
import { cookieOptions } from "../helpers/constants.js";

export const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).lean();
  const access_token = generateJwt({ userId: user._id, role: user.role });

  res.cookie("access_token", access_token, cookieOptions);
  res.status(StatusCodes.OK).json({ access_token });
};
