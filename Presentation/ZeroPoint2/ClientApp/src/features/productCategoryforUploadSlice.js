import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  error: '',
};

export const getProductCategoryForUploadSlice = createSlice({
  name: 'getProductCategoryForUpload',
  initialState,
  reducers: {
    getProductCategoryPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getProductCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.error = '';
    },
    getProductCategoryFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getProductCategoryForUploadSlice;

export const {
  getProductCategoryPending,
  getProductCategorySuccess,
  getProductCategoryFail,
} = actions;

export const selectProduct = (state) => state.product.product;

export default getProductCategoryForUploadSlice.reducer;
