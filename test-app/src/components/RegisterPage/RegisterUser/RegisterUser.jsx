import { useRoutes } from 'react-router-dom';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';
import RegisterLayout from './RegisterLayout';
import RegisterStepThree from './RegisterStepThree';

const registerRouter = [
    {
        path: '/',
        id: 'root',
        element: <RegisterLayout />,
        children: [
            { index: true, element: <RegisterStepOne /> },
            { path: 'step2', element: <RegisterStepTwo /> },
            { path: 'step3', element: <RegisterStepThree /> },
        ],
    },
];

const RegisterUser = () => {
    const routes = useRoutes(registerRouter);
    return routes;
};

export default RegisterUser;
