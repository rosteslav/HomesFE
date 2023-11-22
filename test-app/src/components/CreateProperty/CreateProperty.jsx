import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { validationCreatePropertySchema } from '../../services/validationSchema';
import { ButtonPrimary } from '../../UI';
import { createProperty } from '../../store/slices/properties/propertiesThunk';
import useThunk from '../../hooks/use-thunk';
import Loader from '../../UI/Loader';
import { useNavigate } from 'react-router-dom';

export const CreateProperty = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        numberOfRooms: '',
        space: '',
        description: '',
        price: '',
        floor: '',
        totalFloorsInBuilding: '',
        buildingType: '',
        finish: '',
        furnishment: '',
        garage: '',
        heating: '',
        neighbourhood: '',
        // brokerId: '',
    });
    const [onCreateProperty, isLoading] = useThunk(createProperty);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationCreatePropertySchema),
    });
    console.log(errors);
    const onSubmit = (formData) => {
        onCreateProperty(formData);
        navigate('/');
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Създаване на нов имот
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    {isLoading && <Loader />}
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='numberOfRooms'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Брой стаи в имота
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    {...register('numberOfRooms')}
                                    id='numberOfRooms'
                                    type='text'
                                    name='numberOfRooms'
                                    value={values.numberOfRooms}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.numberOfRooms && (
                                    <p className='text-red-500'>{errors.numberOfRooms.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='space'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Големина на имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='space'
                                    {...register('space')}
                                    type='text'
                                    name='space'
                                    value={values.space}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.space && (
                                    <p className='text-red-500'>{errors.space.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='description'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Детайли на имота
                            </label>
                            <div className='mt-2'>
                                <textarea
                                    id='description'
                                    {...register('description')}
                                    type='text'
                                    name='description'
                                    value={values.description}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.description && (
                                    <p className='text-red-500'>{errors.description.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='price'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Цена на имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='price'
                                    {...register('price')}
                                    type='text'
                                    name='price'
                                    value={values.price}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.price && (
                                    <p className='text-red-500'>{errors.price.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='floor'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Етаж на имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='floor'
                                    {...register('floor')}
                                    type='text'
                                    name='floor'
                                    value={values.floor}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.floor && (
                                    <p className='text-red-500'>{errors.floor.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='totalFloorsInBuilding'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Общо етажи в сградата
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='totalFloorsInBuilding'
                                    {...register('totalFloorsInBuilding')}
                                    type='text'
                                    name='totalFloorsInBuilding'
                                    value={values.totalFloorsInBuilding}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.totalFloorsInBuilding && (
                                    <p className='text-red-500'>
                                        {errors.totalFloorsInBuilding.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='buildingType'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Вид на строителството
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='buildingType'
                                    {...register('buildingType')}
                                    type='text'
                                    name='buildingType'
                                    value={values.buildingType}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.buildingType && (
                                    <p className='text-red-500'>{errors.buildingType.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='finish'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Завършеност на имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='finish'
                                    {...register('finish')}
                                    type='text'
                                    name='finish'
                                    value={values.finish}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.finish && (
                                    <p className='text-red-500'>{errors.finish.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='furnishment'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Обзавеждане на имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='furnishment'
                                    {...register('furnishment')}
                                    type='text'
                                    name='furnishment'
                                    value={values.furnishment}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.furnishment && (
                                    <p className='text-red-500'>{errors.furnishment.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='garage'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Гараж
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='garage'
                                    {...register('garage')}
                                    type='text'
                                    name='garage'
                                    value={values.garage}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.garage && (
                                    <p className='text-red-500'>{errors.garage.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='heating'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Отопление в имота
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='heating'
                                    {...register('heating')}
                                    type='text'
                                    name='heating'
                                    value={values.heating}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.heating && (
                                    <p className='text-red-500'>{errors.heating.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='neighbourhood'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Квартал
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='neighbourhood'
                                    {...register('neighbourhood')}
                                    type='text'
                                    name='neighbourhood'
                                    value={values.neighbourhood}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.neighbourhood && (
                                    <p className='text-red-500'>{errors.neighbourhood.message}</p>
                                )}
                            </div>
                        </div>
                        {/* <div>
                            <label
                                htmlFor='brokerId'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                ID на брокера
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='brokerId'
                                    {...register('brokerId')}
                                    type='text'
                                    name='brokerId'
                                    value={values.brokerId}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.email && (
                                    <p className='text-red-500'>{errors.brokerId.message}</p>
                                )}
                            </div>
                        </div> */}

                        <ButtonPrimary>Създаване</ButtonPrimary>
                    </form>
                </div>
            </div>
        </>
    );
};
