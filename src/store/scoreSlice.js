import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementScore(state, action) {
      state.value += action.payload;
    },
    setScore(state, action) {
      state.value = action.payload;
    },
  },
});

export const { incrementScore, setScore } = scoreSlice.actions;
export default scoreSlice.reducer;
