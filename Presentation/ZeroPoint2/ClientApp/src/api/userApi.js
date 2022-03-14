import axios from 'axios';
import { apiBaseUrl } from '../config';
import { post, get } from '../config/utils/http';

// const loginUrl = 'https://localhost:44372/api/Auth/login';
// const signupUrl = 'https://localhost:44372/api/Auth/register';

const loginUrl = `${apiBaseUrl}api/Auth/login`;
const signupUrl = `${apiBaseUrl}api/Auth/register`;
const connectEmailUrl = `${apiBaseUrl}api/common/contactbyemail`;

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
        localStorage.setItem(
          'user',
          JSON.stringify({ user: res.data.userData })
        );
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.userData));        
        localStorage.setItem('token', res.data.token);

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

export const contactEmailRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, message } = data;
      const res = await post(connectEmailUrl, {
        Name: name,
        Email: email,
        message: message,
      });

      resolve(res.data);
      console.log(res);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      reject(error);
    }
  });
};
