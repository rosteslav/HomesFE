const CardFooter = ({ property }) => {
    return (
        <>
            <div className='flex items-center justify-between font-bold'>
                <p>Вид:{property?.numberOfRooms}</p>
                <p>Цена: {property?.price} EUR</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>
                    Квадратура: {property?.space} m<sup>2</sup>
                </p>
                <p>Цена на квадрат: {(property?.price / property?.space).toFixed(3)} EUR</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>Етаж: {property?.floor}</p>
                <p>Етажи: {property?.totalFloorsInBuilding}</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>Строителство: {property?.buildingType}</p>
                <p>Завършеност: {property?.finish}</p>
            </div>
            <div className='flex items-center justify-between italic'>
                <p>Обзавеждане: {property?.finish}</p>
                <p>Отопление: {property?.heating}</p>
            </div>
            <p>Допълнителна информация: {property?.description}</p>
            {property && property.contactInfo && (
                <>
                    <p className='mt-1'>
                        Име: {property?.contactInfo.firstName} {property.contactInfo.lastName}
                    </p>
                    <div className='flex items-center justify-between italic'>
                        <p>{property?.contactInfo.phoneNumber}</p>
                        <a href={`mailto:${property?.contactInfo.email}`}>
                            {property?.contactInfo.email}
                        </a>
                    </div>
                </>
            )}
        </>
    );
};

export default CardFooter;
