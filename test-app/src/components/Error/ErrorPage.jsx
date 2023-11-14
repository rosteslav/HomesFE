import { Link, useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className={styles['container']}>
            <h1>{error.statusText}</h1>
            <h3>{error.data}</h3>
            <p>
                back to:
                <Link href='/'> Home Page</Link>
            </p>
        </div>
    );
};

export default ErrorPage;
