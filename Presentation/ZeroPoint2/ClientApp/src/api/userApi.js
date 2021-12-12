import axios from 'axios';
import { post, get } from '../config/utils/http';

export const userLogin = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = fromData;
      const res = await post('/Auth/login', {
        Email: email,
        Password: password,
      });
      console.log(res);
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

export const userSingUp = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = fromData;
      const res = await post('/Auth/register', {
        Name: name,
        Email: email,
        Password: password,
      });

      resolve(res.data);

      if (res.status === 201) {
        return res.data;
      }
    } catch (error) {
      reject(error);
    }
  });
};
