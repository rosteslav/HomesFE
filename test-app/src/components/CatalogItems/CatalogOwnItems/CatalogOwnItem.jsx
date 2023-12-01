import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import ImageScroll from '../../../UI/ImageScroll';

const CatalogOwnItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <ImageScroll images={property?.images} />
            <CardFooter property={property} />
        </div>
    );
};

export default CatalogOwnItem;
