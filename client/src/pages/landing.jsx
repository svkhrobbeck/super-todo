import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import getCookie from "../helpers/getCookie";
import { Link, useNavigate } from "react-router-dom";
import landingImg from "/images/landing-img.svg";

const Landing = () => {
  const token = getCookie("access_token");
  console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/sign-in");

    const getData = async () => {
      const { data } = await axios.get("/user/profile");
      console.log(data);
    };

    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Todo Application | Home</title>
      </Helmet>

      <div className="w-full h-screen flex gap-[30px] items-center justify-center">
        <div>
          <h2 className="text-[48px] font-semibold">Todo Application</h2>
          <p className="text-emerald-700 font-medium mb-[10px]">
            (with google authentication)
          </p>
          <div className="flex gap-[10px]">
            <Link className="btn-navy" to="/sign-up">
              Sign Up
            </Link>
            <Link className="btn-navy" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
        <img className="w-[450px] h-auto" src={landingImg} alt="" />
      </div>
    </>
  );
};
export default Landing;
