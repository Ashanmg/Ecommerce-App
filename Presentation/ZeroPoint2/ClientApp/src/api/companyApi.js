import { get, post } from '../config/utils/http';

export const companyRegister = (fromData) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('token');
    try {
      const res = await post('/api/admin/company/registercompany', fromData, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      });

      resolve(res.data);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
        // localStorage.setItem(
        //   'token',
        //   JSON.stringify({ token: res.data.token })
        // );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllCompaniesToSelect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await get(`/api/admin/company/getcompanylistforselect`);

      resolve(res.data.result);

      if (res.status === 200) {
        // sessionStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};
