import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User'
import Login from '../pages/Login'
import Page404 from '../pages/Page404'
import Layout from '../components/Layout/Layout'
import Reservation from '../pages/Reservation'
import Account from '../pages/Account'
import CreateAccount from '../pages/Account/create'

const Routers = () => {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'user', element: <User /> },
        { path: 'reservation', element: <Reservation /> },
        { path: 'account', element: <Account /> },
        { path: 'account/create', element: <CreateAccount /> },
        { path: 'account/update/:id', element: <CreateAccount type="Edit" /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      element: <Layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

export default Routers