import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userLogin: [],
  isLoading: false,
  error: null,
};
axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

export const loginThunk = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("/user/login", payload);
      localStorage.setItem("user", data.data.token);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userCheckThunk = createAsyncThunk(
  "user/usercheck",
  async (thunkAPI) => {
    const userData = localStorage.getItem("user");
    try {
      const data = await axios.get("/user/usercheck", {
        headers: {
          Authorization: userData,
        },
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, action) => {
      state.userLogin.push(action.payload);
    },
    [loginThunk.rejected]: (state, action) => {
      return alert(action.payload.error), { ...state, error: action.payload };
    },
    [userCheckThunk.fulfilled]: (state, { payload }) => {
      return { ...state, userLogin: [...state.userLogin, payload] };
    },
    [userCheckThunk.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {} = loginSlice.actions;
export default loginSlice.reducer;
