import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout } from "./layouts";
import { Provider } from "react-redux";
import {
  ErrorPage,
  HomePage,
  LandingPage,
  PrivacyPage,
  SettingsPage,
  SignInPage,
  SignUpPage,
  TermsOfServicePage,
  UpdatePassword,
} from "./pages";
import { dashboardLoader } from "./layouts/dashboard-layout";
import { signUpAction, signUpLoader } from "./pages/sign-up";
import { signInAction, signInLoader } from "./pages/sign-in";
import store from "./store";
import { homeLoader } from "./pages/home";
import { settingsAction } from "./pages/settings";
import { updatePasswordAction } from "./pages/update-password";
import { landingLoader } from "./pages/landing";

const isDarkTheme = localStorage.getItem("theme") === JSON.stringify("dark");
// if (isDarkTheme) document.documentElement.classList.add("dark");

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
        loader: signUpLoader,
      },
      {
        path: "tos",
        element: <TermsOfServicePage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkTheme={isDarkTheme} />,
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
