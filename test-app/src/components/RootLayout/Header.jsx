import { Link } from 'react-router-dom';

import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';
import { useSelector } from 'react-redux';

export const Header = () => {
    const user = useSelector((state) => state.auth.data);
    return (
        <>
            <header className='bg-gray-200'>
                <nav className='m-auto flex max-w-6xl items-center justify-between px-4 py-3'>
                    <div className=''>
                        <Link
                            to={'/'}
                            className='hidden text-2xl font-bold leading-9 tracking-widest text-gray-900 transition-colors duration-500 hover:text-gray-400 md:block'
                        >
                            LOGO
                        </Link>
                    </div>
                    <ul className='flex'>{user.claims ? <UserLinks user={user} /> : <GuestLinks />}</ul>
                </nav>
            </header>
        </>
    );
};
