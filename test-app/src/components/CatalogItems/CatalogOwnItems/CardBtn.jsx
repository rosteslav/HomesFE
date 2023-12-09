import { Link } from 'react-router-dom';
import { useDeleteOwnPropertyMutation } from '../../../services/propertiesApi';

const CardBtn = ({ property }) => {
    const [removeOwnProperty, result] = useDeleteOwnPropertyMutation();
    const onClickSubmit = (id) => {
        removeOwnProperty(id);
    };
    return (
        <div className='my-2 flex justify-around'>
            <div className='w-fit'>
                <button
                    onClick={() => onClickSubmit(property.id)}
                    className='mb-2 me-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium uppercase text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-900'
                >
                    Изтриване
                </button>
            </div>
            <div className='w-fit'>
            <Link to={`createProperty/edit/${property.id}`} className="link" ><button
                    className='mb-2 me-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium uppercase text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-900'
                >
                    Редактиране
                </button></Link>
            </div>
        </div>
    );
};

export default CardBtn;