import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './components/LoginPage/LoginPage';
import RegisterUser from './components/RegisterPage/RegisterUser/RegisterUser';
import { CatalogItems } from './components/CatalogItems/CatalogItems';
import RootLayout from './components/RootLayout/RootLayout';
import ErrorPage from './components/Error/ErrorPage';
import { restrictLoginRegister } from './UI/auth';
import { PropertiesDetails } from './components/CatalogItems/PropertieDetails/PropertieDetails';
import { RegisterAdmin } from './components/RegisterPage/RegisterAdmin/RegisterAdmin';
import { CreateProperty } from './components/CreateProperty/CreateProperty';

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
                        element: <RegisterAdmin />,
                        loader: restrictLoginRegister,
                    },
                ],
            },
            { path: ':detailsId', element: <PropertiesDetails /> },
            { path: 'createProperty', element: <CreateProperty />}
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
