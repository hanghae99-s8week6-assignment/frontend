import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];

const accessToken = localStorage.getItem("user");

export const getPostAysnc = createAsyncThunk(
  "post/getPostThunk",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/post");
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
      const res = await axios.post("post", data, {
        headers: {
          Authorization: accessToken,
        },
      });
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
      const res = await axios.get("/post");
      const pick = res.data.find((post) => post.postid === data);
      return pick;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostAysnc = createAsyncThunk(
  "post/deletepostThunk",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.delete(`/post/${payload}`, payload);
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      .addCase(postPostAysnc.pending, (state, action) => ({
        ...state,
        postLoading: false,
      }))
      .addCase(postPostAysnc.fulfilled, (state, action) => ({
        data: action.payload,
        ...state,
        postLoading: true,
      }))
      .addCase(pickPostAysnc.fulfilled, (state, action) => {
        return (state = action.payload);
      });
  },
});

export default postSlice;
