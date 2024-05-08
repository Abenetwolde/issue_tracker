// 
import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import authSlice  from '../redux/user/userSlice'; // Updated import
// import firewall from '../redux/firewall/firewall';
// import authApi from './user/authApi';

import { authApi } from './user/authApi';
const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer, // Include authSlice reducer
  
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, firewallApi.middleware), // Add auth and
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
