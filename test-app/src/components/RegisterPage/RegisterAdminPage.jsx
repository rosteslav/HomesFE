import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

export const RegisterAdminPage = () => {
    const { errorInfo, onRegisterAdminSubmit } = useAuth();
    const { formData, onChangeHandler, onSubmit } = useForm(
        { username: '', email: '', password: '' },
        onRegisterAdminSubmit
    );

    return (
        <>
            <section id="registerAdmin-page">
                <div className={styles.register}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.container}>
                            <h1>Admin</h1>
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
                            <label className={styles.test} htmlFor="email">
                                Email:
                            </label>
                            <input
                                className={styles.test}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChangeHandler}
                                required
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
                            <input type="submit" className="btn" value="Register" />
                        </div>
                    </form>
                </div>

                <p className="field">
                    <span>
                        {errorInfo.show && <p className={styles.message}>{errorInfo.text}</p>}
                    </span>
                    <span>
                        If you already have profile click <Link to="/login">Here!</Link>
                    </span>
                </p>
            </section>
        </>
    );
};
