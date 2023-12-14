import filterObjectFields from "../helpers/filterObjectFields.js";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).lean();
  const filteredUser = filterObjectFields(user, "password");

  res.status(StatusCodes.OK).json({ user:filteredUser });
};
