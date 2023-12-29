import { useState } from 'react';
import { ButtonPrimary } from '../../UI';

const Dashboard = () => {
    const [action, setAction] = useState()

    const handleButtonAction = (e) => {
        setAction(e)
    }

    return (
        <div className=''>
            <nav className='fixed h-full bg-gray-200 px-3'>
                <ul>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('Всички имоти')}>Всички имоти</ButtonPrimary>
                    </li>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('Проблемни имоти')}>Проблемни имоти</ButtonPrimary>
                    </li>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('Редактиране на квартали')}>Редактиране на квартали</ButtonPrimary>
                    </li>
                </ul>
            </nav>
            <div className='m-auto w-full'>
                <p className='text-center'>{action}</p>
            </div>
        </div>
    );
};

export default Dashboard;
