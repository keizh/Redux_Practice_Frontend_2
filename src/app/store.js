import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "../features/MovieSlice/MovieSlice";

const store = configureStore({
  reducer: {
    Movies: MovieSlice.reducer,
  },
});

export default store;
