import Axios from 'axios';

const baseConfig = {
  baseURL: 'https://timer.escuelait.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  }
}

export const getAxios = (token) => {
  if(!token) {
    return Axios.create(baseConfig);
  } else {
    const tokenConfig = {
      ...baseConfig
    }
    tokenConfig.headers.Authorization = `Bearer ${token}`;
    console.log(tokenConfig);
    return Axios.create(tokenConfig);
  }
}