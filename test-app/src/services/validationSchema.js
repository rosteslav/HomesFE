import * as yup from 'yup';

export const validationLoginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3).required('Password is required'),
});

export const validationRegisterSchemaStepTwo = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3).required('Password is required'),
    email: yup.string().email().required('Email is required'),
    repPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Repeat Password is required'),
});

export const validationRegisterSchemaStepThree = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
});

export const validationRegisterAdminSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3).required('Password is required'),
    email: yup.string().email().required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required')
});
