import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { validationLoginSchema } from '../../services/validationSchema';
import Loader from '../../UI/Loader';
import { ButtonPrimary } from '../../UI';
import { useLoginMutation } from '../../services/authApi';
import { setUser } from '../../store/features/authUser';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { data, isLoading, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            // dispatch(setUser(data));
            navigate('/');
        }
    }, [isSuccess, data, dispatch, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationLoginSchema),
    });

    const onSubmit = (formData) => {
        login(formData);
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                {isLoading && <Loader />}
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Вход
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
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
                                    className='formInput'
                                />
                                {errors.username && (
                                    <p className='text-red-500'>{errors.username.message}</p>
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
                                    className='formInput'
                                />
                                {errors.password && (
                                    <p className='text-red-500'>{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <ButtonPrimary>Вход</ButtonPrimary>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Ако нямате регистрация? Използвайте линка
                        <Link
                            className='ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                            to='/auth/register'
                        >
                            Регистрация
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
