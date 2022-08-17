import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userLogin: [],
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
    "user/login",
    async(payload, thunkAPI) => {
        try{
            const data = await axios.post(
                "http://43.200.178.231/api/user/login", 
                payload
            );
            localStorage.setItem("user", data.data.token)
        return thunkAPI.fulfillWithValue(data.data)
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
  }
);


export const userCheckThunk = createAsyncThunk(
    "user/usercheck",
    async(payload, thunkAPI) => {
        const userData = localStorage.getItem('user')
        try{
            const data = await axios.post(
                "http://43.200.178.231/api/user/usercheck", 
                userData
            );
        return thunkAPI.fulfillWithValue(data.data)
    }
        catch (error) {
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
            alert('완료')
        },
        [loginThunk.rejected]: (state, action) => {
            return alert(action.payload.error), {...state, error : action.payload}
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            return {...state, userLogin: [...state.userLogin, payload ] }
        },
        [loginThunk.rejected]: (state, action) => {
            return alert(action.payload.error), {...state, error : action.payload}
        }
    }
})

export const {} = loginSlice.actions;
export default loginSlice.reducer;
