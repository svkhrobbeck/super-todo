import { Helmet } from "react-helmet";
import { Link, redirect } from "react-router-dom";
import landingImg from "/images/landing-img.svg";
import storage from "../helpers/storage";
import { toast } from "react-toastify";

export const landingLoader = () => {
  const access_token = storage.get("access_token");

  if (access_token) {
    toast.success("Sign-in successful");
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
        <div className="flex flex-col h-full justify-center">
          <img
            className="block cursor-pointer mx-auto mb-[80px] w-[250px] 2xl:w-[235px] xl:w-[210px] lg:w-[190px] md:w-[175px] sm:w-[170px]"
            src="/images/logo-teal.svg"
            alt="logo teal"
          />
          <div className="flex gap-[30px] lg:gap-[20px] items-center justify-center md:text-center">
            <div className="flex flex-col">
              <h2 className="text-[48px] xl:text-[45px] lg:text-[38px] md:text-[34px] mb-[12px] font-semibold">
                Todo Application
              </h2>
              <p className="text-emerald-700 font-medium mb-[10px]">
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
              className="md:hidden w-[450px] xl:w-[400px] lg:w-[355px] md:w-[320px] h-auto"
              src={landingImg}
              alt="landing illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Landing;
