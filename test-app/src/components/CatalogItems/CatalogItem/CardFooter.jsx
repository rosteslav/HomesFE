const CardFooter = ({ property }) => {
    const propertyDetails = property?.details?.split(',')
    return (
        <>
            <div className='flex items-center justify-between font-bold'>
                <p>
                    {property?.numberOfRooms}, {property?.space} m<sup>2</sup>
                </p>
                <p>{property?.price} EUR</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>{propertyDetails && propertyDetails.join(', ')}</p>
                <p className="text-right">
                    {(property?.price / property?.space).toFixed(2)} EUR/m<sup>2</sup>
                </p>
            </div>
        </>
    );
};

export default CardFooter;
