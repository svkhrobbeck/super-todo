import { toast } from "react-toastify";

const errorToast = err => {
  const errors = err.response.data.message?.split(",") || [];
  errors.forEach((err, idx) => toast.error(err, { delay: idx * 100 }));
};
export default errorToast;
