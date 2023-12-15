import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import ImageScroll from '../../../UI/ImageScroll';
import CardBtn from './CardBtn';

const CatalogOwnItem = ({ property }) => {
    return (
        <div>
            <CardHeader property={property} />
            <ImageScroll images={property?.images} />
            <CardFooter property={property} />
            <CardBtn property={property} />
        </div>
    );
};

export default CatalogOwnItem;
