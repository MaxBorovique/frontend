import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:1000/api/cards/'
});

export default client;