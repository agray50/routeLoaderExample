import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { Dashboard } from '@pages/Dashboard';
import { ResourcePage } from '@pages/ResourcePage';
import { ErrorPage } from '@pages/ErrorPage';
import { resourceLoader } from '@loaders/resourceLoader';
import { resourceStrictLoader } from '@loaders/resourceStrictLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'resource/:uuid',
        element: <ResourcePage />,
        loader: resourceLoader,
      },
      {
        path: 'resource/:uuid/strict',
        element: <ResourcePage />,
        loader: resourceStrictLoader,
      },
    ],
  },
]);
