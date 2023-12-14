import axios from "axios";
import { userinfoTokenUrl as url } from "./urls.js";

const getUserData = async access_token => {
  const { data } = await axios.get(url, { params: { access_token } });
  const { name, picture, email, sub } = data;

  const userData = { name, picture, email, sub };
  return userData;
};

export default getUserData;
