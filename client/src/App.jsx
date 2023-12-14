import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout } from "./layouts";
import {
  AddTaskPage,
  ErrorPage,
  LandingPage,
  SignInPage,
  SignUpPage,
} from "./pages";
import { dashboardLoader } from "./layouts/dashboard-layout";
import { signUpAction } from "./pages/sign-up";
import { signInAction } from "./pages/sign-in";
import { landingLoader } from "./pages/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: landingLoader,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        action: signInAction,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: signUpAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddTaskPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
