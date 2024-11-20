import axios from 'axios';
import config from '../config';

const client = axios.create({
  baseURL: `https://backend-jxkh.onrender.com/api/cards/`
});
export default client;