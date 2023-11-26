import Loader from '../../UI/Loader';
import { useProperties } from '../../hooks/useProperties';
import { getRandomImage } from '../../mock/mock';
import { CatalogItem } from './CatalogItem/CatalogItem';

export const CatalogItems = () => {
    const { properties, isLoading } = useProperties();

    return (
        <>
            {isLoading && <Loader />}

            <section className='mx-10 mt-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
                {properties.map((i) => (
                    <CatalogItem
                        key={i.id}
                        property={i}
                        images={[
                            getRandomImage(),
                            getRandomImage(),
                            getRandomImage(),
                            getRandomImage(),
                            getRandomImage(),
                        ]}
                    />
                ))}
            </section>

            {properties.length === 0 && !isLoading && (
                <h1 className='mt-10 text-center text-xl font-bold'>Не са намерени имоти</h1>
            )}
        </>
    );
};
