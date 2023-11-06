import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
    const [disableButton, setDisableButton] = useState(false);
    const [message, setMessage] = useState({ text: '', show: false, className: {} });
    const { form, formChangeHandler } = useForm({ username: '', email: '', password: '' });
    const { post } = useFetch();
    const navigate = useNavigate();

    const submitHandler = async e => {
        e.preventDefault();
        setDisableButton(true);

        try {
            const response = await post('/register', form);
            alert(`${response.status}! ${response.message}`);
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