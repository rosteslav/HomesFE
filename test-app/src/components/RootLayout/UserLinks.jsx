import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/auth/authSlice';
import { ButtonPrimary } from '../../UI';

const UserLinks = ({ user }) => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(removeUser());
    };

    return (
        <div className='flex items-center justify-center'>
            <span className='text-1xl text-center font-bold leading-9 tracking-tight text-gray-900'>
                Здравей, {user.claims.name}
            </span>

            <Link
                to={'/'}
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                onClick={onLogout}
            >
                <ButtonPrimary>Изход</ButtonPrimary>
            </Link>
        </div>
    );
};

export default UserLinks;
