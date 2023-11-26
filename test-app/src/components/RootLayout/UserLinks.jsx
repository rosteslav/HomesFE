import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/auth/authSlice';
import { ButtonPrimary, ButtonSecondary } from '../../UI';

const UserLinks = ({ user }) => {
    let isSeller = null;
    if (user) {
        isSeller = user.claims.roles.includes('Продавач');
    }
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(removeUser());
    };

    return (
        <div className='flex items-center justify-center'>
            {isSeller && (
                <div className='w-34 m-4'>
                    <Link to={`/createProperty`} className='link'>
                        <ButtonSecondary>Създай имот</ButtonSecondary>
                    </Link>
                </div>
            )}
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
