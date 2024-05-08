import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setUser } from './userSlice';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://task-management-opll.onrender.com/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation({

      query: (credentials) => (
        // console.log("login mu..............", credentials),
        {

        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      
      // onSuccess: (data, variables, api) => {
      //   // localStorage.setItem('token', JSON.stringify(data.token)); 
      //   // localStorage.setItem('user', JSON.stringify(data.user));// Save user data to local storage
      //   api.dispatch(setToken(data.token));
      //   api.dispatch(setUser(data.user));  // Dispatch setUser action to update user state
      // },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      onQueryStarted: (mutation, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(() => {
          localStorage.removeItem('user'); // Remove user data from local storage
          dispatch(setUser(null)); // Dispatch setUser action to clear user state
        });
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

// export const selectUser = (state) => state.authApi.user;

// export default authApi.reducer;
