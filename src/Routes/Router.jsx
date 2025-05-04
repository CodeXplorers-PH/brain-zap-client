import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Full application routes
import Error from '@/Pages/404/Error';
import Layout from '@/Layouts/Layout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Loader from '@/components/Loader/Loader';

const Blog = React.lazy(() => import('@/Pages/Blog/Blog'));
const StartQuiz = React.lazy(() => import('@/Pages/StartQuiz/StartQuiz'));
const Home = React.lazy(() => import('@/Pages/Home/Home'));
const Pricing = React.lazy(() => import('@/Pages/Pricing/Pricing'));
const BlogDetail = React.lazy(() => import('@/Pages/Blog/BlogDetail'));
const Contact = React.lazy(() => import('@/Pages/Contact/Contact'));
const CheckoutPage = React.lazy(() => import('@/Pages/Checkout/Checkout'));
const Login = React.lazy(() => import('@/Pages/Auth/Login'));
const Signup = React.lazy(() => import('@/Pages/Auth/Signup'));
const Profile = React.lazy(() => import('@/Pages/Profile/Profile'));
const Leaderboard = React.lazy(() => import('@/Pages/Leaderboard/Leaderboard'));
const QuizPage = React.lazy(() => import('@/Pages/QuizPage/QuizPage'));
const PersonalizedQuiz = React.lazy(() =>
  import('@/Pages/QuizPersonalized/PersonalizedQuiz')
);
const QuizAnswer = React.lazy(() => import('@/Pages/QuizAnswer/QuizAnswer'));
const AdminDashboard = React.lazy(() => import('@/Layouts/AdminDashboard'));
const AdminHome = React.lazy(() =>
  import('@/Pages/AdminDashboard/AdminHome/AdminHome')
);
const AllUsers = React.lazy(() =>
  import('@/Pages/AdminDashboard/AllUsers/AllUsers')
);
const Feedback = React.lazy(() =>
  import('@/Pages/AdminDashboard/FeedBack/Feedback')
);
const MakeEvents = React.lazy(() =>
  import('@/Pages/AdminDashboard/MakeEvents/MakeEvents')
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Default Outlet
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/pricing',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Pricing />
          </Suspense>
        ),
      },
      {
        path: '/blogs',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Blog />
          </Suspense>
        ) /* Blog Page */,
      },
      {
        path: '/blogs/:id',
        /* Blog Details Page */
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <BlogDetail />
          </Suspense>
        ),
      },
      {
        path: '/start-quiz',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <StartQuiz />
            </PrivateRoute>
          </Suspense>
        ) /* Start Quiz Page */,
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          </Suspense>
        ) /* CheckoutPage Page */,
      },
      {
        path: '/login',
        /* Login Page */
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        /* Signup Page */
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          </Suspense>
        ) /* Profile Page */,
      },
      {
        path: '/leaderBoard',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          </Suspense>
        ), // Leaderboard Page
      },
      {
        path: '/quiz/:category',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          </Suspense>
        ) /* Quiz Page */,
      },
      {
        path: '/create_quiz',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <PersonalizedQuiz /> {/* Personalized Page */}
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: '/quiz/:category/answer',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <PrivateRoute>
              <QuizAnswer />
            </PrivateRoute>
          </Suspense>
        ) /* Quiz Answer Page */,
      },
    ],
  },
  // Admin Dashboard
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<Loader></Loader>}>
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="adminHome" replace />,
      },
      {
        path: 'adminHome',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'allUsers',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'feedback',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <AdminRoute>
              <Feedback />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: 'makeEvents',
        element: (
          <Suspense fallback={<Loader></Loader>}>
            <AdminRoute>
              <MakeEvents />
            </AdminRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
