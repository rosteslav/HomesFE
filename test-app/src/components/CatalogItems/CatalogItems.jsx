import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../UI/Loader';
import { CatalogItem } from './CatalogItem/CatalogItem';
import CatalogOwnItem from './CatalogOwnItems/CatalogOwnItem';
import CatalogFilter from './CatalogFilter';
import {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
} from '../../services/propertiesApi';

export const CatalogItems = () => {
    const [skip, setSkip] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);

    const queryData = useSelector((state) => state.filter.queryData);

    const { data: properties, isLoading } = useFetchAllPropertiesQuery({
        ...queryData,
        page: page,
    });

    const targetRef = useRef();

    const { data: clientProperties } = useFetchOwnPropertiesQuery(undefined, { skip });
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
            if (isLoading) {
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
        [isLoading, hasMorePages]
    );

    return (
        <section>
            {isLoading && <Loader />}

            {clientProperties && clientProperties.length > 0 && (
                <div className='border-b-2  border-black'>
                    <h2 className='mt-4 text-center text-2xl font-semibold'>Вашите Обяви</h2>
                    <div className='mx-10 mt-4 grid gap-10  pb-10 md:grid-cols-2 lg:grid-cols-3'>
                        {clientProperties.map((i, inx) => (
                            <CatalogOwnItem key={inx} property={i} />
                        ))}
                    </div>
                </div>
            )}

            <h2 className='mt-4 text-center text-2xl font-semibold'>Обяви</h2>
            <CatalogFilter setPage={setPage} />
            {properties && properties.length > 0 && (
                <div className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {properties.map((i, index) => {
                        if (properties.length === index + 1) {
                            return (
                                <CatalogItem reference={lastPropertyElement} key={i.id} property={i} />
                            );
                        } else {
                            return <CatalogItem key={i.id} property={i} />;
                        }
                    })}
                </div>
            )}

            {properties && properties.length === 0 && !isLoading && (
                <h1 className='mt-10 text-center text-xl font-bold'>Не са намерени имоти</h1>
            )}
        </section>
    );
};
