import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './app/layout';
import AppLayout from './app/(app)/layout';
import HomePage from './app/(app)/page';
import AboutPage from './pages/About';
import SettingsLayout from './app/(app)/settings/application-layout';
import ListPage from './app/(app)/list/[id]/page';
import SettingsPage from './app/(app)/settings/page';
import AddressSettings from './app/(app)/settings/address';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'about',
            element: <AboutPage />,
          },
          {
            path: 'list/:id',
            element: <ListPage />,
          },
          {
            path: 'settings',
            element: <SettingsLayout />,
            children: [
              {
                index: true,
                element: <SettingsPage />,
              },
              {
                path: 'address',
                element: <AddressSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
