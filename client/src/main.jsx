import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Provider } from 'react-redux'
import store from "./store/store.js"
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProtectedRoutes from './protected-routes/ProtectedRoutes.jsx'
import AuthRedirect from './protected-routes/AuthRedirect.jsx'

import { AuthContextProvider } from './contexts/authContext.jsx'
import Blog from './components/blog/Blog.jsx'
import Drafts from './components/drafts/Drafts.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/', errorElement: <ErrorPage />,
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    )
  },
  {
    path: '/about', errorElement: <ErrorPage />, element: (
      <ProtectedRoutes>
        <AboutPage />
      </ProtectedRoutes>
    )
  },
  {
    path: '/profile', errorElement: <ErrorPage />, element: (
      <ProtectedRoutes>
        <ProfilePage />
      </ProtectedRoutes>
    )
  },
  {
    path: '/blog', errorElement: <Blog />, element: (
      <ProtectedRoutes>
        <Blog />
      </ProtectedRoutes>
    )
  },
  {
    path: '/your_blogs', errorElement: <BlogsPage />, element: (
      <ProtectedRoutes>
        <BlogsPage />
      </ProtectedRoutes>
    )
  },
  {
    path: '/drafts', errorElement: <Drafts />, element: (
      <ProtectedRoutes>
        <Drafts />
      </ProtectedRoutes>
    )
  },
  {
    path: '/login', element: (
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>)
  },
  { path: '/register', element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
