import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesState {
  search: string;
}

const initialState: MoviesState = {
  search: "",
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovieSearch: (state, action) => {
      state.search = action.payload;
    }
  },
})

export const { setMovieSearch } = moviesSlice.actions

export default moviesSlice.reducer