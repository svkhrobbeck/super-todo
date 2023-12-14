import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import "../service/axios";
import axios from "axios";
import { Header } from "./../components";
import { toast } from "react-toastify";
import storage from "../helpers/storage";

export const dashboardLoader = async () => {
  try {
    const { data } = await axios.get("/user/profile");
    return data;
  } catch (err) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logoutUser = () => {
    storage.remove("access_token");
    navigate("/sign-in");
    toast.success("Logging out...");
  };

  return (
    <>
      <Outlet />
    </>
  );
};
export default DashboardLayout;
