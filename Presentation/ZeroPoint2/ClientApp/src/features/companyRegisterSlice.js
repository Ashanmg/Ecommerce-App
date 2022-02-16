import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadLoading: false,
  isUploadSuccessful: false,
  uploadError: '',
};

export const companyRegisterSlice = createSlice({
  name: 'companyRegister',
  initialState,
  reducers: {
    companyRegisterPending: (state, action) => {
      state.isUploadLoading = true;
      state.uploadError = '';
    },
    companyRegisterSuccessful: (state, action) => {
      state.isUploadLoading = false;
      state.isUploadSuccessful = true;
      state.uploadError = '';
    },
    companyRegisterFail: (state, action) => {
      state.isUploadLoading = false;
      state.uploadError = action.payload;
    },
  },
});

const { reducer, actions } = companyRegisterSlice;

export const {
  companyRegisterPending,
  companyRegisterSuccessful,
  companyRegisterFail,
} = actions;

export const selectCompany = (state) => state.companyRegister.companyRegister;

export default companyRegisterSlice.reducer;
