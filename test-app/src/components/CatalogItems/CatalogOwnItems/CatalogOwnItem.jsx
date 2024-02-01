// Components
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardBtn from './CardBtn';

// UI
import ImageScroll from '../../../UI/ImageScroll';

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
