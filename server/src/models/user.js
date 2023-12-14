import { Schema, model } from "mongoose";
import { modelOptions } from "../helpers/constants.js";

const UserSchema = new Schema(
  {
    name: { type: String, default: "Todo User" },
    picture: { type: String, default: null },
    password: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
  },
  modelOptions
);

export default model("User", UserSchema);
