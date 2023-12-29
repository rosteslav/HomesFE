import { useState } from 'react';
import { ButtonPrimary } from '../../UI';
import AllPropertiesDashboard from './AllPropertiesDashboard';
import ReportedPropertiesDashboard from './ReportedPropertiesDashboard';
import ChangeNeighborhoodsDashboard from './ChangeNeighborhoodsDashboard';

const Dashboard = () => {
    const [action, setAction] = useState();

    const handleButtonAction = (e) => {
        setAction(e);
    };

    return (
        <div className=''>
            <nav className='fixed h-full bg-gray-200 px-3'>
                <ul>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('allProperties')}>
                            Всички имоти
                        </ButtonPrimary>
                    </li>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('reportedProperties')}>
                            Проблемни имоти
                        </ButtonPrimary>
                    </li>
                    <li className='mb-4'>
                        <ButtonPrimary action={() => handleButtonAction('changeNeighbourhood')}>
                            Редактиране на квартали
                        </ButtonPrimary>
                    </li>
                </ul>
            </nav>
            <div className='pl-72'>
                {!action && <p className='text-center'>Добре дошли в админ панела.</p>}
                {action === 'allProperties' && <AllPropertiesDashboard />}
                {action === 'reportedProperties' && <ReportedPropertiesDashboard />}
                {action === 'changeNeighbourhood' && <ChangeNeighborhoodsDashboard />}
            </div>
        </div>
    );
};

export default Dashboard;
