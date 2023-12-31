import { useState } from 'react';

import './registerUserForm.css';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';
import FormStepThree from './FormStepThree';

const RegisterUserForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [chosenRole, setChosenRole] = useState([]);
    const [stepTwoValues, setStepTwoValues] = useState({
        username: '',
        email: '',
        password: '',
        repPassword: '',
    });

    const [stepThreeValues, setStepThreeValues] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const [stepThreeBuyerValues, setStepThreeBuyerValues] = useState({
        purposes: [],
        numberOfRooms: [],
        regions: [],
        buildingTypes: [],
        priceHigherEnd: '',
    });

    return (
        <div>
            <div className='flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8'>
                <div className='flex items-center justify-center'>
                    {Array(3)
                        .fill()
                        .map((_, i) => (
                            <div
                                key={i}
                                className={`step-item mt-10 ${currentStep === i + 1 && 'active'} ${
                                    (i + 1 < currentStep || complete) && 'complete'
                                } `}
                            >
                                <div className='step'>
                                    {i + 1 < currentStep || complete ? (
                                        <i className='fas fa-check'></i>
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Регистрация
                    </h2>
                </div>
                {currentStep == 1 && (
                    <FormStepOne setChosenRole={setChosenRole} setCurrentStep={setCurrentStep} />
                )}
                {currentStep == 2 && (
                    <FormStepTwo
                        setCurrentStep={setCurrentStep}
                        stepTwoValues={stepTwoValues}
                        setStepTwoValues={setStepTwoValues}
                    />
                )}
                {currentStep == 3 && (
                    <FormStepThree
                        chosenRole={chosenRole}
                        stepThreeValues={stepThreeValues}
                        setStepThreeValues={setStepThreeValues}
                        setCurrentStep={setCurrentStep}
                        stepThreeBuyerValues={stepThreeBuyerValues}
                        setStepThreeBuyerValues={setStepThreeBuyerValues}
                        stepTwoValues={stepTwoValues}
                        setComplete={setComplete}
                    />
                )}
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'></div>
            </div>
        </div>
    );
};

export default RegisterUserForm;
