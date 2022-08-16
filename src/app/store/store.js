import { configureStore } from "@reduxjs/toolkit";
import { signUpInfo } from "../modules/SignUpSlice";
import { userLogin } from "../modules/LoginSlice";
import postSlice from "../modules/postSlice";

const store = configureStore({
  reducer: {
    signUpInfo,
    userLogin,
    posts: postSlice.reducer,
  },
});

export default store;
