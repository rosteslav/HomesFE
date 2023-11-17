import { useProperties } from '../../hooks/useProperties';
import { CatalogItem } from './CatalogItem/CatalogItem';

export const CatalogItems = () => {
    const { properties, isLoading } = useProperties();
    
    return (
        <>
            {isLoading && (
                <div className='z-50 mt-64 flex justify-center'>
                    <span className='relative flex h-20 w-20'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                        <span className='relative inline-flex h-20 w-20 rounded-full bg-sky-500  '></span>
                    </span>
                </div>
            )}
            <section className='mx-10 mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
                {properties.map((i) => (
                    <CatalogItem key={i.id} property={i} />
                ))}
            </section>
            {properties.length === 0 && !isLoading && (
                <h1 className='mt-10 text-center text-xl font-bold'>Properties not found</h1>
            )}
        </>
    );
};
