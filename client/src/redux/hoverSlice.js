import { createSlice } from "@reduxjs/toolkit";

const initialHoverSlice = {
  hoveredMarker: -1,
};

const hoverSlice = createSlice({
  name: "hover",
  initialState: initialHoverSlice,
  reducers: {
    setHoveredMarker: (state, action) => {
      state.hoveredMarker = action.payload;
    },
  },
});

export const { setHoveredMarker } = hoverSlice.actions;
export default hoverSlice.reducer;
