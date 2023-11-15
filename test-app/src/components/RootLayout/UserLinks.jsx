import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import { useAuth } from '../../hooks/useAuth';

const UserLinks = ({ user }) => {
    const { removeUser } = useAuth();
    return (
        <>
            <li>
                <span className={styles['link']}>Hello, {user.claims.name}</span>
            </li>
            <li>
                <Link to={'/'} className={styles['link']} onClick={removeUser}>
                    <span className='btn'>Logout</span>
                </Link>
            </li>{' '}
        </>
    );
};

export default UserLinks;
