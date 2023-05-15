import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todosSlice from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: { 
    auth: authReducer,
    todo: todosSlice,
  },
});
