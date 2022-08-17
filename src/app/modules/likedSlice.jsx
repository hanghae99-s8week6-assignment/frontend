import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";


export const getLikedFetch = createAsyncThunk(
  "liked/getLikedFetch",
  async(payload) => {
    const response = await instance.post(`/post/${payload.postId}/like`, payload)
    return response.data;
  }
)

export const toggleLikedFetch = createAsyncThunk(
  "liked/toggleLikedFetch",
  async(payload) => {
    const response = await instance.post(`/post/${payload.postId}/like`, payload)
    return response.data;
  }
)

const likedSlice = createSlice({
  name:"liked",
  initialState: {
    liked : 0,
    isclick: false,
  },
  extraReducers: builder => {
    builder.addCase(toggleLikedFetch.fulfilled, (state, action) => {
      return action.result
  })}
})

export default likedSlice;