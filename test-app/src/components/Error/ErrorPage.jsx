import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className='mt-20 text-center text-xl'>
            <h1>{error.statusText}</h1>
            <h3 className='text-red-500'>{error.data}</h3>
            <p>
                back to:
                <Link href='/'> Home Page</Link>
            </p>
        </div>
    );
};

export default ErrorPage;
