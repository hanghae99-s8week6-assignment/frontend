import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";


export const getLikedFetch = createAsyncThunk(
  "liked/getLikedFetch",
  async(payload) => {
    const response = await instance.get(`/post/${payload}/likestatus`)
    console.log(response)
    return response.data;
  }
)

export const toggleLikedFetch = createAsyncThunk(
  "liked/toggleLikedFetch",
  async(payload) => {
    console.log(payload)
    const response = await instance.post(`/post/${payload.postId}/like`)
    console.log(response)
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