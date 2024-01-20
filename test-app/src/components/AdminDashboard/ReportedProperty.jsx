// RTK Queries
import {
    useDeleteOwnPropertyMutation,
    useFetchPropertyByIdQuery,
} from '../../store/features/Api/propertiesApi';
import { useDeleteReportsByIdMutation } from '../../store/features/Api/adminApi';

// UI
import ImageScroll from '../../UI/ImageScroll';
import { ImageSkeleton, TextSkeleton } from '../../UI/Skeletons';

const ReportedProperty = ({ propertyId, reports }) => {
    const [deleteReportsById] = useDeleteReportsByIdMutation();
    const { data: property, isLoading: isLoadingReportedProperty } =
        useFetchPropertyByIdQuery(propertyId);
    const [removeOwnProperty] = useDeleteOwnPropertyMutation();

    const onClickDeleteProperty = (id) => {
        const isConfirmed = confirm('Сигурни ли сте че искате да изтриете този имот');
        if (isConfirmed) {
            removeOwnProperty(id);
            deleteReportsById(id);
        }
    };
    const onClickDeleteReportedProperty = (id) => {
        const isConfirmed = confirm('Сигурни ли сте че искате да изтриете този имот');
        if (isConfirmed) {
            deleteReportsById(id);
        }
    };

    return (
        <div>
            {isLoadingReportedProperty &&
                Array(1)
                    .fill()
                    .map((_, index) => (
                        <div key={index} className=' h-64 w-full cursor-pointer object-cover'>
                            <TextSkeleton />
                            <ImageSkeleton />
                            <TextSkeleton />
                            <TextSkeleton />
                        </div>
                    ))}

            {property && (
                <>
                    <div className='flex items-center justify-between'>
                        <h2>{property?.neighbourhood}</h2>
                    </div>
                    <div className='rounded-lg border border-gray-200'>
                        <ImageScroll images={property?.images} />
                        <div className='rounded-b-lg bg-white px-2 py-2 shadow'>
                            <div className='flex items-center justify-between font-bold'>
                                <p>Вид:{property?.numberOfRooms}</p>
                                <p>Цена: {property?.price} EUR</p>
                            </div>
                            <div className='flex items-center justify-between italic'>
                                <p>
                                    Квадратура: {property?.space} m<sup>2</sup>
                                </p>
                                <p>
                                    Цена на квадрат:{' '}
                                    {(property?.price / property?.space).toFixed(2)} EUR
                                </p>
                            </div>
                            <div className='flex items-center justify-between italic'>
                                <p>Етаж: {property?.floor}</p>
                                <p>Етажи: {property?.totalFloorsInBuilding}</p>
                            </div>
                            <div className='flex items-center justify-between italic'>
                                <p>Строителство: {property?.buildingType}</p>
                                <p>Завършеност: {property?.finish}</p>
                            </div>
                            <div className='flex items-center justify-between italic'>
                                <p>Обзавеждане: {property?.finish}</p>
                                <p>Отопление: {property?.heating}</p>
                            </div>
                            {/* {property.exposure && (
                                <div className='flex items-center justify-between italic'>
                                    <p>Изложение: {property?.exposure}</p>
                                </div>
                            )} */}
                            {/* <p>Допълнителна информация: {property?.description}</p> */}
                            {property && property.contactInfo && (
                                <div className='flex items-center'>
                                    <div className='flex-1 italic'>
                                        <p className='mt-1'>
                                            Име: {property?.contactInfo.firstName}{' '}
                                            {property.contactInfo.lastName}
                                        </p>
                                        <p>{property?.contactInfo.phoneNumber}</p>
                                        <a href={`mailto:${property?.contactInfo.email}`}>
                                            {property?.contactInfo.email}
                                        </a>
                                    </div>
                                    <img
                                        className='mx-2 h-14 w-14 rounded-full bg-white object-cover'
                                        src={
                                            property.contactInfo?.imageURL
                                                ? property.contactInfo.imageURL
                                                : '/src/assets/images/profile.svg'
                                        }
                                        alt=''
                                    />
                                </div>
                            )}
                            <div className='mt-2 flex justify-around'>
                                <div className='w-fit'>
                                    <button
                                        onClick={() => onClickDeleteProperty(propertyId)}
                                        className='mb-2 me-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium uppercase text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-900'
                                    >
                                        Изтриване на Имота
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {reports &&
                            reports.map((rep, index) => (
                                <div
                                    key={index}
                                    className='my-1 block max-w-full rounded-lg border border-gray-200 bg-slate-50 p-6 shadow hover:bg-slate-100'
                                >
                                    <p>
                                        Дата на публикуване: {new Date(rep.timeStamp).getDate()}/
                                        {new Date(rep.timeStamp).getMonth() + 1}/
                                        {new Date(rep.timeStamp).getFullYear()}
                                    </p>
                                    <p>Потребител: {rep.userName}</p>
                                    <p>Докладван проблем: {rep.reason}</p>
                                </div>
                            ))}
                    </div>
                    <div className='my-2 flex justify-around'>
                        <div className='w-fit'>
                            <button
                                onClick={() => onClickDeleteReportedProperty(propertyId)}
                                className='mb-2 me-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium uppercase text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-900'
                            >
                                Изтриване на нередностите
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReportedProperty;
