import { Form, Link, redirect, useActionData } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormInput, SubmitBtn } from "../components";
import signInWithGoogle from "../helpers/signInWithGoogle";
import signInBtn from "/images/google_signin_btn.svg";
import axios from "axios";
import { toast } from "react-toastify";
import storage from "../helpers/storage";
import errorToast from "../helpers/errorToast";
import { SUCCESS_TOAST_OPT } from "../helpers/constants";

export const signInAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const { data } = await axios.post("/auth/login", payload);
    // setCookie("access_token", data.access_token, 14);
    if (data.access_token) {
      storage.set("access_token", data.access_token);
    } else return;

    toast.success("Sign-in successful", SUCCESS_TOAST_OPT);
    return redirect("/dashboard");
  } catch (err) {
    errorToast(err);
    return err;
  }
};

export const signInLoader = () => {
  const token = new URLSearchParams(location.search).get("access");
  const access_token = storage.get("access_token");

  if (!access_token && token) {
    storage.set("access_token", token);
  }

  if ((access_token && !token) || token) {
    toast.success("Sign-in successful", SUCCESS_TOAST_OPT);
    return redirect("/dashboard");
  }
  return null;
};

const SignInPage = () => {
  const data = useActionData();

  return (
    <>
      <Helmet>
        <title>Todo Application | Sign In</title>
      </Helmet>
      <section className="container flex flex-col justify-center items-center w-full h-screen">
        <Form className="max-w-[480px] w-full flex flex-col" method="POST">
          <h2 className="font-semibold text-[38px] mb-3 text-center">
            Sign In
          </h2>

          {data?.response?.data?.warn ? (
            <div className="alert-orange">{data.response.data?.warn}</div>
          ) : null}

          <FormInput type="email" name="email" />
          <FormInput type="password" name="password" />
          <SubmitBtn className="btn-teal" text="Sign In" />

          <div className="flex w-full items-center my-[10px]">
            <span className="block flex-grow-[1] h-[1px] bg-black"></span>
            <span className="mx-[8px] text-[19px]">or</span>
            <span className="block flex-grow-[1] h-[1px] bg-black"></span>
          </div>
        </Form>

        <button
          className="mb-2 rounded-[4px] overflow-hidden"
          onClick={() => signInWithGoogle()}
        >
          <img src={signInBtn} alt="sign-in with google" />
        </button>

        <p>
          don't have an account?{" "}
          <Link className="text-teal-600" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </section>
    </>
  );
};
export default SignInPage;
