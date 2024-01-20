import { Link } from 'react-router-dom';

// UI
import { ButtonPrimary } from '../../UI';

const GuestLinks = () => {
    return (
        <>
            <li>
                <Link
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    to={'/auth/login'}
                >
                    <ButtonPrimary>Вход</ButtonPrimary>
                </Link>
            </li>
            <li>
                <Link
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    to={'/auth/register'}
                >
                    <ButtonPrimary>Регистрация</ButtonPrimary>
                </Link>
            </li>
        </>
    );
};

export default GuestLinks;
