import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import { getCookie } from "./../helpers/cookie";

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use(config => {
  const token = getCookie("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
});
