import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import queryReducer from './slices/querySlice';
import authSlice  from '../redux/user/userSlice';
// import { authApi } from '../user/authApi';
import { authApi } from '../redux/user/authApi';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    query: queryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
