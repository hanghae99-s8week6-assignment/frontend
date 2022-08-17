import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "./instance";

axios.defaults.baseURL = process.env.REACT_APP_API; 
axios.defaults.withcredentials = true;

export const getCommentData = createAsyncThunk(
  "comment/getComment",
  async () => {
<<<<<<< HEAD
    const response = await axios.get('/comments');
=======
    const response = await instance.get("/comments");
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    return response.data;
  }
);

export const addCommentData = createAsyncThunk(
  "comment/addComment",
  async (payload) => {
<<<<<<< HEAD
    const response = await axios.post('/comments', payload)
=======
    const response = await instance.post("/comments", payload);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    return response.data;
  }
);

export const deleteCommentData = createAsyncThunk(
  "comment/deleteComment",
  async (payload) => {
<<<<<<< HEAD
    console.log(payload)
    const response = await axios.delete(`/comments/${payload}`)
=======
    console.log(payload);
    const response = await instance.delete(`/comments/${payload}`);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    console.log(response);
    return payload;
  }
);

const CommentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentData.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCommentData.fulfilled, (state, action) => {
      console.log([...state, action.payload]);
      return [...state, action.payload];
    });
    builder.addCase(deleteCommentData.fulfilled, (state, action) => {
      const abcd = [...state].filter((elem) => elem.id !== action.payload);
      console.log(abcd);
      return abcd;
    });
  },
});

export default CommentSlice;
