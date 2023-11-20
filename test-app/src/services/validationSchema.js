import * as yup from 'yup';

const errors = {
    required: {
        username: 'Моля въведете потребителско име.',
        password: 'Моля въведете парола.',
        email: 'Моля въведете емаил.',
        repPassword: 'Моля въведете паролата отново.',
        firstName: 'Моля въведете първото си име.',
        lastName: 'Моля въведете фамилното си име.',
        phoneNumber: 'Моля въведете телефонния си номер.',
    },
    min: {
        password: 'Паролата трябва да е минимум 3 символа.',
    },
    oneOf: {
        password: 'Паролите не съвпадат.',
    },
};

export const validationLoginSchema = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3).required(errors.required.password),
});

export const validationRegisterSchemaStepTwo = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3, errors.min.password).required(errors.required.password),
    email: yup.string().email().required(errors.required.email),
    repPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], errors.oneOf.password)
        .required(errors.required.repPassword),
});

export const validationRegisterSchemaStepThree = yup.object().shape({
    firstName: yup.string().required(errors.required.firstName),
    lastName: yup.string().required(errors.required.lastName),
    phoneNumber: yup.string().required(errors.required.phoneNumber),
});

export const validationRegisterAdminSchema = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3).required(errors.required.password),
    email: yup.string().email().required(errors.required.email),
    firstName: yup.string().required(errors.required.firstName),
    lastName: yup.string().required(errors.required.lastName),
    phoneNumber: yup.string().required(errors.required.phoneNumber),
});
