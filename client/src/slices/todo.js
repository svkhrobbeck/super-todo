import { createSlice } from "@reduxjs/toolkit";

const initialState = { all_todo: [], currentTodo: {} };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo(state, action) {
      state.all_todo = action.payload;
    },
  },
});

export const { setTodo } = todoSlice.actions;
export default todoSlice.reducer;
