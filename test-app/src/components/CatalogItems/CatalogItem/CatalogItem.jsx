import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import ImageScroll from '../../../UI/ImageScroll';

export const CatalogItem = ({ property, reference }) => {
    return (
        <div ref={reference}>
            <CardHeader property={property} />
            <ImageScroll images={property.images} propertyId={property.id} />
            <CardFooter property={property} />
        </div>
    );
};
