import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { validationLoginSchema } from '../../services/validationSchema';
import Loader from '../../UI/Loader';
import { ButtonPrimary } from '../../UI';
import { useLoginMutation } from '../../services/authApi';
import toast from 'react-hot-toast';
import { successNotifications } from '../../services/notificationMessages';
import FloatingField from '../../UI/FloatingField';
import { checkIsAdmin } from '../../util/auth';
import { propertiesApi } from '../../services/propertiesApi';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({ username: '', password: '' });
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [login, { data, isLoading, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success(successNotifications('login'));
            if (checkIsAdmin(data.token)) {
                navigate('/dashboard');
            } else {
                dispatch(propertiesApi.util.invalidateTags(['OwnProperties']));
                navigate('/');
            }
        }
    }, [isSuccess, data, dispatch, navigate]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationLoginSchema),
    });

    const onSubmit = (formData) => {
        login(formData);
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
        setValue(e.target.name, e.target.value);
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
                        <FloatingField
                            placeholder='Потребителско име'
                            name='username'
                            type='text'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={values}
                            errors={errors}
                        />
                        <FloatingField
                            placeholder='Парола'
                            name='password'
                            type='password'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={values}
                            errors={errors}
                            passwordVisibility={passwordVisibility}
                            setPasswordVisibility={setPasswordVisibility}
                        />
                        <ButtonPrimary isSubmit={true}>Вход</ButtonPrimary>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-800'>
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
