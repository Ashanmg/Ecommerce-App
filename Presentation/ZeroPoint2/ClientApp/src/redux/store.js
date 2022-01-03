import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features//userSlice';
import signupReducer from '../features/signupSlice';
import getProductCategoryForUploadSlice from '../features/productCategoryforUploadSlice';
import productUploadSlice from '../features/ProductUploadSlice';
import colorTypesForUploadSlice from '../features/colorTypesForUploadSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    getProductCategoryForUpload: getProductCategoryForUploadSlice,
    productUpload: productUploadSlice,
    getColorTypesForUpload: colorTypesForUploadSlice
  },
});
