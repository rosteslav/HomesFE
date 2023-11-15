import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const { errorInfo, onRegisterSubmit } = useAuth();
    const { formData, onChangeHandler, onSubmit } = useForm(
        { username: '', email: '', password: '' },
        onRegisterSubmit
    );

    return (
        <>
            <section id='register-page' className='m-auto mt-10 w-6/12'>
                <div className='rounded-xl bg-gray-200 p-10'>
                    <form onSubmit={onSubmit}>
                        <div className='m-auto flex w-6/12 flex-col text-xl'>
                            <h1 className='text-3xl font-bold'>Register</h1>
                            <label className='mb-2 mt-4' htmlFor='username'>
                                Username:
                            </label>
                            <input
                                className='w-28 rounded-xl bg-gray-100 px-4 py-2 
                                text-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none 
                                focus:ring focus:ring-gray-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-96'
                                value={formData.username}
                                onChange={onChangeHandler}
                                type='text'
                                id='username'
                                name='username'
                            />
                            <label className='mb-2 mt-4' htmlFor='email'>
                                Email:
                            </label>
                            <input
                                className='w-28 rounded-xl bg-gray-100 px-4 py-2 
                                text-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none 
                                focus:ring focus:ring-gray-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-96'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={onChangeHandler}
                                required
                            />

                            <label className='mb-2 mt-4' htmlFor='password'>
                                Password:
                            </label>
                            <input
                                className='w-28 rounded-xl bg-gray-100 px-4 py-2 
                                text-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none 
                                focus:ring focus:ring-gray-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-96'
                                value={formData.password}
                                onChange={onChangeHandler}
                                type='password'
                                id='login-password'
                                name='password'
                            />
                            <button
                                className='mt-5 inline-block w-96 rounded-full bg-gray-400 px-4 py-3 font-semibold uppercase
                                tracking-wide  transition-colors duration-300 hover:bg-gray-300
                                focus:outline-none focus:ring focus:ring-gray-300 focus:ring-offset-2 
                                active:bg-gray-800 disabled:cursor-not-allowed '
                                type='submit'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                <p className='text-center'>
                    <span>
                        {errorInfo.show && (
                            <p className='text-red-500'>{errorInfo.text}</p>
                        )}
                    </span>
                    <span>
                        If you already have profile click
                        <Link to='/auth/login'>Here!</Link>
                    </span>
                </p>
            </section>
        </>
    );
};
