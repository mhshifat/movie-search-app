import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    moviesState: moviesReducer
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch