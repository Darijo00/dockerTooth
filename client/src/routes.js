import React from 'react'
import DefaultLayout from './layout/DefaultLayout';
import PatientsDirectory from './layout/content/PatientsDirectory';
import Login from './views/pages/login';
import Register from './views/pages/register';
import ProviderHygenist from './layout/content/ProviderHygeinst';

const routes = [
  {
    path: '/',
    exact: true,
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DefaultLayout />,
    children: [
      { path: '/dashboard/patients', exact: true, element: <PatientsDirectory /> },
      { path: '/dashboard/providers', exact: true, element: <ProviderHygenist /> },
    ],
  },
  {
    path: '/login',
    exact: true,
    element: <Login />,
  },
  {
    path: '/register',
    exact: true,
    element: <Register />,
  },
];

export default routes
