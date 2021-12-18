import { get } from '../config/utils/http';

export const getProductCategoryForUpload = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get('/api/category/getcategoriesforproductupload');
      resolve(res.data);

      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'token',
          JSON.stringify({ token: res.data.token })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};
