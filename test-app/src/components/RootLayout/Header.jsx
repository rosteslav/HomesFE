import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';

export const Header = () => {
    const user = useSelector((state) => state.authUser.data);
    return (
        <>
            <header className='bg-gray-200'>
                <nav className='m-auto flex max-w-6xl items-center justify-between px-4 py-3'>
                    <Link to={'/'}>
                        <img
                            className='hidden h-20 sm:block'
                            src='/src/assets/images/real_estate_logo.svg'
                            alt='logo'
                        ></img>
                        <img
                            className='h-20 sm:hidden'
                            src='/src/assets/images/real_logo.svg'
                            alt='mobile logo'
                        ></img>
                    </Link>
                    <ul className='flex items-center justify-center gap-4'>
                        {user ? <UserLinks user={user} /> : <GuestLinks />}
                    </ul>
                </nav>
            </header>
        </>
    );
};
