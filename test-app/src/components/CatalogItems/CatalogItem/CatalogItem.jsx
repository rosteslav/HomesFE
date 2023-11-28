import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import ImageScroll from '../../../UI/ImageScroll';

export const CatalogItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <ImageScroll images={property.images} propertyId={property.id} />
            <CardFooter property={property} />
        </div>
    );
};
