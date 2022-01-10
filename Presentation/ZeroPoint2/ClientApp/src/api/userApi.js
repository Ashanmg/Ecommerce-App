import axios from 'axios';
import { apiBaseUrl } from '../config';
import { post, get } from '../config/utils/http';

// const loginUrl = 'https://localhost:44372/api/Auth/login';
// const signupUrl = 'https://localhost:44372/api/Auth/register';

const loginUrl = `${apiBaseUrl}api/Auth/login`;
const signupUrl = `${apiBaseUrl}api/Auth/register`;

export const userLogin = async (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = fromData;
      const res = await post(loginUrl, {
        Email: email,
        Password: password,
      });

      resolve(res);

      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.userData));
        sessionStorage.setItem('isAuthenticated', true);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({ user: res.data.userData })
        );
        localStorage.setItem('isAuthenticated', true);
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
      const res = await post(signupUrl, {
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
