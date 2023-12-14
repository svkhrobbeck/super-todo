import { Link } from "react-router-dom";
import { FormInput } from "../components";
import signInWithGoogle from "../helpers/signInWithGoogle";
import signInBtn from "/images/google_signin_btn.png";

const SignUpPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <form className="max-w-[340px] w-full flex flex-col">
        <h2 className="font-semibold text-[38px] mb-3 text-center">Sign Up</h2>
        <FormInput name="name" />
        <FormInput type="email" name="email" />
        <FormInput type="password" name="Password" />
        <button className="btn-blue">Sign Up</button>

        <div className="flex w-full items-center my-[10px]">
          <span className="block flex-grow-[1] h-[1px] bg-black"></span>
          <span className="mx-[8px] text-[19px]">or</span>
          <span className="block flex-grow-[1] h-[1px] bg-black"></span>
        </div>
      </form>

      <button className="mb-2" onClick={() => signInWithGoogle()}>
        <img src={signInBtn} alt="sign in with google" />
      </button>

      <p>
        do you have an account? <Link className="text-blue-500" to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
};
export default SignUpPage;
