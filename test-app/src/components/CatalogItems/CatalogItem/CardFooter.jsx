const CardFooter = ({ property }) => {
    const type = property?.type || '';
    const rooms = property?.numberOfRooms || '';
    const price = property?.price || 'неизвестна цена';
    const quadrature = property?.space || 'неизвестна квадратура';

    return (
        <div className='flex items-center justify-between'>
            <p>
                {type}, {rooms} стаи, {quadrature} m<sup>2</sup>
            </p>
            <p>{price}</p>
        </div>
    );
};

export default CardFooter;
