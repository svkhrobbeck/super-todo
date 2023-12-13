import axios from "axios";

const signInWithGoogle = async () => {
  const { data } = await axios.post("/auth/request");
  location.href = data.url;
};

export default signInWithGoogle;
