import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../UI/Loader';
import { CatalogItem } from './CatalogItem/CatalogItem';
import CatalogOwnItem from './CatalogOwnItems/CatalogOwnItem';

import {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
} from '../../services/propertiesApi';

export const CatalogItems = () => {
    const [skip, setSkip] = useState(true);
    const { data: properties, isLoading } = useFetchAllPropertiesQuery();
    const { data: clientProperties } = useFetchOwnPropertiesQuery(undefined, { skip });
    const role = useSelector((state) => state.authUser.data?.claims?.roles);

    useEffect(() => {
        if (role && (role[1] === 'Продавач' || role[1] === 'Брокер')) {
            setSkip(false);
        }
    }, [role]);

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
            
            {properties && properties.length > 0 && (
                <div className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                    {properties.map((i) => (
                        <CatalogItem key={i.id} property={i} />
                    ))}
                </div>
            )}

            {properties && properties.length === 0 && !isLoading && (
                <h1 className='mt-10 text-center text-xl font-bold'>Не са намерени имоти</h1>
            )}
        </section>
    );
};
