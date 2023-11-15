import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const GuestLinks = () => {
    return (
        <>
            <Link className={styles['link']} to={'/auth/login'}>
                <button className='btn'>Login</button>
            </Link>
            <Link className={styles['link']} to={'/auth/register'}>
                <button className='btn'>Register</button>
            </Link>
            <Link className={styles['link']} to={'/auth/register-admin'}>
                <button className='btn'>Admin</button>
            </Link>
        </>
    );
};

export default GuestLinks;
