import { Link } from 'react-router-dom';
import { getRandomImage } from '../../../mock/mock';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';

export const CatalogItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <Link to={`/${property.id}`} className='link'>
                <img className='h-56 w-full cursor-pointer object-cover' src={getRandomImage()} />
            </Link>
            <CardFooter property={property} />
            <Link to={`/${property.id}`} className='link'>
                <button className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Details</button>
            </Link>
        </div>
    );
};
