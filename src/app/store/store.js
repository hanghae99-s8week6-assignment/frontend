import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../modules/userSlice';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export default store;
