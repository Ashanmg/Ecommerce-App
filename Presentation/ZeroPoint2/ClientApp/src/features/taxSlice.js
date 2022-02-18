import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  taxType: [],
  error: '',
};

export const getTaxTypeSlice = createSlice({
  name: 'taxType',
  initialState,
  reducers: {
    getTaxPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getTaxSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getTaxFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getTaxTypeSlice;

export const {
    getTaxPending,
    getTaxSuccess,
    getTaxFail,
} = actions;

export const tax = (state) => state.taxType.taxType;

export default getTaxTypeSlice.reducer;
