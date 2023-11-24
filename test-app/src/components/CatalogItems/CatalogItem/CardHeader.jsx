const CardHeader = ({ property }) => {
    return (
        <div className='flex items-center justify-between'>
            <h2>Днес</h2>
            <h2>{property?.neighbourhood}</h2>
        </div>
    );
};

export default CardHeader;
