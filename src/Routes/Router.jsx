// Full application routes
import Layout from "@/Layouts/Layout";
import Blog from "@/Pages/Blog/Blog";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Auth/Login";
import Pricing from "@/Pages/Pricing/Pricing";
import StartQuiz from "@/Pages/StartQuiz/StartQuiz";
import Signup from "@/Pages/Auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import Contact from "@/Pages/Contact/Contact";

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
        path: "/start-quiz",
        element: <StartQuiz /> /* Quiz Page */,
      },
      {
        path:"/contact",
        element:<Contact />
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
