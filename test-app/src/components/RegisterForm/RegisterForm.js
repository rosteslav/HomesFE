import styles from "./RegisterForm.module.css";

export const RegisterForm = ({
    form,
    onFormChangeHandler,
    onSubmitHandler,
    disableButton,
}) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={form.username} onChange={onFormChangeHandler} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={form.email} onChange={onFormChangeHandler} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={form.password} onChange={onFormChangeHandler} required />
            </div>
            <div><button type="submit" className={styles.button} disabled={disableButton}>Register</button></div>
        </form>
    );
};