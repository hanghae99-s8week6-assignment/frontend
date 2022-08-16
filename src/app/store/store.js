import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../modules/userSlice";
import postSlice from "../modules/postSlice";
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer,
  },
});

export default store;
