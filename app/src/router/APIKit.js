//<ROOT>/shared/APIKit.js
import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://192.168.0.11:3030',
  // baseURL: 'https://hellopets-service.herokuapp.com/',
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (tokenType) => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${tokenType}`;
    return config;
  });
};

export default APIKit;
