import { Outlet } from "react-router-dom";
import { Footer } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
export default HomeLayout;
