import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: true,
  isPaused: true,
  goal: 100000,
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    toggleActive(state) {
      state.isActive = !state.isActive;
    },
    togglePause(state) {
      state.isPaused = !state.isPaused;
    },
    setGoal(state, action) {
      state.goal = action.payload;
    },
  },
});

export const {
  toggleActive,
  togglePause,
  setGoal,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
