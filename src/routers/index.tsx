import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoutePaths } from "./routerPath";

// import pages
import { LogIn } from "./../pages/LogIn";
import { AuthLayout } from "../layout/auth/signIn";
import { DashBoardLayOut } from "../layout/daskboard/dashboard";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <Navigate to="/auth/signin" replace />, // Redirect root to sign in
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayOut />,
    children: [
      {
        path: "/dashboard/home",
        element: <Home />,
      },
    ],
  },
]);
