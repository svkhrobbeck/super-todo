import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, default: "User" },
  picture: { type: String, default: null },
  password: { type: String, default: null },
  email: String,
  sub: String,
});

export default model("User", UserSchema);
