import filterObjectFields from "../helpers/filterObjectFields.js";
import { hashPass } from "../helpers/password.js";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).lean();
  const filteredUser = filterObjectFields(user, "password");

  res.status(StatusCodes.OK).json({ user: filteredUser });
};

export const updateUserProfile = async (req, res) => {
  const { email, name } = req.body;
  await User.findByIdAndUpdate(req.user.userId, { email, name }, { new: true });

  res.status(StatusCodes.OK).json({ message: "user updated" });
};

export const updatePassword = async (req, res) => {
  const hashedPassword = await hashPass(req.body.password);
  await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });

  res.status(StatusCodes.OK).json({ message: "password updated" });
};
