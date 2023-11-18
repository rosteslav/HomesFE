import { useForm } from '../../hooks/useForm';
// import { useAuth } from '../../hooks/useAuthOld';

import { Link } from 'react-router-dom';

export const RegisterAdminPage = () => {
    const errorInfo = {}
    // const { errorInfo, onRegisterAdminSubmit } = useAuth();
    const { formData, onChangeHandler, onSubmit } = useForm(
        { username: '', email: '', password: '' },
        // onRegisterAdminSubmit
    );

    return (
        <>
<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Register Admin
        </h2>
    </div>

    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={onSubmit} className='space-y-6' action='#' method='POST'>
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
                        value={formData.username}
                        onChange={onChangeHandler}
                        type='text'
                        name='username'
                        required
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
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
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={onChangeHandler}
                        id='email'
                        required
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
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
                        id='password'
                        value={formData.password}
                        onChange={onChangeHandler}
                        type='password'
                        name='password'
                        required
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
            </div>

            <div className='text-sm'>
                <span className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    {errorInfo.show && <p className='text-red-500'>{errorInfo.text}</p>}
                </span>
            </div>

            <div>
                <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Register
                </button>
            </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
            If you already have profile click
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


