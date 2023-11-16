const CardFooter = ({ property }) => {
    const type = property?.type || 'unknown type';
    const rooms = property?.numberOfRooms || 'unknown rooms';
    const price = property?.price || 'unknown price';
    const quadrature = property?.space || 'unknown quadrature';

    return (
        <div className='flex items-center justify-between'>
            <p>
                {type}, {rooms} rooms, {quadrature} m<sup>2</sup>
            </p>
            <p>{price}</p>
        </div>
    );
};

export default CardFooter;
