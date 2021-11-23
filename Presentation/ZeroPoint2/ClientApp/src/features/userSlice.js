import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = true;
      state.error = '';
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { loginPending, loginSuccess, loginFail } = actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
