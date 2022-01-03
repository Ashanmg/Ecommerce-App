import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  error: '',
};

export const getColorTypesForUploadSlice = createSlice({
  name: 'getColorTypesForUpload',
  initialState,
  reducers: {
    getColorTypesPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getColorTypesSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.error = '';
    },
    getColorTypesFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getColorTypesForUploadSlice;

export const {
    getColorTypesPending,
    getColorTypesSuccess,
    getColorTypesFail,
} = actions;

export const selectColor = (state) => state.product.product;

export default getColorTypesForUploadSlice.reducer;
