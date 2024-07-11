import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Provider } from 'react-redux'
import store from "./store/store.js"
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProtectedRoutes from './protected-routes/ProtectedRoutes.jsx'

import { AuthContextProvider } from './contexts/authContext.jsx'

const router = createBrowserRouter([
  { path: '/',  errorElement: <ErrorPage />,
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    )},
  { path: '/about', errorElement: <ErrorPage />, element: (
      <ProtectedRoutes>
        <AboutPage />
      </ProtectedRoutes>
    )},
  { path: '/login',  element: <LoginPage />},
  { path: '/register', element: <RegisterPage />},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>,
)
