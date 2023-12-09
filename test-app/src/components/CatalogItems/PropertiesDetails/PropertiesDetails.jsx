import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import DetailsImages from './DetailsImages';
import { useFetchPropertyByIdQuery } from '../../../services/propertiesApi';
import notificationMessages from '../../../services/notificationMessages';
import { TextSkeleton } from '../../../UI/Skeletons';

export const PropertiesDetails = () => {
    const { detailsId } = useParams();
    const { data: property, isLoading, isError, error } = useFetchPropertyByIdQuery(detailsId);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            navigate('/');
            toast.error(notificationMessages(error.status));
        }
    });

    const pricePerSqm = property?.price / property?.space;

    return (
        <section className='m-4 mt-10'>
            <h1 className='text-3xl font-semibold'>
                {property?.numberOfRooms} апартамент за продажба, {property?.space} m<sup>2</sup>
            </h1>
            <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <DetailsImages images={property?.images} isLoading={isLoading} />
                {isLoading}
                <div className='text-xl'>
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
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
