import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
  // upgrade index 0-5
  cost: [0, 0, 0, 0, 0, 0],
};

const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    setUpgrade(state, action) {
      state.value = action.payload;
    },
    incrementUpgrade(state, action) {
      state.value += action.payload;
    },
    setCost(state, action) {
      const { index, amount } = action.payload;
      const updatedCost = [...state.cost]; // Create a copy of the original array
      updatedCost[index] = amount; // Update value
      state.cost = updatedCost;
    },
  },
});

export const { setUpgrade, incrementUpgrade, setCost } = upgradeSlice.actions;
export default upgradeSlice.reducer;
