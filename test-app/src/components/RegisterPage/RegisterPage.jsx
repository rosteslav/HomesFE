import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { validationRegisterSchema } from '../../services/validationSchema';
import useThunk from '../../hooks/use-thunk';
import { registerUser } from '../../store/slices/auth/authThunk';
import Loader from '../../UI/Loader';

export const RegisterPage = () => {
    const [onRegister, isLoading] = useThunk(registerUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchema),
    });

    const onSubmit = (formData) => {
        onRegister(formData);
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                {isLoading && <Loader />}
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Register
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Username
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='username'
                                    {...register('username')}
                                    type='text'
                                    name='username'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                                Email
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='email'
                                    {...register('email')}
                                    type='text'
                                    name='email'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                                    Password
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    {...register('password')}
                                    id='password'
                                    {...register('password')}
                                    type='password'
                                    name='password'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                                First name
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='firstName'
                                    {...register('firstName')}
                                    type='text'
                                    name='firstName'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                                Last name
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='lastName'
                                    {...register('lastName')}
                                    type='text'
                                    name='lastName'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                                Phone number
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='phoneNumber'
                                    {...register('phoneNumber')}
                                    type='text'
                                    name='phoneNumber'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                                {errors.phoneNumber && (
                                    <p className='text-red-500'>{errors.phoneNumber.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='role'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Role
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='role'
                                    {...register('role')}
                                    type='text'
                                    name='role'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                                {errors.role && (
                                    <p className='text-red-500'>{errors.role.message}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Register
                        </button>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        If you have a profile click
                        <Link
                            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                            to='/auth/login'
                        >
                            Here!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
