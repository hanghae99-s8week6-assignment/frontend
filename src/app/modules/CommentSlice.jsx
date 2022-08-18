import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./instance";

export const getCommentData = createAsyncThunk(
  "comment/getComment",
  async (payload, thunkAPI) => {
    try {
      const response = await (await instance.get(`/comments/${payload}`)).data.data;
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCommentData = createAsyncThunk(
  "comment/addComment",
  async (payload) => {
    const response = await instance.post(`/comments/${payload.postId}`, payload.comment);
    return response.data;
  }
);

export const deleteCommentData = createAsyncThunk(
  "comment/deleteComment",
  async (payload) => {
    const response = await instance.delete(`/comments/${payload.commentId}`);
    return payload;
  }
);

const CommentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentData.fulfilled, (state, action) => {
      return state = action.payload;
    });
    builder.addCase(addCommentData.fulfilled, (state, action) => {
      return state = action.payload.comment;
    });
    builder.addCase(deleteCommentData.fulfilled, (state, action) => {
      return [...state].filter((elem) => { 
        return elem.commentId !== action.payload.commentId });
    });
  },
});

export default CommentSlice;
