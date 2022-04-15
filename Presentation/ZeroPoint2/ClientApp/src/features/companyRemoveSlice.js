import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isRemovedSuccessful: false,
  error: '',
};

export const companyRemoveSlice = createSlice({
  name: 'companyRemove',
  initialState,
  reducers: {
    companyRemovePending: (state, action) => {
      state.isLoading = true;
      state.error = '';
    },
    companyRemoveSuccessful: (state, action) => {
      state.isLoading = false;
      state.isRemovedSuccessful = true;
      state.error = '';
    },
    companyRemoveFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = companyRemoveSlice;

export const {
  companyRemovePending,
  companyRemoveSuccessful,
  companyRemoveFail,
} = actions;

export const removeCompany = (state) => state.companyRemove.companyRemove;

export default companyRemoveSlice.reducer;
