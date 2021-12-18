import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features//userSlice';
import signupReducer from '../features/signupSlice';
import getProductCategoryForUploadSlice from '../features/productCategoryforUploadSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    getProductCategoryForUpload: getProductCategoryForUploadSlice,
  },
});
