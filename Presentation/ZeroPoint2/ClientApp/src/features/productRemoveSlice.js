import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isRemovedSuccessful: false,
  error: '',
};

export const productRemoveSlice = createSlice({
  name: 'productRemove',
  initialState,
  reducers: {
    productRemovePending: (state, action) => {
      state.isLoading = true;
      state.error = '';
    },
    productRemoveSuccessful: (state, action) => {
      state.isLoading = false;
      state.isRemovedSuccessful = true;
      state.error = '';
    },
    productRemoveFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = productRemoveSlice;

export const {
  productRemovePending,
  productRemoveSuccessful,
  productRemoveFail,
} = actions;

export const removeCompany = (state) => state.productRemove.productRemove;

export default productRemoveSlice.reducer;
