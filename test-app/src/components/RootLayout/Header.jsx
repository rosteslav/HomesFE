import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectedUser } from '../../store/slices/authSlice';

import styles from './Header.module.css';
import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';

export const Header = () => {
    const user = useSelector(selectedUser);

    return (
        <>
            <header>
                <nav className={styles['navigation']}>
                    <div className={styles['logoContainer']}>
                        <Link to={'/'} className='link'>
                            <h1 className={styles['logoTitle']}>HomeFE</h1>
                        </Link>
                    </div>
                    <ul className={styles['listNav']}>
                        {user ? <UserLinks user={user} /> : <GuestLinks />}
                    </ul>
                </nav>
            </header>
        </>
    );
};
