import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ludopedia.com.br/api',
  headers: {
    Authorization: 'Bearer ca6f65ccf7a5b309ead0faa76049ad5c'
  }
});

export default api;
