import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import { PrivateRoute } from "./components/layout/privateRoute";
import DefaultLayout from "./components/layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard/*",
    element: (
      <PrivateRoute
        element={<DefaultLayout />}
        isAuthenticated={true}
        fallbackPath={"/"}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
