import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/auth/authSlice';

const UserLinks = ({ user }) => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(removeUser());
    };

    return (
        <>
            <li>
                <span className='text-1xl mt-10 text-center font-bold leading-9 tracking-tight text-gray-900'>
                    Hello, {user.claims.name}
                </span>
            </li>
            <li>
                <Link
                    to={'/'}
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    onClick={onLogout}
                >
                    <span className='w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Logout
                    </span>
                </Link>
            </li>
        </>
    );
};

export default UserLinks;
