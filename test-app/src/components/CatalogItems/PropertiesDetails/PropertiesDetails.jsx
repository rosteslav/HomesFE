import { useParams } from 'react-router-dom';

import { getRandomImage } from '../../../mock/mock';
import { useSelectedProperties } from '../../../hooks/useProperties';
import Loader from '../../../UI/Loader';
import DetailsImages from './DetailsImages';

export const PropertiesDetails = () => {
    const { detailsId } = useParams();

    const { property, isLoading } = useSelectedProperties(detailsId);
    const images = [
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
    ];
    console.log(property);

    const pricePerSqm = property?.price / property?.space;

    return (
        <section className='m-4 mt-10'>
            {isLoading && <Loader />}
            <h1 className='text-3xl font-semibold'>
                {property?.numberOfRooms}-стаен апартамент за продажба, {property?.space} m
                <sup>2</sup>
            </h1>
            <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <DetailsImages images={images} />
                <div className='text-xl'>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>{property?.neighbourhood}</p>
                        <p>
                            <span className='font-semibold'>{property?.price}</span> EUR
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <p>{property?.neighbourhood}</p>
                        <p>
                            {pricePerSqm && (
                                <h2>
                                    ({pricePerSqm.toFixed(3)} EUR/m<sup>2</sup>)
                                </h2>
                            )}
                        </p>
                    </div>
                    <p className='pt-4'>
                        <span className='font-bold'>Обзавеждане: </span>
                        {property?.furnishment}
                    </p>
                    <p>
                        <span className='font-bold'>Етаж: </span>
                        {property?.floor}
                    </p>
                    <p>
                        <span className='font-bold'>Етажи: </span>
                        {property?.totalFloorsInBuilding}
                    </p>
                    <p>
                        <span className='font-bold'>Отопление: </span>
                        {property?.heating}
                    </p>
                    <p>
                        <span className='font-bold'>Строителство: </span>
                        {property?.buildingType}
                    </p>
                    <p className='border-b-2 border-black pt-4 font-bold'>
                        Допълнителна информация
                    </p>
                    <p>{property?.description}</p>
                </div>
            </div>
        </section>
    );
};
