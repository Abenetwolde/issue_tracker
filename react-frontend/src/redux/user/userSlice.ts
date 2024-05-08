import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
  user: JSON.parse(localStorage.getItem('profile')) || null, 
  token: JSON.parse(localStorage.getItem('token')) || null, // Initialize user state from local storage
  isloading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isloading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload)); // Save user to local storage
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload)); // Save user to local storage
    },
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user from local storage
    },
  },
});

export const { setUser, setToken,userLogout, setLoading } = authSlice.actions;

export default authSlice.reducer;
