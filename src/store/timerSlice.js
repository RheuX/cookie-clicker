import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 0,
};

const timerSlice = createSlice({
  name: "timer",
  state: initialState,
  reducers: {
    incrementTimer(state, action) {
      state.timer += action.payload;
    },
    resetTimer(state) {
      state.timer = 0;
    },
  },
});

export const { incrementTimer: incrementTimer, resetTimer: resetTimer } =
  timerSlice.actions;

export default timerSlice.reducer;