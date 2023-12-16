import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import "../service/axios";
import axios from "axios";
import { Header } from "./../components";
import { toast } from "react-toastify";
import storage from "../helpers/storage";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const dashboardLoader = async () => {
  try {
    const { data } = await axios.get("/user/profile");
    return data;
  } catch (err) {
    storage.remove("access_token");
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("");

  const signOutUser = () => {
    storage.remove("access_token");
    navigate("/sign-in");
    toast.success("signing out...");
  };

  return (
    <DashboardContext.Provider
      value={{ user, signOutUser, passwordType, setPasswordType }}
    >
      <Header />
      <main>
        <Outlet context={{ user }} />
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
