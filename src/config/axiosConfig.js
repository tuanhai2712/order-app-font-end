import axios from "axios"
import api from "constants/api"

export const post = (url, data) => {
  const config = {
    method: 'post',
    url: api.BASE_API + url,
    data,
  }
  axios.create({
    config: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })
  return axios(config)
}

export const postJWT = (url, data) => {
  const config = {
    method: 'post',
    url: api.BASE_API + url,
    data,
  }
  axios.create({
    config: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })
  axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return axios(config)
}

export const getJWT = (url) => {
  const config = {
    method: 'get',
    url: api.BASE_API + url,
  }
  axios.create({
    config: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })
  axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return axios(config)
}