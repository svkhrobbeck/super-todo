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
        <img
          className="w-[450px] h-auto"
          src={landingImg}
          alt="landing illustration"
        />
      </div>
    </>
  );
};
export default Landing;
