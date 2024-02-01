// Components
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';

// UI
import ImageScroll from '../../../UI/ImageScroll';

const CatalogItem = ({ property, reference, star }) => {
    return (
        <div ref={reference}>
            <CardHeader property={property} />
            <ImageScroll star={star} images={property.images} propertyId={property.id} />
            <CardFooter property={property} />
        </div>
    );
};

export default CatalogItem;
