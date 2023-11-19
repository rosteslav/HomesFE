import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './components/LoginPage/LoginPage';
// import { RegisterPage } from './components/RegisterPage/RegisterPage';
import RegisterUser from './components/RegisterPage/RegisterUser/RegisterUser'
import { RegisterAdminPage } from './components/RegisterPage/RegisterAdminPage';

import { CatalogItems } from './components/CatalogItems/CatalogItems';
import RootLayout from './components/RootLayout/RootLayout';
import ErrorPage from './components/Error/ErrorPage';
import { restrictLoginRegister } from './UI/auth';
import { PropertiesDetails } from './components/CatalogItems/PropertieDetails/PropertieDetails';

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
                loader: restrictLoginRegister,
                children: [
                    { path: 'register/*', element: <RegisterUser />, loader: restrictLoginRegister },
                    { path: 'login', element: <LoginPage />, loader: restrictLoginRegister },
                    {
                        path: 'register-admin',
                        element: <RegisterAdminPage />,
                        loader: restrictLoginRegister,
                    },
                ],
            },
            { path: ':detailsId', element: <PropertiesDetails /> },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
