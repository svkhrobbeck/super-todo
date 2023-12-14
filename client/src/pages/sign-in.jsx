import { Form, Link, redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormInput } from "../components";
import signInWithGoogle from "../helpers/signInWithGoogle";
import signInBtn from "/images/google_signin_btn.png";
import axios from "axios";
import { setCookie } from "../helpers/cookie";
import { toast } from "react-toastify";

export const signInAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const { data } = await axios.post("/auth/login", payload);
    setCookie("access_token", data.access_token, 14);
    toast.success("Sign-in successful");
    return redirect("/dashboard");
  } catch (err) {
    return err;
  }
};

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
        <Form className="max-w-[340px] w-full flex flex-col" method="POST">
          <h2 className="font-semibold text-[38px] mb-3 text-center">
            Sign In
          </h2>
        <FormInput type="email" name="email" />
          <FormInput type="password" name="password" />
        <button className="btn-blue">Sign In</button>

        <div className="flex w-full items-center my-[10px]">
          <span className="block flex-grow-[1] h-[1px] bg-black"></span>
          <span className="mx-[8px] text-[19px]">or</span>
          <span className="block flex-grow-[1] h-[1px] bg-black"></span>
        </div>
        </Form>

      <button className="mb-2" onClick={() => signInWithGoogle()}>
        <img src={signInBtn} alt="sign in with google" />
      </button>

      <p>
        don't have an account?{" "}
        <Link className="text-blue-500" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </div>
    </>
  );
};
export default SignInPage;
