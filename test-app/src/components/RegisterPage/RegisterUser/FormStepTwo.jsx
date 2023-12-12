import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { validationRegisterSchemaStepTwo } from '../../../services/validationSchema';
import FloatingField from '../../../UI/FloatingField';

const FormStepTwo = ({ setCurrentStep, stepTwoValues, setStepTwoValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationRegisterSchemaStepTwo),
    });

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const onSubmitHandler = (data) => {
        console.log(data);
        setCurrentStep(3);
    };

    const onChangeHandler = (e) => {
        setStepTwoValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className='m-auto mt-4 w-96 space-y-6'>
            <FloatingField
                placeholder='Потребителско име'
                name='username'
                type='text'
                onChangeHandler={onChangeHandler}
                register={register}
                values={stepTwoValues}
                errors={errors}
            />
            <FloatingField
                placeholder='Електронна поща'
                name='email'
                type='text'
                onChangeHandler={onChangeHandler}
                register={register}
                values={stepTwoValues}
                errors={errors}
            />
            <FloatingField
                placeholder='Парола'
                name='password'
                type='password'
                onChangeHandler={onChangeHandler}
                register={register}
                values={stepTwoValues}
                errors={errors}
                passwordVisibility={passwordVisibility}
                setPasswordVisibility={setPasswordVisibility}
            />
            <FloatingField
                placeholder='Потвърждение на парола'
                name='repPassword'
                type='password'
                onChangeHandler={onChangeHandler}
                register={register}
                values={stepTwoValues}
                errors={errors}
                passwordVisibility={passwordVisibility}
                setPasswordVisibility={setPasswordVisibility}
            />
            <div className='flex justify-between gap-10'>
                <ButtonSecondary action={() => setCurrentStep(1)}>Назад</ButtonSecondary>
                <ButtonPrimary>Напред</ButtonPrimary>
            </div>
        </form>
    );
};

export default FormStepTwo;
