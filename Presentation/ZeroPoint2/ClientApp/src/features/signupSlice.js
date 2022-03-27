import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isRegisterSuccess: false,
  error: '',
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = '';
    },
    signupFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = signupSlice;

export const { signupPending, signupSuccess, signupFail } = actions;

export const selectUser = (state) => state.user.user;

export default signupSlice.reducer;
