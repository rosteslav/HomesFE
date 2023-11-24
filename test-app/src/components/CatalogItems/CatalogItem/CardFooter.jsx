const CardFooter = ({ property }) => {
    return (
        <>
            <div className='flex items-center justify-between font-bold'>
                <p>
                    {property?.numberOfRooms}-стаен, {property?.space} m<sup>2</sup>
                </p>
                <p>{property?.price} EUR</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>{property?.details}</p>
                <p>
                    {(property?.price / property?.space).toFixed(3)} EUR/m<sup>2</sup>
                </p>
            </div>
        </>
    );
};

export default CardFooter;
