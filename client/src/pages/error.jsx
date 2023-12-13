import { useRouteError, useLocation, Link } from "react-router-dom";
import notFoundImage from "/images/not-found.svg";

const ErrorPage = () => {
  const error = useRouteError();
  const { pathname } = useLocation();

  if (error.status === 404) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <img
          className="mb-[20px] w-[466px] sm:w-[90%] h-auto"
          src={notFoundImage}
          alt="not found image"
          width={466}
          height={214}
        />
        <h2 className="font-bold mb-[12px] text-[25px]">
          <span className="text-teal-700">{pathname}</span> page not found!
        </h2>
        <Link className="btn-navy" to="/">
          back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h2 className="font-medium mb-[12px] text-[42px]">
        Something went wrong!
      </h2>
    </div>
  );
};
export default ErrorPage;
