import { Helmet } from "react-helmet";
import { Link, redirect } from "react-router-dom";
import landingImg from "/images/landing-img.svg";
import storage from "../helpers/storage";
import { toast } from "react-toastify";
import { SUCCESS_TOAST_OPT } from "../helpers/constants";

export const landingLoader = () => {
  const access_token = storage.get("access_token");

  if (access_token) {
    toast.success("Sign-in successful", SUCCESS_TOAST_OPT);
    return redirect("/dashboard");
  }

  return null;
};

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Todo Application | Home</title>
      </Helmet>

      <section className="w-full h-screen">
        <div className="h-full flex gap-[30px] lg:gap-[20px] items-center justify-center md:flex-col-reverse md:text-center">
          <div className="flex flex-col md:items-center md:w-full">
            <img
              className="mb-[12px] block cursor-pointer w-[290px] 2xl:w-[275px] xl:w-[250px] lg:w-[230px] md:w-[215px] sm:w-[80%]"
              src="/images/logo-teal.svg"
              alt="logo teal"
            />
            <p className="text-teal-600 font-medium mb-[10px]">
              (with google authentication)
            </p>
            <div className="flex gap-[10px] md:justify-center">
              <Link className="btn-teal" to="/sign-up">
                Sign Up
              </Link>
              <Link className="btn-teal" to="/sign-in">
                Sign In
              </Link>
            </div>
          </div>
          <img
            className="w-[450px] xl:w-[400px] lg:w-[355px] md:w-[320px] md:mb-[24px] h-auto"
            src={landingImg}
            alt="landing illustration"
          />
        </div>
      </section>
    </>
  );
};
export default Landing;
