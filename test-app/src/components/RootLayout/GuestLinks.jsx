import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../UI';

const GuestLinks = () => {
    return (
        <>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/login'}
            >
                <ButtonPrimary>Вход</ButtonPrimary>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register'}
            >
                <ButtonPrimary>Регистрация</ButtonPrimary>
            </Link>
            <Link
                className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                to={'/auth/register-admin'}
            >
                <ButtonPrimary>Регистрация админ</ButtonPrimary>
            </Link>
        </>
    );
};

export default GuestLinks;
