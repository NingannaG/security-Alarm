import { configureStore } from "@reduxjs/toolkit";
import hoverSlice from "./hoverSlice";

const store = configureStore({
  reducer: {
    hover: hoverSlice,
  },
});

export default store;
