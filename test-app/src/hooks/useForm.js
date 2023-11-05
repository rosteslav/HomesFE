import { useState } from "react";

export const useForm = initValues => {
    const [form, setForm] = useState(initValues);

    const formChangeHandler = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    return {
        form,
        setForm,
        formChangeHandler,
    };
};
