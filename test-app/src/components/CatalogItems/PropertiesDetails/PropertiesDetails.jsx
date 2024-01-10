import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import DetailsImages from './DetailsImages';
import {
    useAddPropertyReasonMutation,
    useFetchPropertyByIdQuery,
} from '../../../services/propertiesApi';
import notificationMessages, { successNotifications } from '../../../services/notificationMessages';
import { TextSkeleton } from '../../../UI/Skeletons';
import {
    changeLikedProperties,
    loadLikedProperties,
} from '../../../store/features/likedProperties';
import { useDispatch, useSelector } from 'react-redux';
import { validationPropertyReportSchema } from '../../../services/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const PropertiesDetails = () => {
    const { detailsId } = useParams();
    const { data: property, isLoading, isError, error } = useFetchPropertyByIdQuery(detailsId);
    const [addPropertyReason, { isSuccess }] = useAddPropertyReasonMutation();
    const [star, setStar] = useState(false);
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const neighborhoodName = property?.neighbourhood;
    const iframeSrc = `https://www.google.com/maps/embed/v1/place?q=${neighborhoodName},Sofia&key=${apiKey}`;
    const dispatch = useDispatch();
    const likedProperties = useSelector((state) => state.likedProperties.data);
    const user = useSelector((state) => state.authUser);
    const [report, setReport] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [values, setValues] = useState({ reason: '' });

    useEffect(() => {
        if (user.data === null || user.data?.claims?.roles[1] === 'Купувач') {
            setStar(true);
        } else {
            setStar(false);
        }
        if (user.data !== null && user.data?.isAdmin === false) {
            setReport(true);
        } else {
            setReport(false);
        }
    }, [user]);

    useEffect(() => {
        if (star && likedProperties.length === 0) {
            dispatch(loadLikedProperties());
        }
    });

    useEffect(() => {
        if (isError) {
            navigate('/');
            toast.error(notificationMessages(error.status));
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success(successNotifications('reportReason'));
        }
    }, [isSuccess]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationPropertyReportSchema),
    });

    const onSubmit = (formData) => {
        addPropertyReason({ detailsId, formData });
        setIsVisible(!isVisible);
    };

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
        setValue(e.target.name, e.target.value);
    };

    const isClickedReport = () => {
        setIsClicked(!isClicked);
    };

    const pricePerSqm = property?.price / property?.space;

    return (
        <section className='relative m-4 mt-10'>
            <h1 className='inline-block text-3xl font-semibold'>
                {property?.numberOfRooms} апартамент за продажба, {property?.space} m<sup>2</sup>
            </h1>

            <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                    {isClicked && isVisible && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-4 w-full rounded-lg border-2 border-gray-300 bg-gray-50'>
                                <div className='rounded-t-lg bg-white px-4 py-2'>
                                    <label htmlFor='reason' className='sr-only'>
                                        Съобщи за проблем
                                    </label>
                                    <textarea
                                        className='w-full border-0 bg-white px-2 text-sm text-gray-900 focus:ring-0'
                                        rows='4'
                                        name='reason'
                                        onChange={onChangeHandler}
                                        {...register('reason')}
                                        values={values}
                                        placeholder='Съобщи за нередност...'
                                    ></textarea>
                                    {errors.reason && (
                                        <p className='text-red-500'>{errors.reason.message}</p>
                                    )}
                                </div>
                                <div className='flex items-center justify-between border-t px-3 py-2'>
                                    <button className='inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-indigo-500 focus:ring-4 focus:ring-blue-200'>
                                        Изпрати
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                    <DetailsImages images={property?.images} isLoading={isLoading} />
                    <div className='mt-4'>
                        <iframe
                            className='h-60 w-full  rounded-lg lg:h-96'
                            title={`Map of ${neighborhoodName}`}
                            src={iframeSrc}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                </div>

                {isLoading}
                <div className='text-xl'>
                    {report && (
                        <div className='absolute right-20 top-4 text-2xl text-red-500 hover:text-3xl'>
                            <button
                                onClick={isClickedReport}
                                title='Съобщи за нередност'
                                className='float-right m-1 flex h-10 w-10 items-center justify-center rounded-full'
                            >
                                <i className='fas fa-exclamation-triangle '></i>
                            </button>
                        </div>
                    )}
                    {star && (
                        <div className='absolute right-2 top-2 z-50 text-lg text-red-500 hover:text-2xl'>
                            {likedProperties.includes(+detailsId) ? (
                                <button
                                    onClick={() => dispatch(changeLikedProperties(+detailsId))}
                                    className='float-right m-3 flex h-10 w-10 items-center justify-center rounded-full  '
                                >
                                    <i className='fas fa-star fa-lg'></i>
                                </button>
                            ) : (
                                <button
                                    onClick={() => dispatch(changeLikedProperties(+detailsId))}
                                    className='float-right m-3 flex h-10 w-10 items-center justify-center rounded-full '
                                >
                                    <i className='far fa-star fa-lg'></i>
                                </button>
                            )}
                        </div>
                    )}
                    {isLoading && <TextSkeleton times={20} />}
                    <div className='flex justify-between'>
                        <p className='font-semibold'>София</p>
                        <p>
                            <span className='font-semibold'>{property?.price}</span> EUR
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <p>{property?.neighbourhood}</p>

                        {pricePerSqm && (
                            <h2>
                                ({pricePerSqm.toFixed(2)} EUR/m<sup>2</sup>)
                            </h2>
                        )}
                    </div>
                    <p className='pt-4'>
                        <span className='font-bold'>Обзавеждане: </span>
                        {property?.furnishment}
                    </p>
                    <p>
                        <span className='font-bold'>Етаж: </span>
                        {property?.floor}
                    </p>
                    <p>
                        <span className='font-bold'>Етажи: </span>
                        {property?.totalFloorsInBuilding}
                    </p>
                    <p>
                        <span className='font-bold'>Отопление: </span>
                        {property?.heating}
                    </p>
                    <p>
                        <span className='font-bold'>Завършеност: </span>
                        {property?.finish}
                    </p>
                    <p>
                        <span className='font-bold'>Гараж: </span>
                        {property?.garage}
                    </p>
                    <p>
                        <span className='font-bold'>Строителство: </span>
                        {property?.buildingType}
                    </p>
                    {property && property.exposure && (
                        <p>
                            <span className='font-bold'>Изложение: </span>
                            {property?.exposure}
                        </p>
                    )}
                    <p className='border-b-2 border-black pt-4 font-bold'>
                        Допълнителна информация
                    </p>
                    <p>{property?.description}</p>
                    <p className='border-b-2 border-black pt-4 font-bold'>Контакти</p>
                    {property && property.contactInfo && (
                        <div className='flex items-center'>
                            <div className='flex-1'>
                                <p className='pt-1'>
                                    Име: {property.contactInfo?.firstName}{' '}
                                    {property.contactInfo?.lastName}
                                </p>
                                <p className='pt-1'>
                                    Телефонен номер: {property.contactInfo?.phoneNumber}
                                </p>
                                <a href={`mailto:${property?.contactInfo.email}`} className='pt-1'>
                                    Електронна поща: {property.contactInfo?.email}
                                </a>
                            </div>

                            <img
                                className='mx-2 h-20 w-20 rounded-lg bg-white object-cover'
                                src={
                                    property.contactInfo?.imageURL
                                        ? property.contactInfo.imageURL
                                        : '/src/assets/images/profile.svg'
                                }
                                alt='userImage'
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
