import axios from 'axios';

const loginUrl = 'https://localhost:44372/api/Auth/login';
const signupUrl = 'https://localhost:44372/api/Auth/register';

// const loginUrl = 'https://zeropoint2.com/api/Auth/login';
// const signupUrl = 'https://zeropoint2.com/api/Auth/register';

export const userLogin = (fromData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = fromData;
      const res = await axios.post(loginUrl, {
        Email: email,
        Password: password,
      });

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
      const res = await axios.post(signupUrl, {
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
