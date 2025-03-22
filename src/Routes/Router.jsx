// Full application routes
import Layout from "@/Layouts/Layout";
import Blog from "@/Pages/Blog/Blog";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Pricing from "@/Pages/Pricing/Pricing";
import Signup from "@/Pages/Signup/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Default Outlet
    children: [
      {
        path: "/",
        element: <Home /> /* Home Page */,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/blog",
        element: <Blog /> /* Blog Page */,
      },
      {
        path: "/login",
        element: <Login /> /* Login Page */,
      },
      {
        path: "/signup",
        element: <Signup /> /* Signup Page */,
      },
      {
        path: "*",
        element: "4504",
      },
    ],
  },
]);
