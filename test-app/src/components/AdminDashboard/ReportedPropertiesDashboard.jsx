import { useEffect, useState } from 'react';
import { useFetchAllReportsQuery } from '../../services/adminApi';
import { useFetchAllPropertiesQuery } from '../../services/propertiesApi';
import ReportedProperty from './reportedProperty';
import { ImageSkeleton, TextSkeleton } from '../../UI/Skeletons';

const ReportedPropertiesDashboard = () => {
    const [skip, setSkip] = useState(false);
    const [isIncludes, setIsIncludes] = useState([]);
    const { data: reportedProperties } = useFetchAllReportsQuery();
    const { data: properties, isLoading, isSuccess } = useFetchAllPropertiesQuery({}, { skip });

    useEffect(() => {
        if (skip === false && isSuccess) {
            setSkip(true);
            const arrOfIds = [];
            for (const p of properties) {
                arrOfIds.push(p.id);
            }
            setIsIncludes(arrOfIds);
        }
    }, [skip, isSuccess, properties, isIncludes]);

    return (
        <div className='relative mx-5 mt-4 grid gap-10  pb-10 md:grid-cols-2 lg:grid-cols-3'>
            {isLoading &&
                Array(24)
                    .fill()
                    .map((_, index) => (
                        <div key={index} className='h-64 w-full cursor-pointer object-cover'>
                            <TextSkeleton />
                            <ImageSkeleton />
                            <TextSkeleton />
                            <TextSkeleton />
                        </div>
                    ))}

            {!isLoading && reportedProperties && reportedProperties.length > 0 ? (
                reportedProperties.map((prop) => {
                    if (isIncludes.includes(prop.propertyId)) {
                        return (
                            <ReportedProperty
                                key={prop.propertyId}
                                propertyId={prop.propertyId}
                                reports={prop.reports}
                            />
                        );
                    } else {
                        return <span className='hidden' key={prop.propertyId}></span>;
                    }
                })
            ) : (
                <h3 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Няма намерени проблемни имоти
                </h3>
            )}
        </div>
    );
};

export default ReportedPropertiesDashboard;
