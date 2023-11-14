import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const { errorInfo, onLoginSubmit } = useAuth();
    const { formData, onChangeHandler, onSubmit } = useForm(
        { username: '', password: '' },
        onLoginSubmit
    );

    return (
        <>
            <section id="login-page">
                <div className={styles.login}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.container}>
                            <h1>Login</h1>
                            <label className={styles.test} htmlFor="username">
                                Username:
                            </label>
                            <input
                                className={styles.test}
                                value={formData.username}
                                onChange={onChangeHandler}
                                type="text"
                                id="username"
                                name="username"
                            />

                            <label className={styles.test} htmlFor="password">
                                Password:
                            </label>
                            <input
                                className={styles.test}
                                value={formData.password}
                                onChange={onChangeHandler}
                                type="password"
                                id="login-password"
                                name="password"
                            />
                            <br></br>
                            <input className="btn" type="submit" value="Login" />
                        </div>
                    </form>
                </div>

                <p className="field">
                    <span>
                        {errorInfo.show && <p className={styles.message}>{errorInfo.text}</p>}
                    </span>
                    <span>
                        If you don't have profile click <Link to="/auth/register">Here!</Link>
                    </span>
                </p>
            </section>
        </>
    );
};
