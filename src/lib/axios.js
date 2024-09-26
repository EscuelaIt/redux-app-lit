import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://timer.escuelait.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  }
});