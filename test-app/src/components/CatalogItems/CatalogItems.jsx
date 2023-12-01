import { useEffect, useRef } from 'react';

import Loader from '../../UI/Loader';
import { CatalogItem } from './CatalogItem/CatalogItem';
import CatalogOwnItem from './CatalogOwnItems/CatalogOwnItem';
import { useDispatch, useSelector } from 'react-redux';
import useThunk from '../../hooks/use-thunk';
import { addAllProperties, addOwnProperty } from '../../store/slices/properties/propertiesThunk';
import {
    fetchAllProperties,
    fetchOwnProperties,
} from '../../store/slices/properties/propertiesSlice';


export const CatalogItems = () => {
    const properties = useSelector((state) => state.properties.data.all);
    const ownProp = useSelector((state) => state.properties.data.ownProperties);
    const fetcher = useSelector((state) => state.properties.fetcher);
    const [doAddAllProperties, isLoading] = useThunk(addAllProperties);
    const [doAddOwnProperties] = useThunk(addOwnProperty);
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.data.claims?.roles);
    const ownPropertiesRef = useRef(ownProp);

    useEffect(() => {
        if (!fetcher.all) {
            doAddAllProperties();
            dispatch(fetchAllProperties());
        }
    }, [doAddAllProperties, dispatch, fetcher, ownProp]);

    useEffect(() => {
        if (role && (role[1] === 'Продавач' || role[1] === 'Брокер') && !fetcher.ownProperties) {
            doAddOwnProperties();
            dispatch(fetchOwnProperties());
        }
    }, [role, dispatch, doAddOwnProperties, ownProp, fetcher]);

    useEffect(() => {
        ownPropertiesRef.current = ownProp;
    }, [ownProp]);

    return (
        <section>
            {isLoading && <Loader />}

            {ownPropertiesRef.current.length > 0 && (
                <>
                    <h2 className='mt-4 text-center text-2xl font-semibold'>Вашите Обяви</h2>
                    <div className='mx-10 mt-4 grid gap-10 border-b-2 border-black pb-10 md:grid-cols-2 lg:grid-cols-3'>
                        {ownPropertiesRef.current.map((i, inx) => (
                            <CatalogOwnItem key={inx} property={i} />
                        ))}
                    </div>
                </>
            )}
            {properties.length > 0 && (
                <>
                    <h2 className='mt-4 text-center text-2xl font-semibold'>Обяви</h2>
                    <div className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                        {properties.map((i) => (
                            <CatalogItem
                                key={i.id}
                                property={i}
                            />
                        ))}
                    </div>
                </>
            )}

            {properties.length === 0 && !isLoading && (
                <h1 className='mt-10 text-center text-xl font-bold'>Не са намерени имоти</h1>
            )}
        </section>
    );
};
