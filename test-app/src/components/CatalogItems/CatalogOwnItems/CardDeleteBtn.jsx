import { useDeleteOwnPropertyMutation } from '../../../services/propertiesApi';

const CardDeleteBtn = ({ property }) => {
    const [removeOwnProperty, result] = useDeleteOwnPropertyMutation();
    const onClickSubmit = (id) => {
        removeOwnProperty(id);
    };
    return (
        <div className='my-2 flex justify-around'>
            <div className='w-fit'>
                <button className='btnStyle' onClick={() => onClickSubmit(property.id)}>
                    Изтриване
                </button>
            </div>
        </div>
    );
};

export default CardDeleteBtn;
