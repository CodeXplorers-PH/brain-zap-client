import { createBrowserRouter, Navigate } from "react-router-dom";

// Full application routes
import Error from "@/Pages/404/Error";
import Layout from "@/Layouts/Layout";
import Blog from "@/Pages/Blog/Blog";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Auth/Login";
import Pricing from "@/Pages/Pricing/Pricing";
import StartQuiz from "@/Pages/StartQuiz/StartQuiz";
import Signup from "@/Pages/Auth/Signup";
import QuizPage from "@/Pages/QuizPage/QuizPage";
import QuizAnswer from "@/Pages/QuizAnswer/QuizAnswer";
import Contact from "@/Pages/Contact/Contact";
import Profile from "@/Pages/Profile/Profile";
import CheckoutPage from "@/Pages/Checkout/Checkout";
import BlogDetail from "@/Pages/Blog/BlogDetail";
import PrivateRoute from "./PrivateRoute";
import PersonalizedQuiz from "@/Pages/QuizPersonalized/PersonalizedQuiz";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "@/Layouts/AdminDashboard";
import AdminHome from "@/Pages/AdminDashboard/AdminHome/AdminHome";
import AllUsers from "@/Pages/AdminDashboard/AllUsers/AllUsers";
import Leaderboard from "@/Pages/Leaderboard/Leaderboard";
import Feedback from "@/Pages/AdminDashboard/FeedBack/Feedback";

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
        path: "/blogs",
        element: <Blog /> /* Blog Page */,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetail /> /* Blog Page */,
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
        path: "/leaderBoard",
        element: (
          <PrivateRoute>
            <Leaderboard />
          </PrivateRoute>
        ), // Leaderboard Page
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
        path: "/create_quiz",
        element: (
          <PrivateRoute>
            <PersonalizedQuiz /> {/* Personalized Page */}
          </PrivateRoute>
        ),
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
  // Admin Dashboard
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="adminHome" replace />,
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <AdminRoute>
            <Feedback />
          </AdminRoute>
        ),
      },
    ],
  },
]);
