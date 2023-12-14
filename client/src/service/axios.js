import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
// import { getCookie } from "./../helpers/cookie";
import storage from "../helpers/storage";

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use(config => {
  // const token = getCookie("access_token");
  const token = storage.get("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
});
