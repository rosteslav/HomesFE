import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const UserLinks = ({ user }) => {
    const { removeUser } = useAuth();
    return (
        <>
            <li>
                <span className='mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                    Hello, {user.claims.name}
                </span>
            </li>
            <li>
                <Link
                    to={'/'}
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    onClick={removeUser}
                >
                    <span className='w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Logout</span>
                </Link>
            </li>
        </>
    );
};

export default UserLinks;
