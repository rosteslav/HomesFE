import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectedUser } from '../../store/slices/authSlice';
import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';

export const Header = () => {
    const user = useSelector(selectedUser);

    return (
        <>
            <header className='bg-gray-200'>
                <nav className='m-auto flex max-w-6xl items-center justify-between px-4 py-3'>
                    <div className=''>
                        <Link
                            to={'/'}
                            className=' text-2xl font-bold tracking-widest transition-colors duration-500 hover:text-gray-400'
                        >
                            LOGO
                        </Link>
                    </div>
                    <ul className='flex'>{user ? <UserLinks user={user} /> : <GuestLinks />}</ul>
                </nav>
            </header>
        </>
    );
};
