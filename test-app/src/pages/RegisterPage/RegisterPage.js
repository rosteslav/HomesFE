import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
    const [disableButton, setDisableButton] = useState(false);
    const [message, setMessage] = useState({ text: '', show: false, className: {} });
    const { form, formChangeHandler } = useForm({ username: '', email: '', password: '' });
    const { post } = useFetch();
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async e => {
        e.preventDefault();
        setDisableButton(true);

        try {
            await post('/register', form);
            const user = await post('/login', { username: form.username, password: form.password });
            addUser(user);
            navigate('/');
        } catch (error) {
            setMessage({
                text: `${error.status}! ${error.message}!`,
                show: true,
                className: styles.redMessage,
            });
            setDisableButton(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {message.show && <p className={message.className}>{message.text}</p>}
            <RegisterForm
                form={form}
                onFormChangeHandler={formChangeHandler}
                onSubmitHandler={submitHandler}
                disableButton={disableButton}
            />
        </div>
    );
};