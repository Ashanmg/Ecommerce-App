import { get, post } from '../config/utils/http';

export const getProductCategoryForUpload = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get('/api/category/getcategoriesforproductupload');

      resolve(res.data.result);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getColorTypesForUpload = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get('/api/product/getcolors');
      resolve(res.data.result);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const productUpload = (fromData) => {
  return new Promise(async (resolve, reject) => {
    console.log('formdata');
    try {
      const res = await post('/api/product/uploadproduct', fromData);
      resolve(res.data);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
        // localStorage.setItem(
        //   'token',
        //   JSON.stringify({ token: res.data.token })
        // );
      }
    } catch (error) {
      // log('error', error);
      reject(error);
    }
  });
};

export const getAllProducts = (pagesize, pageNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get(
        `/api/product/getallproducts/${pageNumber}/${pagesize}`
      );

      resolve(res.data.result);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductsTax = (pagesize, pageNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get(`/api/product/gettaxcategories`);

      resolve(res.data.result);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};
