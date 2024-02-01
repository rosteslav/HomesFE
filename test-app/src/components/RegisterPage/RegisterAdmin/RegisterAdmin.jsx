import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// RTK Queries
import { useLoginMutation, useRegisterAdminMutation } from '../../../store/features/Api/authApi';

// Redux Slices
import { selectedAdmin, setData } from '../../../store/features/slices/registerAdminSlice';

// Validation schema
import { validationRegisterAdminSchema } from '../../../util/validationSchema';

// UI
import Loader from '../../../UI/Loader';
import { ButtonPrimary } from '../../../UI';

// Util functions
import { successNotifications } from '../../../util/notificationMessages';

const RegisterAdmin = () => {
    const [values, setValues] = useState({
        username: currRegisterAdminFormValues.username,
        email: currRegisterAdminFormValues.email,
        password: currRegisterAdminFormValues.password,
        firstName: currRegisterAdminFormValues.firstName,
        lastName: currRegisterAdminFormValues.lastName,
        phoneNumber: currRegisterAdminFormValues.phoneNumber,
    });

    const currRegisterAdminFormValues = useSelector(selectedAdmin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerAdmin, { isSuccess: isSuccessRegister, isLoading }] = useRegisterAdminMutation();
    const [login, { isSuccess: isSuccessLogin, isLoading: isLoadingLogin }] = useLoginMutation();

    useEffect(() => {
        if (isSuccessRegister) {
            if (isSuccessLogin) {
                toast.success(successNotifications('register'));
                toast.success(successNotifications('login'));
                navigate('/');
            } else if (isLoadingLogin) {
                console.log('loading');
            } else {
                login({
                    username: values.username,
                    password: values.password,
                });
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterAdminSchema),
    });

    const onSubmit = (formData) => {
        dispatch(setData(formData));
        registerAdmin(formData);
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Регистрация на админ
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {isLoading && <Loader />}
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                                    {...register('username')}
                                    type='text'
                                    name='username'
                                    value={values.username}
                                    onChange={onChangeHandler}
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
                                {errors.email && (
                                    <p className='text-red-500'>{errors.email.message}</p>
                                )}
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
                        <ButtonPrimary>Регистрация</ButtonPrimary>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Ако вече сте регистрирани използвайте линка
                        <Link
                            className='ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                            to='/auth/login'
                        >
                            Вход
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterAdmin;
