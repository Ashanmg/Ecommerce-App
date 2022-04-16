import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  companies: [],
  error: '',
};

export const getProductDetailsSlice = createSlice({
  name: 'ProductDetails',
  initialState,
  reducers: {
    getProductPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getProductSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getProductFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getProductDetailsSlice;

export const {
    getProductPending,
    getProductSuccess,
    getProductFail,
} = actions;

export const companies = (state) => state.companyDetails.companyDetails;

export default getProductDetailsSlice.reducer;
