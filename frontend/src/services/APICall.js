import axios from 'axios'

const API = 'https://stw-zitation.herokuapp.com/api/'



// Create instance called instance
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    console.log(config);
    config.baseURL = API;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};