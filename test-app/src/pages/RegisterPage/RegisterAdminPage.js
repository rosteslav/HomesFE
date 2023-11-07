import { useState } from "react";

import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

import styles from "./RegisterPage.module.css";

export const RegisterAdminPage = () => {
    const [disableButton, setDisableButton] = useState(false);
    const [message, setMessage] = useState({ text: '', show: false, className: {} });
    const { form, setForm, formChangeHandler } = useForm({ username: '', email: '', password: '' });
    const { post } = useFetch();

    const submitHandler = async e => {
        e.preventDefault();
        setDisableButton(true);

        try {
            const response = await post('/admin/register', form);
            setMessage({
                text: `${response.status}! ${response.message}`,
                show: true,
                className: styles.greenMessage,
            });
            setForm({ username: '', email: '', password: '' });
        } catch (error) {
            setMessage({
                text: `${error.status}! ${error.message}!`,
                show: true,
                className: styles.redMessage,
            });
        }

        setDisableButton(false);
    };

    return (
        <div>
            <h1>Register Admin</h1>
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