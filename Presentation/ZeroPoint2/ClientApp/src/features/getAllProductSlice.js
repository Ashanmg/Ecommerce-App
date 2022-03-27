import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  products: [],
  error: '',
};

export const getAllProductSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    getAllProductPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getAllProductSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getAllProductFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getAllProductSlice;

export const {
    getAllProductPending,
    getAllProductSuccess,
    getAllProductFail,
} = actions;

export const products = (state) => state.allProducts.allProducts;

export default getAllProductSlice.reducer;
