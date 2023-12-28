import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CatalogItem } from './CatalogItem/CatalogItem';
import CatalogOwnItem from './CatalogOwnItems/CatalogOwnItem';
import CatalogFilter from './CatalogFilter';
import {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
    useFetchRecommendedPropertiesQuery,
} from '../../services/propertiesApi';
import { ImageSkeleton, TextSkeleton } from '../../UI/Skeletons';
import { Link } from 'react-router-dom';
import { loadLikedProperties } from '../../store/features/likedProperties';

export const CatalogItems = () => {
    const [skip, setSkip] = useState(true);
    const [skipBuyer, setSkipBuyer] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(false);
    const [showRecommendedProperties, setShowRecommendedProperties] = useState(true);
    const [showLikedProperties, setShowLikedProperties] = useState(false);
    const allLikedProperties = useSelector((state) => state.likedProperties.data);
    const user = useSelector((state) => state.authUser);
    const role = useSelector((state) => state.authUser.data?.claims?.roles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadLikedProperties());
    }, [dispatch]);

    const queryData = useSelector((state) => state.filter.queryData);

    const { data: properties, isLoading: isLoadingProperties } = useFetchAllPropertiesQuery({
        ...queryData,
        page: page,
    });

    const { data: recommendedProperties, isLoading: isLoadingRecommendedProperties } =
        useFetchRecommendedPropertiesQuery(undefined, {
            skip: skipBuyer,
        });

    const targetRef = useRef();

    const { data: clientProperties, isLoading: isLoadingClientProperties } =
        useFetchOwnPropertiesQuery(undefined, { skip });

    useEffect(() => {
        if (role && (role[1] === 'Продавач' || role[1] === 'Брокер')) {
            setSkip(false);
        }
    }, [role]);

    useEffect(() => {
        if (user.data !== null && role[1] === 'Купувач') {
            setSkipBuyer(false);
        } else {
            setSkipBuyer(true);
        }
    }, [user, role]);

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
            {skip === true && (
                <div className='border-b-2  border-black'>
                    <h2
                        onClick={() =>
                            setShowRecommendedProperties(
                                (prevShowRecommendedProperties) => !prevShowRecommendedProperties
                            )
                        }
                        className='m-4 cursor-pointer text-center text-2xl font-semibold'
                    >
                        Препоръчани за вас
                    </h2>
                    {!recommendedProperties && (
                        <div
                            className={`${
                                showRecommendedProperties ? 'hidden' : ''
                            } pb-3 text-center text-xl`}
                        >
                            <p className='mt-10 text-center text-sm text-gray-800'>
                                Моля{' '}
                                <Link
                                    to={'auth/register'}
                                    className='ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                                >
                                    регистрирайте се
                                </Link>
                                , за да получите препоръчани за Вас имоти.
                            </p>
                        </div>
                    )}
                    {recommendedProperties && recommendedProperties.length > 0 && (
                        <div
                            className={`${
                                showRecommendedProperties ? '' : 'hidden'
                            } mx-10 mt-4 grid gap-10  pb-10 md:grid-cols-2 lg:grid-cols-3`}
                        >
                            {isLoadingRecommendedProperties &&
                                Array(6)
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
                            {recommendedProperties.map((i, inx) => (
                                <CatalogItem key={inx} property={i} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <h2 className='mt-4 text-center text-2xl font-semibold'>Обяви</h2>
            <CatalogFilter
                setPage={setPage}
                showLikedProperties={showLikedProperties}
                setShowLikedProperties={setShowLikedProperties}
                role={role}
            />
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
                    {showLikedProperties &&
                        properties.map((i, index) => {
                            if (showLikedProperties) {
                                if (allLikedProperties.includes(i.id)) {
                                    return <CatalogItem key={index} property={i} />;
                                }
                            }
                            if (properties.length === index + 1) {
                                return <div key={index} ref={lastPropertyElement}></div>;
                            }
                        })}
                    {!showLikedProperties &&
                        properties.map((i, index) => {
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
