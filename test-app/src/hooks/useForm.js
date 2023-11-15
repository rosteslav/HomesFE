import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [formData, setFormValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(formData);

        setFormValues(initialValues);
    };

    return {
        formData,
        onChangeHandler,
        onSubmit
    };
};

