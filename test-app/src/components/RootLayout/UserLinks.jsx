import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { ButtonPrimary, ButtonSecondary } from '../../UI';
import { propertiesApi } from '../../services/propertiesApi';
import { removeUser } from '../../store/features/authUser';

const UserLinks = ({ user }) => {
    let isSellerOrBroker = null;
    const isBrokerOrSeller = (role) => (role === 'Брокер' || role === 'Продавач');

    // Expected output: true
    if (user.claims?.roles) {
        isSellerOrBroker = user.claims.roles.some(isBrokerOrSeller);
    }
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(removeUser());
        dispatch(propertiesApi.util.resetFetcher());
    };

    return (
        <div className='flex items-center justify-center'>
            {isSellerOrBroker && (
                <div className='w-34 m-4'>
                    <Link to={`/createProperty`} className='link'>
                        <ButtonSecondary>Създай имот</ButtonSecondary>
                    </Link>
                </div>
            )}
            <span className='text-1xl text-center font-bold leading-9 tracking-tight text-gray-900'>
                Здравей, {user.claims.name}
            </span>
            <img
                className='mx-2 h-10 w-10 rounded-full bg-white'
                src='/src/assets/images/profile.svg'
                alt=''
            />

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
