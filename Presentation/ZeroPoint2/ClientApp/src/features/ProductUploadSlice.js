import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUploadLoading: false,
  isUploadSuccessful: false,
  uploadError: '',
};

export const productUploadSlice = createSlice({
  name: 'productUpload',
  initialState,
  reducers: {
    productUploadPending(state, action) {
      state.isUploadLoading = true;
      state.uploadError = '';
    },
    productUploadSuccess: (state, action) => {
      state.isUploadLoading = false;
      state.isUploadSuccessful = true;
      state.uploadError = '';
    },
    productUploadFail: (state, action) => {
      state.isUploadLoading = false;
      state.uploadError = action.payload;
    },
  },
});

const { reducer, actions } = productUploadSlice;

export const { productUploadPending, productUploadSuccess, productUploadFail } =
  actions;

export const selectProduct = (state) => state.productUpload.productUpload;

export default productUploadSlice.reducer;
