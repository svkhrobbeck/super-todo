import { Schema, model } from "mongoose";
import { modelOptions } from "../helpers/constants.js";

const UserSchema = new Schema(
  {
    name: { type: String, default: "User" },
    picture: { type: String, default: null },
    password: { type: String, default: null },
    email: { type: String, unique: true },
    sub: String,
  },
  modelOptions
);

export default model("User", UserSchema);
