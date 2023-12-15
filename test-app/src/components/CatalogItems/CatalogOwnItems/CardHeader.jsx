import useCreatedDate from "../../../util/useCreatedDate";

const CardHeader = ({ property }) => {
    
    return (
        <div className='flex items-center justify-between'>
            <h2>{useCreatedDate(property.createdOnLocalTime)}</h2>
            <h2>{property?.neighbourhood}</h2>
        </div>
    );
};

export default CardHeader;
