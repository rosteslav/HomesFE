const CardHeader = ({ property }) => {
    const time = property?.time || 'Няма дата';
    const address = property?.district || 'Няма адрес';
    return (
        <div className='flex items-center justify-between'>
            <h2>{time}</h2>
            <h2>{address}</h2>
        </div>
    );
};

export default CardHeader;
