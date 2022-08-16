import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
const initialState = {
    signUpInfo: [],
    isLoading: false,
    error: null,
};

export const signUpThunk = createAsyncThunk(
    "user/signup",
    async(payload, thunkAPI) => {
        try{
            const data = await axios.post(
                "http://43.200.178.231/api/user/signup", 
                payload
             );
        return thunkAPI.fulfillWithValue(data.data)        
    }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const signUpSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: {
        [signUpThunk.fulfilled]: (state, action) => {
           return alert('회원가입이 완료되었습니다.'), {...state, data : action.payload};
        },
        [signUpThunk.rejected]: (state, action) => {
           return alert(action.payload.error), {...state , error : action.payload}
        }
    }
})

export const {} = signUpSlice.actions;
export default signUpSlice.reducer;