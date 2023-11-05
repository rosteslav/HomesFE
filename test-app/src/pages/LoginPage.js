import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";

import styles from "./LoginPage.module.css";

export const LoginPage = () => {
    const { form, formChangeHandler } = useForm({ username: '', password: '' });
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const { post } = useFetch();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const user = await post('/login', form);
            addUser(user);
            navigate('/');
        } catch (error) {
            setShowMessage(true);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={form.name} onChange={formChangeHandler} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={form.password} onChange={formChangeHandler} required />
                </div>
                {showMessage && <p className={styles.message}>Invalid login attempt!</p>}
                <div><button type="submit" className={styles.button}>Log in</button></div>
            </form>
        </div>
    );
};
