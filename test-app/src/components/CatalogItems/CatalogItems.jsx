import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { CatalogItem } from './CatalogItem/CatalogItem';
import CatalogOwnItem from './CatalogOwnItems/CatalogOwnItem';
import CatalogFilter from './CatalogFilter';
import {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
} from '../../services/propertiesApi';
import { ImageSkeleton, TextSkeleton } from '../../UI/Skeletons';

export const CatalogItems = () => {
    const [skip, setSkip] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);

    const queryData = useSelector((state) => state.filter.queryData);

    const { data: properties, isLoading: isLoadingProperties } = useFetchAllPropertiesQuery({
        ...queryData,
        page: page,
    });

    const targetRef = useRef();

    const { data: clientProperties, isLoading: isLoadingClientProperties } =
        useFetchOwnPropertiesQuery(undefined, { skip });

    const role = useSelector((state) => state.authUser.data?.claims?.roles);

    useEffect(() => {
        if (role && (role[1] === 'Продавач' || role[1] === 'Брокер')) {
            setSkip(false);
        }
    }, [role]);

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
        <section>
            {clientProperties && clientProperties.length > 0 && (
                <div className='border-b-2  border-black'>
                    <h2 className='mt-4 text-center text-2xl font-semibold'>Вашите Обяви</h2>
                    <div className='mx-10 mt-4 grid gap-10  pb-10 md:grid-cols-2 lg:grid-cols-3'>
                        {isLoadingClientProperties &&
                            Array(3)
                                .fill()
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className='h-64 w-full cursor-pointer object-cover'
                                    >
                                        <TextSkeleton />
                                        <ImageSkeleton />
                                        <TextSkeleton />
                                        <TextSkeleton />
                                    </div>
                                ))}
                        {clientProperties.map((i, inx) => (
                            <CatalogOwnItem key={inx} property={i} />
                        ))}
                    </div>
                </div>
            )}

            <h2 className='mt-4 text-center text-2xl font-semibold'>Обяви</h2>
            <CatalogFilter setPage={setPage} />
            {isLoadingProperties && (
                <div className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {Array(24)
                        .fill()
                        .map((_, index) => (
                            <div key={index} className='h-64 w-full cursor-pointer object-cover'>
                                <TextSkeleton />
                                <ImageSkeleton />
                                <TextSkeleton />
                                <TextSkeleton />
                            </div>
                        ))}
                </div>
            )}
            {properties && properties.length > 0 && (
                <div className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {properties.map((i, index) => {
                        if (properties.length === index + 1) {
                            return (
                                <CatalogItem
                                    reference={lastPropertyElement}
                                    key={index}
                                    property={i}
                                />
                            );
                        } else {
                            return <CatalogItem key={index} property={i} />;
                        }
                    })}
                </div>
            )}

            {properties && properties.length === 0 && !isLoadingProperties && (
                <h1 className='mt-10 text-center text-xl font-bold'>Не са намерени имоти</h1>
            )}
        </section>
    );
};
