import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ADD_USER: (state, action) => {
      return state = [...state, action.payload] 
    },
  },
});
