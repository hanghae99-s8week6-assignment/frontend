import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";

const initialState = {
  userLogin: [],
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/user/login", payload);
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
    try {
      const data = await instance.get("/user/usercheck");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutAsync = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const res = await instance.get("/user/logout");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

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
