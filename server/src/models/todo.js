import { Schema, Types, model } from "mongoose";
import { modelOptions } from "../helpers/constants.js";

const TodoSchema = new Schema(
  {
    author: { type: Types.ObjectId, ref: "User" },
    task: { type: String, required: true },
    details: { type: String, default: null },
    status: { type: Boolean, default: false },
  },
  modelOptions
);

export default model("Todo", TodoSchema);
