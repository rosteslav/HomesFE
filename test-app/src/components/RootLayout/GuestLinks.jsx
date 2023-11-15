import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/login'}
            >
                <button className='btn'>Login</button>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register'}
            >
                <button className='btn'>Register</button>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register-admin'}
            >
                <button className='btn'>Admin</button>
            </Link>
        </>
    );
};

export default GuestLinks;
