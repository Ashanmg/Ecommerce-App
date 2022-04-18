import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features//userSlice';
import signupReducer from '../features/signupSlice';
import getProductCategoryForUploadSlice from '../features/productCategoryforUploadSlice';
import productUploadSlice from '../features/ProductUploadSlice';
import colorTypesForUploadSlice from '../features/colorTypesForUploadSlice';
import getAllProductSlice from '../features/getAllProductSlice';
import companyRegisterSlice from '../features/companyRegisterSlice';
import getCompanySlice from '../features/getCompanySlice';
import getTaxTypeSlice from '../features/taxSlice';
import getAllCompaniesSlice from '../features/getAllCompaniesSlice';
import contactFormSlice from '../features/contactFormSlice';
import companyRemoveSlice from '../features/companyRemoveSlice';
import getProductDetailsSlice from '../features/getProductDetailsSlice';
import getCompanyDetailsSlice from '../features/getCompanyDetailsSlice';
import productRemoveSlice from '../features/productRemoveSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    getProductCategoryForUpload: getProductCategoryForUploadSlice,
    productUpload: productUploadSlice,
    getColorTypesForUpload: colorTypesForUploadSlice,
    getAllProduct: getAllProductSlice,
    companyRegister: companyRegisterSlice,
    getCompanies: getCompanySlice,
    getTaxType: getTaxTypeSlice,
    getAllCompanies: getAllCompaniesSlice,
    connectEmail: contactFormSlice,
    companyRemove: companyRemoveSlice,
    ProductDetails: getProductDetailsSlice,
    companyDetails: getCompanyDetailsSlice,
    productRemove: productRemoveSlice,
  },
});
