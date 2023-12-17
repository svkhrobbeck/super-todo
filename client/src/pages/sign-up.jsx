import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import signInWithGoogle from "../helpers/signInWithGoogle";
import signUpBtn from "/images/google_signup_btn.svg";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";
import errorToast from "../helpers/errorToast";
import storage from "../helpers/storage";

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    await axios.post("/auth/register", payload);
    toast.success("Sign-up successful");
    return redirect("/sign-in");
  } catch (err) {
    errorToast(err);
    return err;
  }
};

export const signUpLoader = () => {
  const access_token = storage.get("access_token");

  if (access_token) {
    toast.success("Sign-in successful");
    return redirect("/dashboard");
  }

  return null;
};

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Application | Sign Up</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <Form className="max-w-[480px] w-full flex flex-col" method="POST">
          <h2 className="font-semibold text-[38px] mb-3 text-center">
            Sign Up
          </h2>
          <FormInput name="name" />
          <FormInput type="email" name="email" />
          <FormInput type="password" name="password" />
          <SubmitBtn className="btn-teal" text="Sign Up" />

          <div className="flex w-full items-center my-[10px]">
            <span className="block flex-grow-[1] h-[1px] bg-black"></span>
            <span className="mx-[8px] text-[19px]">or</span>
            <span className="block flex-grow-[1] h-[1px] bg-black"></span>
          </div>
        </Form>

        <button className="mb-2" onClick={() => signInWithGoogle()}>
          <img src={signUpBtn} alt="sign-up with google" />
        </button>

        <p>
          do you have an account?{" "}
          <Link className="text-teal-600" to="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};
export default SignUpPage;
