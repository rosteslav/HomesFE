import { getRandomImage } from '../../../mock/mock';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';

export const CatalogItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <img className='h-56 w-full cursor-pointer object-cover' src={getRandomImage()}></img>
            <CardFooter property={property} />
        </div>
    );
};
