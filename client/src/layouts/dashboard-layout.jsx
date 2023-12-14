import { Outlet, redirect, useLoaderData } from "react-router-dom";
import "../service/axios";
import axios from "axios";
import { Header } from "./../components";

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

  return (
    <>
      <Outlet />
    </>
  );
};
export default DashboardLayout;
