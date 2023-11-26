import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import ImageScroll from './ImageScroll';

export const CatalogItem = ({ property, images }) => {
    return (
        <div>
            <CardHeader property={property} />
            <ImageScroll images={images} propertyId={property.id} />
            <CardFooter property={property} />
        </div>
    );
};
