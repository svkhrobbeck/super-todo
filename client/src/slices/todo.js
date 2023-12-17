import { createSlice } from "@reduxjs/toolkit";

const initialState = { all_todo: [], total_pages: 0, currentTodo: {} };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo(state, action) {
      state.all_todo = action.payload;
    },
    setTotalPages(state, action) {
      state.total_pages = action.payload;
    },
  },
});

export const { setTodo, setTotalPages } = todoSlice.actions;
export default todoSlice.reducer;
