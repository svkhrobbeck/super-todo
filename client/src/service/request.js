import axios from "axios";

export const getRequest = async (url, params = {}) => {
  const { data } = await axios.get(url, { params });
  return data;
};
