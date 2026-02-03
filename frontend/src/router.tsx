import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { Dashboard } from '@pages/Dashboard';
import { UserPage } from '@pages/UserPage';
import { ErrorPage } from '@pages/ErrorPage';
import { userLoader } from '@loaders/userLoader';

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
        path: 'users/:id',
        element: <UserPage />,
        loader: userLoader,
      },
    ],
  },
]);
