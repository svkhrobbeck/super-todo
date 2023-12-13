import axios from "axios";
import { userinfoTokenUrl as url } from "./urls";

const getUserData = async access_token => {
  const { data } = await axios.get(url, { params: { access_token } });
  return data;
};

export default getUserData;
