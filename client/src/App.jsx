import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "./layouts";
import { ErrorPage, LandingPage, SignInPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      {
        path: "/sign-in",
        element: <SignInPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
