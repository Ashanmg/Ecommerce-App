import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccessFul: false,
  companies: [],
  error: '',
};

export const getAllCompaniesSlice = createSlice({
  name: 'allCompaniesList',
  initialState,
  reducers: {
    getAllCompaniesListPending(state, action) {
      state.isLoading = true;
      state.error = '';
    },
    getAllCompaniesListSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.products = action.payload;
      state.error = '';
    },
    getAllCompaniesListFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = getAllCompaniesSlice;

export const {
    getAllCompaniesListPending,
    getAllCompaniesListSuccess,
    getAllCompaniesListFail,
} = actions;

export const companyList = (state) => state.allCompaniesList.allCompaniesList;

export default getAllCompaniesSlice.reducer;
