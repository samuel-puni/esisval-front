import axios from 'axios'
import config from '@/config'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = config.api
} else {
  baseURL = config.api
}

let options = {
  baseURL: baseURL,
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem('token')
  }	
}

let $http = axios.create(options)

$http.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
});

$http.interceptors.response.use(response => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export const HTTP = $http