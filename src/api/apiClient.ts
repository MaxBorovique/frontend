import axios from 'axios';

const client = axios.create({
  baseURL: `https://backend-jxkh.onrender.com/api/cards/`
});
export default client;