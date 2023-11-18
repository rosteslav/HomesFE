import * as yup from 'yup';

export const validationLoginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3).required('Password is required'),
});

export const validationRegisterSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3).required('Password is required'),
    email: yup.string().email().required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    role: yup
        .string()
        .oneOf(
            ['Seller', 'Buyer', 'Broker'],
            'Must be either "Seller", "Buyer" or "Broker"'
        )
        .required('role is required'),
});
