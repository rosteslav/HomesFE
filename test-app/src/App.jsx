import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { RegisterAdminPage } from './components/RegisterPage/RegisterAdminPage';

import { CatalogItems } from './components/CatalogItems/CatalogItems';
import RootLayout from './components/RootLayout/RootLayout';
import ErrorPage from './components/Error/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        errorElement: <ErrorPage />,
        element: <RootLayout />,
        children: [
            { index: true, element: <CatalogItems /> },
            {
                path: 'auth',
                children: [
                    { path: 'register', element: <RegisterPage /> },
                    { path: 'login', element: <LoginPage /> },
                    { path: 'register-admin', element: <RegisterAdminPage /> },
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
