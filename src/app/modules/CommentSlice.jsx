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
    await instance.post(`/comments/${payload.postId}`, payload.comment);
    return payload;
  }
);

export const deleteCommentData = createAsyncThunk(
  "comment/deleteComment",
  async (payload) => {
    console.log(payload)
    const response = await instance.delete(`/comments/${payload.postID}/${payload.commentId}`);
    console.log(response)
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
      return state = [...state, action.payload];
      // addCase 관련으로 내일 수정이 좀 필요할 거 같음...
      // 데이터 더해주고, 결과값을 자신의 데이터로 반환한다거나 해서.. (바로 갱신되도록.)
    });
    builder.addCase(deleteCommentData.fulfilled, (state, action) => {
        console.log([...state].length)
      return [...state].filter((elem) => { 
        console.log(elem.commentId, action.payload.commentId)
        return elem.commentId !== action.payload.commentId });
    });
  },
});

export default CommentSlice;
