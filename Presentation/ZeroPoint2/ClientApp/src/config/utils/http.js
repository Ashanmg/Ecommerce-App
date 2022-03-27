/* eslint-disable no-param-reassign */
import axios from 'axios';
import { apiBaseUrl } from '../../config';
import { toCamel } from './toCamel';

const responseInterceptor = ({ data }) => {
  const { requestStatus, message, result } = data;
  let error = null;
  /**
   * NOTE:
   * ExecutionStatus { 0 = None, 1 = Success, 2 = Fail, 3 = Error }
   */
  if (requestStatus === 2) {
    error = { statusCode: requestStatus, message };
  }
  return {
    error,
    data: toCamel(result),
  };
};

const requestInterceptor = (config) => {
  const token = sessionStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

/* Initialize Axios as http */
export const http = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// export const init = () => {
//   axios.defaults.baseURL = apiBaseUrl;
//   axios.defaults.headers['Content-Type'] = 'application/json';
//   axios.defaults.headers['X-Request-With'] = 'XMLHTTPRequest';
//   axios.interceptors.response.use(responseInterceptor);
//   axios.interceptors.request.use(requestInterceptor);
// };

export const post = async (url, data, options = null) => {
  return await http.post(url, data, options);
};

export const get = (url, options = null) => http.get(url, options);
