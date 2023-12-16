import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout } from "./layouts";
import { Provider } from "react-redux";
import {
  ErrorPage,
  HomePage,
  LandingPage,
  SettingsPage,
  SignInPage,
  SignUpPage,
  UpdatePassword,
} from "./pages";
import { dashboardLoader } from "./layouts/dashboard-layout";
import { signInAction, signInLoader } from "./pages/sign-in";
import store from "./store";
import { homeLoader } from "./pages/home";
import { settingsAction } from "./pages/settings";
import { updatePasswordAction } from "./pages/update-password";
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
        loader: signInLoader,
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
            element: <HomePage />,
            loader: homeLoader,
          },
          {
            path: "settings",
            element: <SettingsPage />,
            action: settingsAction,
          },
          {
            path: "update-password",
            element: <UpdatePassword />,
            action: updatePasswordAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
