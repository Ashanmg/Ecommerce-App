import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  companies: [],
  error: '',
};

export const getCompanyDetailsSlice = createSlice({
  name: 'companyDetails',
  initialState,
  reducers: {
    getCompanyPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getCompanySuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getCompanyFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getCompanyDetailsSlice;

export const {
    getCompanyPending,
    getCompanySuccess,
    getCompanyFail,
} = actions;

export const companies = (state) => state.companyDetails.companyDetails;

export default getCompanyDetailsSlice.reducer;
