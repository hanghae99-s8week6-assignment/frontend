import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "./instance";

const initialState = {
  signUpInfo: [],
  isLoading: false,
  error: null,
};

export const signUpThunk = createAsyncThunk(
<<<<<<< HEAD
    "user/signup",
    async(payload, thunkAPI) => {
        try{
            const data = await axios.post(
                "/user/signup", 
                payload
             );
             
        return thunkAPI.fulfillWithValue(data.data)        
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
=======
  "user/signup",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/user/signup", payload);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    }
  }
);

export const emailCheckThunk = createAsyncThunk(
<<<<<<< HEAD
    "signup/emailCheck",
    async(payload, thunkAPI) => {
        try{
            const data = await axios.get(
                `/user/emailcheck/${payload.email}`, 
                payload
             );
        return thunkAPI.fulfillWithValue(data.data)        
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
=======
  "signup/emailCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(
        `/user/emailcheck/${payload.email}`,
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
>>>>>>> 98fdd6f6d9b37282857e3e373825637d7cd2c8ce
    }
  }
);

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpThunk.fulfilled]: (state, action) => {
      return alert("회원가입에 성공하였습니다.");
    },
    [signUpThunk.rejected]: (state, action) => {
      return alert(action.payload.error), { ...state, error: action.payload };
    },
    [emailCheckThunk.fulfilled]: (state, action) => {
      return alert(action.payload.message), { ...state, error: action.payload };
    },
    [emailCheckThunk.rejected]: (state, action) => {
      return alert(action.payload.error), { ...state, error: action.payload };
    },
  },
});

export const {} = signUpSlice.actions;
export default signUpSlice.reducer;
