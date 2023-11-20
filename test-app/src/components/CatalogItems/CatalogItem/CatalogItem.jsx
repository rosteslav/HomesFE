import { Link } from 'react-router-dom';
import { getRandomImage } from '../../../mock/mock';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import { ButtonSecondary } from '../../../UI';

export const CatalogItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <Link to={`/${property.id}`} className='link'>
                <img className='h-56 w-full cursor-pointer object-cover' src={getRandomImage()} />
            </Link>
            <CardFooter property={property} />
            <Link to={`/${property.id}`} className='link'>
                <ButtonSecondary>Details</ButtonSecondary>
            </Link>
        </div>
    );
};
