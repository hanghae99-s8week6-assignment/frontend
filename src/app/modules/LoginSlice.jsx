import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";

const initialState = {
  userLogin: [],
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
<<<<<<< HEAD
    "user/login",
    async(payload, thunkAPI) => {
        try{
            const data = await axios.post(
                "/user/login", 
                payload
            );
            localStorage.setItem("user", data.data.token)
        return thunkAPI.fulfillWithValue(data.data)
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
=======
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/user/login", payload);
      localStorage.setItem("user", data.data.token);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    }
);

export const userCheckThunk = createAsyncThunk(
<<<<<<< HEAD
    "user/usercheck",
    async(payload, thunkAPI) => {
        const userData = localStorage.getItem('user')
        try{
            const data = await axios.post(
                "/user/usercheck", 
                userData
            );
        return thunkAPI.fulfillWithValue(data.data)
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
=======
  "user/usercheck",
  async (thunkAPI) => {
    try {
      const data = await instance.get("/user/usercheck");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
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
