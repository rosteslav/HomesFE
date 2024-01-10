import { useState } from 'react';
import { ButtonPrimary } from '../../UI';
import AllPropertiesDashboard from './AllPropertiesDashboard';
import ReportedPropertiesDashboard from './ReportedPropertiesDashboard';
import ChangeNeighborhoodsDashboard from './ChangeNeighborhoodsDashboard';

const Dashboard = () => {
    const [action, setAction] = useState('allProperties');
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonAction = (e) => {
        setAction(e);
    };

    return (
        <div className=''>
            <div className={`fixed z-[60] ${isOpen && 'rounded-e-xl bg-gray-200'}`}>
                <div className={`relative m-3  `}>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className='relative mb-4 h-10 w-10 rounded-full bg-indigo-600 focus:outline-none'
                    >
                        <div className='absolute   top-1/2 block h-5 w-5   -translate-x-1/2  -translate-y-1/2 transform'>
                            <span
                                className={`absolute left-5 top-0 block h-0.5 w-5 transform bg-current text-white transition duration-500 ease-in-out ${
                                    isOpen && 'translate-y-2.5 rotate-45'
                                }`}
                            ></span>
                            <span
                                className={`absolute left-4 top-1/2 block h-0.5 w-7 transform bg-current   text-white transition duration-500 ease-in-out ${
                                    isOpen && 'opacity-0'
                                }`}
                            ></span>
                            <span
                                className={`absolute left-5 top-full block  h-0.5 w-5 transform bg-current text-white  transition duration-500 ease-in-out ${
                                    isOpen && '-translate-y-2.5 -rotate-45'
                                }`}
                            ></span>
                        </div>
                    </button>
                    <nav
                        onClick={() => setIsOpen(false)}
                        className={`transform transition duration-500 ease-in-out ${
                            isOpen ? 'translate-x-0' : '-translate-x-96'
                        }`}
                    >
                        <ul>
                            <li className='mb-4'>
                                <ButtonPrimary action={() => handleButtonAction('allProperties')}>
                                    Всички имоти
                                </ButtonPrimary>
                            </li>
                            <li className='mb-4'>
                                <ButtonPrimary
                                    action={() => handleButtonAction('reportedProperties')}
                                >
                                    Проблемни имоти
                                </ButtonPrimary>
                            </li>
                            <li className='mb-4'>
                                <ButtonPrimary
                                    action={() => handleButtonAction('changeNeighbourhood')}
                                >
                                    Редактиране на квартали
                                </ButtonPrimary>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='px-16'>
                {
                    <div onClick={() => setIsOpen(false)}>
                        {action === 'allProperties' && <AllPropertiesDashboard />}
                        {action === 'reportedProperties' && <ReportedPropertiesDashboard />}
                        {action === 'changeNeighbourhood' && <ChangeNeighborhoodsDashboard />}
                    </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;
