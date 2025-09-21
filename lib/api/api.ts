import axios, { AxiosError } from 'axios';

export type ApiError<T = { message?: string; error?: string }> = AxiosError<T>;

const baseURL = process.env.NEXT_PUBLIC_API_URL;// + '/api';

const internalApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default internalApi;
