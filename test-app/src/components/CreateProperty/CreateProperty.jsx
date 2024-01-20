import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// RTK Queries
import {
    useAddPropertyInfoMutation,
    useEditPropertyInfoMutation,
    useFetchPropertyByIdQuery,
    useFetchPropertyOptionsQuery,
} from '../../store/features/Api/propertiesApi';
import { useFetchBrokersOptionsQuery } from '../../store/features/Api/authApi';

// Validation schema
import { validationCreatePropertySchema } from '../../util/validationSchema';

// UI
import { ButtonPrimary } from '../../UI';
import ButtonOptions from '../../UI/ButtonOptions';
import Loader from '../../UI/Loader';

// Components
import AddImages from './AddImages';

// Map
import SvgSofiaMap from '../../UI/SvgSofiaMap';

const CreateProperty = () => {
    const [selectedExposure, setSelectedExposure] = useState([]);
    const [toggleExposure, setToggleExposure] = useState(true);
    const [conditionIsBroker, setConditionIsBroker] = useState(true);
    const [conditionIsEdit, setConditionIsEdit] = useState(true);
    const [toggleButtons, setToggleButtons] = useState();
    const [toggleForms, setToggleForms] = useState('text');
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

    const [addPropertyInfo, { isLoading, data: addPropertyInfoResult, isSuccess }] =
        useAddPropertyInfoMutation();
    const { data: propertyOptions } = useFetchPropertyOptionsQuery();
    const { data: brokersList } = useFetchBrokersOptionsQuery(undefined, {
        skip: conditionIsBroker,
    });
    const { data: property } = useFetchPropertyByIdQuery(propertyId.propertyId, {
        skip: conditionIsEdit,
        refetchOnMountOrArgChange: true,
    });
    const [editPropertyInfo, { isSuccess: success }] = useEditPropertyInfoMutation({
        skip: conditionIsEdit,
    });

    const user = useSelector((state) => state.authUser.data);

    const propertyId = useParams();

    const type = 'create';
    let isBroker = false;
    if (user.claims?.roles) {
        isBroker = user.claims.roles.some((role) => role === 'Брокер');
    }
    const title = propertyId.propertyId ? 'Редактиране на имота' : 'Създаване на нов имот';

    useEffect(() => {
        if (!isBroker) {
            setConditionIsBroker(false);
        }
    }, [isBroker]);

    useEffect(() => {
        if (isSuccess) {
            setToggleForms('images');
        }
        if (success) {
            setToggleForms('images');
        }
    }, [isSuccess, success]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(validationCreatePropertySchema),
    });

    useEffect(() => {
        if (propertyId.propertyId) {
            setConditionIsEdit(false);
        }
        if (propertyId && property) {
            setValues({
                numberOfRooms: property.numberOfRooms,
                space: property.space,
                description: property.description,
                price: property.price,
                floor: property.floor,
                totalFloorsInBuilding: property.totalFloorsInBuilding,
                buildingType: property.buildingType,
                finish: property.finish,
                furnishment: property.furnishment,
                garage: property.garage,
                heating: property.heating,
                neighbourhood: property.neighbourhood,
                brokerId: property.brokerId,
            });
            for (const feature in property) {
                setValue(feature, property[feature]);
            }

            setSelectedExposure(property.exposure.split('/'));
            setValue('exposure', property.exposure);
            if (property.brokerId) {
                setBrokerValues({
                    content: `${property.contactInfo.firstName} ${property.contactInfo.lastName} (${property.contactInfo.phoneNumber}, ${property.contactInfo.email})`,
                    id: property.brokerId,
                });
                setValue(
                    property.brokerId,
                    `${property.contactInfo.firstName} ${property.contactInfo.lastName} (${property.contactInfo.phoneNumber}, ${property.contactInfo.email})`
                );
            }
        }
    }, [propertyId, property, setValue]);

    const handleMouseEnter = (e) => {
        const elem = e.target;
        const shouldExclude = elem.getAttribute('data-exclude') === 'true';

        if (!shouldExclude) {
            elem.style.fill = '#604EFA';
        }
    };

    const handleMouseLeave = (e) => {
        const elem = e.target;

        const shouldExclude = elem.getAttribute('data-exclude') === 'true';

        if (!shouldExclude) {
            if (!elem.className.baseVal.includes('selectedNH')) {
                elem.style.fill = '#AEA8BA';
            }
        }
    };

    const handleClick = (e) => {
        const shouldExclude = e.target.getAttribute('data-exclude') === 'true';

        if (!shouldExclude && e.target.tagName === 'path') {
            setValues((state) => ({
                ...state,
                [e.target.parentElement.parentElement.parentElement.id]: e.target.textContent,
            }));
            setValue(e.target.parentElement.parentElement.parentElement.id, e.target.textContent);

            setToggleButtons('');
        }
    };

    const handleExposureClick = (e) => {
        const value = e.target.textContent;
        let joinStr = [];
        if (selectedExposure.includes(value)) {
            setSelectedExposure(selectedExposure.filter((item) => item !== value));
            joinStr = selectedExposure.filter((item) => item !== value).join('/');
        } else {
            setSelectedExposure([...selectedExposure, value]);
            joinStr = [...selectedExposure, value].join('/');
        }
        setValue('exposure', joinStr);
    };

    const onSubmit = async (formData) => {
        const date = new Date();
        formData.createdOnLocalTime = date.toISOString();
        formData.images = [];
        formData.brokerId = brokerValues.id;
        formData.exposure = selectedExposure.length > 0 ? selectedExposure.join('/') : null;
        if (propertyId.propertyId) {
            editPropertyInfo({
                id: +propertyId.propertyId,
                data: formData,
                oldImages: property.images,
            });
        } else {
            addPropertyInfo(formData);
        }
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onToggleOptions = (e) => {
        const optionName = e.target.name;
        const tagName = e.target.tagName;
        setToggleButtons(optionName);
        if (optionName === 'exposure') {
            setToggleExposure(false);
        } else if (optionName !== 'exposure' && tagName !== 'BUTTON') {
            setToggleExposure(true);
        }
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
            setBrokerValues({ content: content, id: dataId });
            setValue(e.target.parentElement.id, content);
        }
    };
    return (
        <>
            <h2 className='my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                {title}
            </h2>
            {isLoading && <Loader />}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${toggleForms === 'text' ? '' : 'visibility: hidden'} relative`}
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
                            className={`absolute mt-2 w-full bg-white ${
                                toggleButtons === 'neighbourhood' ? '' : 'visibility: hidden'
                            }`}
                        >
                            <SvgSofiaMap
                                handleMouseEnter={handleMouseEnter}
                                handleMouseLeave={handleMouseLeave}
                                handleClick={handleClick}
                                type={type}
                            />
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
                            {propertyOptions &&
                                propertyOptions.finish &&
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
                            {propertyOptions &&
                                propertyOptions.furnishment &&
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
                            {propertyOptions &&
                                propertyOptions.garage &&
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
                            {propertyOptions &&
                                propertyOptions.heating &&
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
                            {propertyOptions &&
                                propertyOptions.buildingType &&
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
                            {propertyOptions &&
                                propertyOptions.numberOfRooms &&
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
                    {!isBroker && (
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
                                        <button
                                            type='button'
                                            className='mb-2 me-2 mt-1 rounded-full border-4 border-indigo-500 bg-indigo-600 px-5 py-2.5  text-sm font-medium text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-4 dark:border-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500'
                                        >
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
                    )}
                    <div>
                        <label
                            htmlFor='exposure'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Изложение
                        </label>
                        <div className='mt-2'>
                            <input
                                {...register('exposure')}
                                type='text'
                                name='exposure'
                                value={selectedExposure.join('/')}
                                className='formInput'
                                readOnly
                            />
                            {errors.exposure && (
                                <p className='text-red-500'>{errors.exposure.message}</p>
                            )}
                        </div>
                        <div
                            id='exposure'
                            onClick={handleExposureClick}
                            className={`absolute flex max-w-screen-2xl flex-wrap bg-white ${
                                toggleExposure === false ? '' : 'visibility: hidden'
                            }`}
                        >
                            {propertyOptions &&
                                propertyOptions.exposure &&
                                propertyOptions.exposure.map((option) => (
                                    <ButtonOptions key={option}>{option}</ButtonOptions>
                                ))}
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
                <div className='mx-auto my-4 max-w-lg'>
                    <ButtonPrimary isSubmit={'submit'}>Напред</ButtonPrimary>
                </div>
            </form>
            <AddImages
                responseId={addPropertyInfoResult}
                setToggleForms={setToggleForms}
                toggleForms={toggleForms}
                propertyId={propertyId}
            />
        </>
    );
};

export default CreateProperty;
