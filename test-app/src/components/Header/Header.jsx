import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectedUser } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';

import styles from './Header.module.css';

export const Header = () => {
    const user = useSelector(selectedUser);
    const { removeUser } = useAuth();

    return (
        <>
            <header>
                <nav className={styles['navigation']}>
                    <div className={styles['logoContainer']}>
                        <Link to={'/'} className="link">
                            <h1 className={styles['logoTitle']}>HomeFE</h1>
                        </Link>
                    </div>
                    <ul className={styles['listNav']} >
                        {user ? (
                            <>
                                <li>
                                    <span className={styles['link']}>
                                        Hello, {user.claims.name}
                                    </span>
                                </li>
                                <li>
                                    <Link to={'/'} className={styles['link']} onClick={removeUser}>
                                        <span className="btn">Logout</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <Link className={styles['link']} to={'/login'}>
                                    <button className="btn">Login</button>
                                </Link>
                                <Link className={styles['link']} to={'/register'}>
                                    <button className="btn">Register</button>
                                </Link>
                                <Link className={styles['link']} to={'/register-admin'}>
                                    <button className="btn">Admin</button>
                                </Link>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};
