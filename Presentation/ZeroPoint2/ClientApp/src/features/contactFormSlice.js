import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadLoading: false,
  isUploadSuccessful: false,
  uploadError: '',
};

export const contactFormSlice = createSlice({
  name: 'connectEmail',
  initialState,
  reducers: {
    emailRegistrationPending: (state, action) => {
      state.isUploadLoading = true;
      state.uploadError = '';
    },
    emailRegisterSuccessful: (state, action) => {
      state.isUploadLoading = false;
      state.isUploadSuccessful = true;
      state.uploadError = '';
    },
    emailRegisterFail: (state, action) => {
      state.isUploadLoading = false;
      state.uploadError = action.payload;
    },
  },
});

const { reducer, actions } = contactFormSlice;

export const {
  emailRegistrationPending,
  emailRegisterSuccessful,
  emailRegisterFail,
} = actions;

export const selectCompany = (state) => state.connectEmail.connectEmail;

export default contactFormSlice.reducer;
