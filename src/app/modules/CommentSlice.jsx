import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentData = createAsyncThunk(
  'comment/getComment',
  async () => {
    const response = await axios.get('http://localhost:3001/comments');
    return response.data;
  }
)

export const addCommentData = createAsyncThunk(
  'comment/addComment',
  async (payload) => {
    const response = await axios.post('http://localhost:3001/comments', payload)
    return response.data;
  }
)

export const deleteCommentData = createAsyncThunk(
  'comment/deleteComment',
  async (payload) => {
    console.log(payload)
    const response = await axios.delete(`http://localhost:3001/comments/${payload}`)
    console.log(response);
    return payload;
  }
)

const CommentSlice = createSlice({
  name:"comment",
  initialState:[],
  reducers:{
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentData.fulfilled, (state, action) => {
      return action.payload;
    })
    builder.addCase(addCommentData.fulfilled, (state, action) => {
        console.log([...state, action.payload])
        return [...state, action.payload]
    })
    builder.addCase(deleteCommentData.fulfilled, (state, action) => {
      const abcd = [...state].filter(elem => elem.id !== action.payload)
      console.log(abcd)
      return abcd;
  })
  }
})

export default CommentSlice;