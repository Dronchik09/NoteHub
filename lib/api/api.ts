import axios from 'axios';

export const nextServer = axios.create({
  // process.env.NEXT_PUBLIC_API_URL +
  baseURL: '/api',
  withCredentials: true,
});
//const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
