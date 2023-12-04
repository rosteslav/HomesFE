import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { validationRegisterSchemaStepThree } from '../../../services/validationSchema';
import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { stepThree } from '../../../store/slices/registerUserSlice/registerUserSlice';
import Loader from '../../../UI/Loader';
import { useLoginMutation, useRegisterUserMutation } from '../../../services/authApi';

const RegisterStepThree = () => {
    const currRegisterFormValues = useSelector((state) => state.registerUserForm);
    const [registerUser, { isLoading, isSuccess: isSuccessRegister }] = useRegisterUserMutation();
    const [login, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: currRegisterFormValues.firstName,
        lastName: currRegisterFormValues.lastName,
        phoneNumber: currRegisterFormValues.phoneNumber,
    });

    useEffect(() => {
        if (isSuccessRegister) {
            if (isSuccessLogin) {
                navigate('/');
            } else if (isLoadingLogin) {
                console.log('loading');
            } else {
                login({
                    username: currRegisterFormValues.username,
                    password: currRegisterFormValues.password,
                });
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchemaStepThree),
    });

    const goBackHandler = () => {
        navigate(-1);
    };

    const onSubmitHandler = (data) => {
        dispatch(stepThree(data));
        registerUser({ ...currRegisterFormValues, ...data });
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <>
            {isLoading && <Loader />}
            <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-6'>
                <div>
                    <label
                        htmlFor='firstName'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Първо име
                    </label>
                    <div className='mt-2'>
                        <input
                            id='firstName'
                            {...register('firstName')}
                            type='text'
                            name='firstName'
                            value={values.firstName}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.firstName && (
                            <p className='text-red-500'>{errors.firstName.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='lastName'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Фамилно име
                    </label>
                    <div className='mt-2'>
                        <input
                            id='lastName'
                            {...register('lastName')}
                            type='text'
                            name='lastName'
                            value={values.lastName}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.lastName && (
                            <p className='text-red-500'>{errors.lastName.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='phoneNumber'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Телефонен номер
                    </label>
                    <div className='mt-2'>
                        <input
                            id='phoneNumber'
                            {...register('phoneNumber')}
                            type='text'
                            name='phoneNumber'
                            value={values.phoneNumber}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.phoneNumber && (
                            <p className='text-red-500'>{errors.phoneNumber.message}</p>
                        )}
                    </div>
                </div>
                <div className='flex justify-between gap-10'>
                    <Link className='flex-1' onClick={goBackHandler}>
                        <ButtonSecondary>Назад</ButtonSecondary>
                    </Link>
                    <div className='flex-1'>
                        <ButtonPrimary>Регистрация</ButtonPrimary>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisterStepThree;
