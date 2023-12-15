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
                <p>Цена на квадрат: {(property?.price / property?.space).toFixed(2)} EUR</p>
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
            {property.exposure && (
                <div className='flex items-center justify-between italic'>
                    <p>Изложение: {property?.exposure}</p>
                </div>
            )}
            <p>Допълнителна информация: {property?.description}</p>
            {property && property.contactInfo && (
                <div className='flex items-center'>
                    <div className='italic flex-1'>
                        <p className='mt-1'>
                            Име: {property?.contactInfo.firstName} {property.contactInfo.lastName}
                        </p>
                        <p>{property?.contactInfo.phoneNumber}</p>
                        <a href={`mailto:${property?.contactInfo.email}`}>
                            {property?.contactInfo.email}
                        </a>
                    </div>
                    <img
                        className='mx-2 h-14 w-14 rounded-full bg-white object-cover'
                        src={
                            property.contactInfo?.imageURL
                                ? property.contactInfo.imageURL
                                : '/src/assets/images/profile.svg'
                        }
                        alt=''
                    />
                </div>
            )}
        </>
    );
};

export default CardFooter;
