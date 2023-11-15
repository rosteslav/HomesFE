import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const UserLinks = ({ user }) => {
    const { removeUser } = useAuth();
    return (
        <>
            <li>
                <span className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'>
                    Hello, {user.claims.name}
                </span>
            </li>
            <li>
                <Link
                    to={'/'}
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    onClick={removeUser}
                >
                    <span>Logout</span>
                </Link>
            </li>
        </>
    );
};

export default UserLinks;
