import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetchAllPropertiesQuery } from '../../services/propertiesApi';
import { ImageSkeleton, TextSkeleton } from '../../UI/Skeletons';
import { CatalogItem } from '../CatalogItems/CatalogItem/CatalogItem';

const AllPropertiesDashboard = () => {
    const targetRef = useRef();
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);

    const { data: properties, isLoading: isLoadingProperties } = useFetchAllPropertiesQuery({
        orderBy: ['CreatedOnLocalTime'],
        page: page,
    });

    useEffect(() => {
        if (properties) {
            if (properties.length % 24 === 0) {
                setHasMorePages(true);
            } else {
                setHasMorePages(false);
            }
        }
    }, [properties]);

    const lastPropertyElement = useCallback(
        (prop) => {
            if (isLoadingProperties) {
                return;
            }
            if (targetRef.current) {
                targetRef.current.disconnect();
            }
            targetRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMorePages) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (prop) {
                targetRef.current.observe(prop);
            }
        },
        [isLoadingProperties, hasMorePages]
    );

    return (
        <div className='grid gap-5 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {isLoadingProperties &&
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
            {properties &&
                properties.length > 0 &&
                properties.map((i, index) => {
                    if (properties.length === index + 1) {
                        return (
                            <CatalogItem reference={lastPropertyElement} key={index} property={i} />
                        );
                    } else {
                        return <CatalogItem key={index} property={i} />;
                    }
                })}
        </div>
    );
};

export default AllPropertiesDashboard;
