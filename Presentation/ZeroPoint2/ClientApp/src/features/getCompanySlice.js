import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  companies: [],
  error: '',
};

export const getCompaniesSlice = createSlice({
  name: 'allCompanies',
  initialState,
  reducers: {
    getAllCompaniesPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getAllCompaniesSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getAllCompaniesFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getCompaniesSlice;

export const {
    getAllCompaniesPending,
    getAllCompaniesSuccess,
    getAllCompaniesFail,
} = actions;

export const companies = (state) => state.allCompanies.allCompanies;

export default getCompaniesSlice.reducer;
