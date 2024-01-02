import { Outlet, redirect, useLoaderData } from "react-router-dom";
import "../service/axios";
import axios from "axios";
import { Header } from "./../components";
import storage from "../helpers/storage";
import { createContext, useContext, useEffect, useState } from "react";

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

const DashboardLayout = ({ isDarkTheme }) => {
  const { user } = useLoaderData();
  const [type, setType] = useState("all");
  const [theme, setTheme] = useState(isDarkTheme);

  const toggleTheme = () => setTheme((prev) => !prev);

  useEffect(() => {
    storage.set("theme", theme ? "dark" : "light");
    let elHtml = document.documentElement;

    if (theme) elHtml.classList.add("dark");
    else elHtml.classList.remove("dark");
  }, [theme]);

  return (
    <DashboardContext.Provider
      value={{ user, type, theme, toggleTheme, setType }}
    >
      <Header />
      <main className="flex-grow-[1]">
        <Outlet context={{ user }} />
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
