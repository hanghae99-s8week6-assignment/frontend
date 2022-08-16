import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];

export const getPostAysnc = createAsyncThunk(
  "post/getPostThunk",
  async (thunkAPI) => {
    try {
      // const res = await axios.get("/api/posts");
      const res = await axios.get("http://localhost:3001/Posts");
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postPostAysnc = createAsyncThunk(
  "post/postThunk",
  async (data, thunkAPI) => {
    try {
      // const res = await axios.post("/api/post", data);
      const res = await axios.post("http://localhost:3001/Posts", data);
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pickPostAysnc = createAsyncThunk(
  "pst/pickPostThunk",
  async (data, thunkAPI) => {
    try {
      // const res = axios.get("/api/posts");
      const res = await axios.get("http://localhost:3001/Posts");
      const pick = res.filter((post) => post.postid === data);
      return pick;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostAysnc = createAsyncThunk(
  'post/deletepostThunk',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:3001/Posts/${payload}`, payload);
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
)


export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAysnc.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }))
      .addCase(postPostAysnc.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
      }))
      .addCase(pickPostAysnc.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default postSlice;
