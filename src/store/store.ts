import { configureStore } from "@reduxjs/toolkit";
import heroesSlice from './slices/heroesSlice';

export const store = configureStore({
  reducer: {
    heroes: heroesSlice,
  }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;