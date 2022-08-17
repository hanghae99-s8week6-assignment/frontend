import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";

const initialState = [];

export const getPostAysnc = createAsyncThunk(
  "post/getPostThunk",
  async (thunkAPI) => {
    try {
<<<<<<< HEAD
      // const res = await axios.get("/api/posts");
      const res = await axios.get("/post");
=======
      const res = await instance.get("/post");
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
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
<<<<<<< HEAD
      // const res = await axios.post("/api/post", data);
      const res = await axios.post("/post", data, {
        withCredentials: true,
      });
=======
      const res = await instance.post("post", data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
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
<<<<<<< HEAD
      const res = await axios.get("/post");
      const pick = res.data.find((post) => post.postid === data);
=======
      const res = await instance.get("/post");
      const pick = res.data.Post.find((post) => post.postId === data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
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
<<<<<<< HEAD
      const res = await axios.delete(
        `/posts/${payload}`,
        payload
      );
=======
      const res = await instance.delete(`/post/${payload}`, payload);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
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
