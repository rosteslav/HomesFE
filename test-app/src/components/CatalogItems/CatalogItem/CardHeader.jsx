const CardHeader = ({ property }) => {
    const time = property?.time || 'Unknown date';
    const address = property?.district || 'Unknown address';
    return (
        <div className='flex items-center justify-between'>
            <h2>{time}</h2>
            <h2>{address}</h2>
        </div>
    );
};

export default CardHeader;
