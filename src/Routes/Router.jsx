// Full application routes
import Layout from "@/Layouts/Layout";
import Blog from "@/Pages/Blog/Blog";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Auth/Login";
import Pricing from "@/Pages/Pricing/Pricing";
import StartQuiz from "@/Pages/StartQuiz/StartQuiz";
import Signup from "@/Pages/Auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import QuizPage from "@/Pages/QuizPage/QuizPage";
import QuizAnswer from "@/Pages/QuizAnswer/QuizAnswer";
import Contact from "@/Pages/Contact/Contact";
import Error from "@/Pages/404/Error";
import Profile from "@/Pages/Profile/Profile";
import CheckoutPage from "@/Pages/Checkout/Checkout";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Default Outlet
    errorElement: <Error />,
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
        element: (
          <PrivateRoute>
            <StartQuiz />
          </PrivateRoute>
        ) /* Start Quiz Page */,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ) /* CheckoutPage Page */,
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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ) /* Profile Page */,
      },
      {
        path: "/quiz/:category",
        element: (
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        ) /* Quiz Page */,
      },
      {
        path: "/quiz/:category/answer",
        element: (
          <PrivateRoute>
            <QuizAnswer />
          </PrivateRoute>
        ) /* Quiz Answer Page */,
      },
    ],
  },
]);
