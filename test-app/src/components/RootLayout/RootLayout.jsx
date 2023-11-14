import { Outlet } from 'react-router-dom';
import { Header } from './Header';

import styles from './RootLayout.module.css';

const RootLayout = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Outlet />
            </div>
        </>
    );
};

export default RootLayout;
