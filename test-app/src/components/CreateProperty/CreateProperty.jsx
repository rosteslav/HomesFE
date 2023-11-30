import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { validationCreatePropertySchema } from '../../services/validationSchema';
import { ButtonPrimary } from '../../UI';
import { createProperty } from '../../store/slices/properties/propertiesThunk';
import useThunk from '../../hooks/use-thunk';
import { getAllBrokersList, getAllPropertyOptions } from '../../services/api';
import ButtonOptions from '../../UI/ButtonOptions';
import Loader from '../../UI/Loader';
import { useDispatch } from 'react-redux';
import { addOwnProperties } from '../../store/slices/properties/propertiesSlice';

export const CreateProperty = () => {
    const [propertyOptions, setPropertyOptions] = useState([]);
    const [brokersList, setBrokersList] = useState([]);
    const [toggleButtons, setToggleButtons] = useState();
    const [toggleForms, setToggleForms] = useState('text');
    const dispatch = useDispatch();
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
    });
    const [brokerValues, setBrokerValues] = useState({
        content: '',
        id: null,
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const options = await getAllPropertyOptions();
            const brokers = await getAllBrokersList();
            setPropertyOptions(options);
            setBrokersList(brokers);
        };
        fetchOptions();
    }, []);

    // console.log(values);

    const [onCreateProperty, isLoading, response] = useThunk(createProperty);

    useEffect(() => {
        if (response != null) {
            setToggleForms('images');
            console.log(response);
        }
    }, [response]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationCreatePropertySchema),
    });

    const onSubmit = async (formData) => {
        const date = new Date();
        formData.createdOnLocalTime = date.toISOString();
        formData.images = [];
        formData.brokerId = brokerValues.id
        console.log(formData)
        // onCreateProperty(formData);
        dispatch(addOwnProperties({ ...formData, ...response }));
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onToggleOptions = (e) => {
        const optionName = e.target.name;
        setToggleButtons(optionName);
    };

    const onSubmitContent = (e) => {
        if (e.target.tagName === 'BUTTON') {
            setValues((state) => ({ ...state, [e.target.parentElement.id]: e.target.textContent }));
            setValue(e.target.parentElement.id, e.target.textContent);

            setToggleButtons('');
        }
    };

    const onSubmitBrokerContent = (e) => {
        if (e.target.tagName === 'BUTTON') {
            const dataId = e.target.getAttribute('data-info');
            const content = e.target.textContent;
            setBrokerValues({content: content, id: dataId})
            setValue(e.target.parentElement.id, content);
        }
    };
    return (
        <>
            <h2 className='my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Създаване на нов имот
            </h2>
            {isLoading && <Loader />}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${toggleForms === 'text' ? '' : 'visibility: hidden'}`}
            >
                <div
                    onClick={onToggleOptions}
                    className='mx-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3'
                >
                    <div>
                        <label
                            htmlFor='neighbourhood'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Квартал
                        </label>
                        <div className='mt-2'>
                            <input
                                {...register('neighbourhood')}
                                type='text'
                                name='neighbourhood'
                                value={values.neighbourhood}
                                className='formInput'
                                readOnly
                            />
                            {errors.neighbourhood && (
                                <p className='text-red-500'>{errors.neighbourhood.message}</p>
                            )}
                        </div>
                        <div
                            id='neighbourhood'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'neighbourhood' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.neighbourhood &&
                                propertyOptions.neighbourhood.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                                {...register('finish')}
                                type='text'
                                name='finish'
                                value={values.finish}
                                className='formInput'
                                readOnly
                            />
                            {errors.finish && (
                                <p className='text-red-500'>{errors.finish.message}</p>
                            )}
                        </div>
                        <div
                            id='finish'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'finish' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.finish &&
                                propertyOptions.finish.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                                {...register('furnishment')}
                                type='text'
                                name='furnishment'
                                value={values.furnishment}
                                className='formInput'
                                readOnly
                            />
                            {errors.furnishment && (
                                <p className='text-red-500'>{errors.furnishment.message}</p>
                            )}
                        </div>
                        <div
                            id='furnishment'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'furnishment' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.furnishment &&
                                propertyOptions.furnishment.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                                {...register('garage')}
                                type='text'
                                name='garage'
                                value={values.garage}
                                className='formInput'
                                readOnly
                            />
                            {errors.garage && (
                                <p className='text-red-500'>{errors.garage.message}</p>
                            )}
                        </div>
                        <div
                            id='garage'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'garage' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.garage &&
                                propertyOptions.garage.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                                {...register('heating')}
                                type='text'
                                name='heating'
                                value={values.heating}
                                className='formInput'
                                readOnly
                            />
                            {errors.heating && (
                                <p className='text-red-500'>{errors.heating.message}</p>
                            )}
                        </div>
                        <div
                            id='heating'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'heating' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.heating &&
                                propertyOptions.heating.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='buildingType'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Вид строителството
                        </label>
                        <div className='mt-2'>
                            <input
                                {...register('buildingType')}
                                type='text'
                                name='buildingType'
                                value={values.buildingType}
                                className='formInput'
                                readOnly
                            />
                            {errors.buildingType && (
                                <p className='text-red-500'>{errors.buildingType.message}</p>
                            )}
                        </div>
                        <div
                            id='buildingType'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'buildingType' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.buildingType &&
                                propertyOptions.buildingType.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='numberOfRooms'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Тип
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                {...register('numberOfRooms')}
                                type='text'
                                name='numberOfRooms'
                                value={values.numberOfRooms}
                                className='formInput'
                                readOnly
                            />
                            {errors.numberOfRooms && (
                                <p className='text-red-500'>{errors.numberOfRooms.message}</p>
                            )}
                        </div>
                        <div
                            id='numberOfRooms'
                            onClick={onSubmitContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'numberOfRooms' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions.numberOfRooms &&
                                propertyOptions.numberOfRooms.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                                type='number'
                                name='space'
                                min={20}
                                max={300}
                                value={values.space}
                                onChange={onChangeHandler}
                                className='formInput'
                            />
                            {errors.space && <p className='text-red-500'>{errors.space.message}</p>}
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
                                type='number'
                                name='price'
                                min={0}
                                max={5000000}
                                value={values.price}
                                onChange={onChangeHandler}
                                className='formInput'
                            />
                            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='brokerId'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Брокери
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                {...register('brokerId')}
                                type='text'
                                name='brokerId'
                                value={brokerValues.content}
                                className='formInput'
                                readOnly
                            />
                            {/* {errors.brokers && (
                                <p className='text-red-500'>{errors.numberOfRooms.message}</p>
                            )} */}
                        </div>
                        <div
                            id='brokerId'
                            onClick={onSubmitBrokerContent}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleButtons === 'brokerId' ? '' : 'visibility: hidden'
                            }`}
                        >
                            {brokersList && (
                                <>
                                    <button type='button' className='mb-2 me-2 mt-1 rounded-full border-4 border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-blue-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:border-blue-600 dark:bg-blue-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700'>
                                        Без брокер
                                    </button>
                                    {brokersList.map((option) => (
                                        <ButtonOptions key={option.id} dataInfo={option.id}>
                                            {`${option.firstName} ${option.lastName} (${option.phoneNumber}, ${option.email})`}
                                        </ButtonOptions>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
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
                                    type='number'
                                    name='floor'
                                    min={1}
                                    max={20}
                                    value={values.floor}
                                    onChange={onChangeHandler}
                                    className='formInput'
                                />
                                {errors.floor && (
                                    <p className='text-red-500'>{errors.floor.message}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex-1'>
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
                                    type='number'
                                    name='totalFloorsInBuilding'
                                    min={1}
                                    max={20}
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
                </div>
                <div className='m-auto mt-4 max-w-lg'>
                    <ButtonPrimary>Напред</ButtonPrimary>
                </div>
            </form>
        </>
    );
};
