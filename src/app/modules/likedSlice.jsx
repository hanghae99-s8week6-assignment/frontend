import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";


export const getLikedFetch = createAsyncThunk(
  "liked/getLikedFetch",
  async(payload) => {
    const response = await instance.get(`/post/${payload}/likestatus`)
    return response.data;
  }
)

export const toggleLikedFetch = createAsyncThunk(
  "liked/toggleLikedFetch",
  async(payload) => {
    const response = await instance.post(`/post/${payload.postId}/like`)
    return response.data;

  }
)

const likedSlice = createSlice({
  name:"liked",
  initialState: {
  },
  extraReducers: builder => {
    builder.addCase(getLikedFetch.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(toggleLikedFetch.fulfilled, (state, action) => {
      return action.data
    })
  }
})

export default likedSlice;