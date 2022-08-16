import { configureStore } from "@reduxjs/toolkit";
import  signUpInfo  from "../modules/SignUpSlice";
import  userLogin  from "../modules/LoginSlice";
import postSlice from "../modules/postSlice";
import CommentSlice from "../modules/CommentSlice";

const store = configureStore({
  reducer: {
    signUpInfo,
    userLogin,
    posts: postSlice.reducer,
    comment: CommentSlice.reducer,
  },
});

export default store;
