import { configureStore } from "@reduxjs/toolkit";
import todo from "../slices/todo";

const store = configureStore({
  reducer: {
    todo,
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
