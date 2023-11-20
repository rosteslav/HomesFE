import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { validationRegisterSchemaStepTwo } from '../../../services/validationSchema';
import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { registerUser } from '../../../store/slices/auth/authThunk';
import { stepTwo } from '../../../store/slices/registerUserSlice/registerUserSlice';
import useThunk from '../../../hooks/use-thunk';
import Loader from '../../../UI/Loader';

const RegisterStepTwo = () => {
    const currRegisterFormValues = useSelector((state) => state.registerUserForm);
    const [onRegister, isLoading] = useThunk(registerUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        username: currRegisterFormValues.username,
        email: currRegisterFormValues.email,
        password: currRegisterFormValues.password,
        repPassword: currRegisterFormValues.repPassword,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchemaStepTwo),
    });

    const goBackHandler = () => {
        navigate(-1);
    };

    const onSubmitHandler = (data) => {
        dispatch(stepTwo(data));

        if (currRegisterFormValues.role !== 'Buyer') {
            navigate('/auth/register/step3');
        } else {
            onRegister({
                role: currRegisterFormValues.role,
                ...data,
            });
        }
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
                        htmlFor='username'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Потребителско име
                    </label>
                    <div className='mt-2'>
                        <input
                            id='username'
                            name='username'
                            {...register('username')}
                            value={values.username}
                            onChange={onChangeHandler}
                            type='text'
                            className='formInput'
                        />
                        {errors.username && (
                            <p className='text-red-500'>{errors.username.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Електронна поща
                    </label>
                    <div className='mt-2'>
                        <input
                            id='email'
                            {...register('email')}
                            type='text'
                            name='email'
                            value={values.email}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Парола
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            {...register('password')}
                            id='password'
                            type='password'
                            name='password'
                            value={values.password}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.password && (
                            <p className='text-red-500'>{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='repPassword'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Потвърждение на парола
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            {...register('repPassword')}
                            id='repPassword'
                            type='password'
                            name='repPassword'
                            value={values.repPassword}
                            onChange={onChangeHandler}
                            className='formInput'
                        />
                        {errors.repPassword && (
                            <p className='text-red-500'>{errors.repPassword.message}</p>
                        )}
                    </div>
                </div>
                <div className='flex justify-between gap-10'>
                    <Link className='flex-1' onClick={goBackHandler}>
                        <ButtonSecondary>Назад</ButtonSecondary>
                    </Link>
                    <div className='flex-1'>
                        <ButtonPrimary>
                            {currRegisterFormValues.role === 'Buyer' ? 'Регистрация' : 'Напред'}
                        </ButtonPrimary>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisterStepTwo;
