import signInWithGoogle from "../helpers/signInWithGoogle";
import signInBtn from "/images/google_signin_btn.png";

const SignInPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <button onClick={() => signInWithGoogle()}>
        <img src={signInBtn} alt="sign in with google" />
      </button>
    </div>
  );
};
export default SignInPage;
