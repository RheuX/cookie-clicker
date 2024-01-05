import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const scoreSlice = createSlice({
  name: "score",
  state: initialState,
  reducers: {
    increment(state, action) {
      state.value += action.payload;
    },
    set(state, action) {
      state.value = action.payload;
    },
  },
});

export const { increment: incrementScore, set: setScore} = scoreSlice.actions;
export default scoreSlice.reducer;
