import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/login'}
            >
                <button className='flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register'}
            >
                <button className='flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Register</button>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register-admin'}
            >
                <button className='flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Admin</button>
            </Link>
        </>
    );
};

export default GuestLinks;
