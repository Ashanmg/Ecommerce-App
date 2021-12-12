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

// const requestInterceptor = (config) => {
//   const token = sessionStorage.getItem('token');
//   config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
//   return config;
// };

export const init = () => {
  axios.defaults.baseURL = 'https://zeropoint2.com/api';
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['X-Request-With'] = 'XMLHTTPRequest';
  axios.interceptors.response.use(responseInterceptor);
  //   axios.interceptors.request.use(requestInterceptor);
};

export const post = (url, data, options = null) =>
  axios.post(url, data, options);

export const get = (url, options = null) => axios.get(url, options);
