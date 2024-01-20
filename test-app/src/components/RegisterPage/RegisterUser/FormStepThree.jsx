import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// RTK Queries
import { useAddUserImageMutation } from '../../../store/features/Api/imagesApi';
import {
    useFetchBuyerPreferencesQuery,
    useLoginMutation,
    useRegisterUserMutation,
} from '../../../store/features/Api/authApi';

// Validation Schema
import {
    validationRegisterSchemaBuyerStepThree,
    validationRegisterSchemaStepThree,
} from '../../../util/validationSchema';

// UI
import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import FloatingField from '../../../UI/FloatingField';
import { ButtonFilter } from '../../../UI/ButtonsFilter';
import Loader from '../../../UI/Loader';

// Util functions
import { successNotifications } from '../../../util/notificationMessages';

const FormStepThree = ({
    setCurrentStep,
    chosenRole,
    stepThreeValues,
    setStepThreeValues,
    stepThreeBuyerValues,
    setStepThreeBuyerValues,
    stepTwoValues,
    setComplete,
}) => {
    const [imageName, setImageName] = useState('Моля изберете снимка');
    const [chosenOption, setChosenOption] = useState();

    const [addUserImage, { data: userImage, isSuccess: isSuccessImage }] =
        useAddUserImageMutation();
    const [registerUser, { isLoading, isSuccess: isSuccessRegister }] = useRegisterUserMutation();
    const [login, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin }] = useLoginMutation();
    const { data: buyerPreferences } = useFetchBuyerPreferencesQuery(undefined, {
        skip: chosenRole != 'Купувач',
    });

    const boxRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccessRegister) {
            if (isSuccessLogin) {
                toast.success(successNotifications('register'));
                toast.success(successNotifications('login'));
                navigate('/');
            } else if (isLoadingLogin) {
                console.log('loading');
            } else {
                login({
                    username: stepTwoValues.username,
                    password: stepTwoValues.password,
                });
            }
        } else {
            setComplete(false);
        }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setChosenOption(undefined);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver:
            chosenRole == 'Купувач'
                ? yupResolver(validationRegisterSchemaBuyerStepThree)
                : yupResolver(validationRegisterSchemaStepThree),
    });

    const onSubmitHandler = () => {
        setComplete(true);
        let payLoad = {
            username: stepTwoValues.username,
            email: stepTwoValues.email,
            password: stepTwoValues.password,
            role: chosenRole,
        };
        if (chosenRole == 'Купувач') {
            if (stepThreeBuyerValues.purposes.length > 0) {
                payLoad.purpose =
                    stepThreeBuyerValues.purposes.length > 0
                        ? stepThreeBuyerValues.purposes.join('/')
                        : '';
            }
            if (stepThreeBuyerValues.numberOfRooms.length > 0) {
                payLoad.numberOfRooms =
                    stepThreeBuyerValues.numberOfRooms.length > 0
                        ? stepThreeBuyerValues.numberOfRooms.join('/')
                        : '';
            }
            if (stepThreeBuyerValues.regions.length > 0) {
                payLoad.region =
                    stepThreeBuyerValues.regions.length > 0
                        ? stepThreeBuyerValues.regions.join('/')
                        : '';
            }
            if (stepThreeBuyerValues.buildingTypes.length > 0) {
                payLoad.buildingType =
                    stepThreeBuyerValues.buildingTypes.length > 0
                        ? stepThreeBuyerValues.buildingTypes.join('/')
                        : '';
            }
            if (stepThreeBuyerValues.priceHigherEnd) {
                payLoad.priceHigherEnd = stepThreeBuyerValues.priceHigherEnd;
            }
        } else {
            payLoad = { ...payLoad, ...stepThreeValues };
            if (isSuccessImage) {
                payLoad.imageUrl = userImage.display_url;
            }
        }
        registerUser({ ...payLoad });
    };

    const onChangeHandler = (e) => {
        if (chosenRole !== 'Купувач') {
            setStepThreeValues((state) => ({ ...state, [e.target.name]: e.target.value }));
        } else if (chosenRole === 'Купувач' && e.target.name === 'priceHigherEnd') {
            setStepThreeBuyerValues((state) => ({ ...state, [e.target.name]: e.target.value }));
        }
        setValue(e.target.name, e.target.value);
    };

    const onAddUserImageHandler = (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        addUserImage(formData);
        setImageName(e.target.files[0].name);
    };

    const onShowOptions = (e) => {
        if (e.target.name) {
            setChosenOption(e.target.name);
        }
    };

    const onUpdatePreferences = (value) => {
        if (
            chosenOption == 'purposes' ||
            chosenOption == 'regions' ||
            chosenOption == 'buildingTypes' ||
            chosenOption == 'numberOfRooms'
        ) {
            const currentValues = stepThreeBuyerValues[chosenOption];
            const currentPurposeIndex = currentValues.indexOf(value);
            if (currentPurposeIndex == -1) {
                currentValues.push(value);
            } else {
                currentValues.splice(currentPurposeIndex, 1);
            }
            setStepThreeBuyerValues((state) => ({ ...state, [chosenOption]: currentValues }));
            if (currentValues.length > 0) {
                setValue(chosenOption, currentValues.join('/'));
            } else {
                setValue(chosenOption, '');
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setChosenOption(undefined);
        }
    };

    return (
        <form
            ref={boxRef}
            onSubmit={handleSubmit(onSubmitHandler)}
            className='m-auto mt-4 w-96 space-y-6'
        >
            {isLoading && <Loader />}
            {chosenRole == 'Купувач' ? (
                <>
                    <div onClick={onShowOptions}>
                        <FloatingField
                            placeholder='Причина за покупката'
                            name='purposes'
                            type='text'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={stepThreeBuyerValues}
                            errors={errors}
                            readOnly={true}
                            onFocus={onShowOptions}
                            onKeyDown={handleKeyDown}
                        />
                        {chosenOption == 'purposes' && (
                            <div
                                onKeyDown={handleKeyDown}
                                className='absolute z-40 w-96 bg-stone-100 pb-2'
                            >
                                {buyerPreferences &&
                                    buyerPreferences?.purposes.map((value, index) => (
                                        <ButtonFilter
                                            key={index}
                                            isActive={stepThreeBuyerValues?.purposes?.includes(
                                                value
                                            )}
                                            action={() => onUpdatePreferences(value)}
                                        >
                                            {value}
                                        </ButtonFilter>
                                    ))}
                                <div
                                    onClick={() => setChosenOption(undefined)}
                                    className='absolute right-2 top-2 cursor-pointer text-red-600'
                                >
                                    x
                                </div>
                            </div>
                        )}
                    </div>
                    <div onClick={onShowOptions}>
                        <FloatingField
                            placeholder='Тип / Брой стаи'
                            name='numberOfRooms'
                            type='text'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={stepThreeBuyerValues}
                            errors={errors}
                            readOnly={true}
                            onFocus={onShowOptions}
                            onKeyDown={handleKeyDown}
                        />
                        {chosenOption == 'numberOfRooms' && (
                            <div
                                onKeyDown={handleKeyDown}
                                className='absolute z-40 w-96 bg-stone-100 pb-2'
                            >
                                {buyerPreferences &&
                                    buyerPreferences?.numberOfRooms.map((value, index) => (
                                        <ButtonFilter
                                            key={index}
                                            isActive={stepThreeBuyerValues?.numberOfRooms?.includes(
                                                value
                                            )}
                                            action={() => onUpdatePreferences(value)}
                                        >
                                            {value}
                                        </ButtonFilter>
                                    ))}
                                <div
                                    onClick={() => setChosenOption(undefined)}
                                    className='absolute right-2 top-2 cursor-pointer text-red-600'
                                >
                                    x
                                </div>
                            </div>
                        )}
                    </div>
                    <div onClick={onShowOptions}>
                        <FloatingField
                            placeholder='Региони'
                            name='regions'
                            type='text'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={stepThreeBuyerValues}
                            errors={errors}
                            readOnly={true}
                            onFocus={onShowOptions}
                            onKeyDown={handleKeyDown}
                        />
                        {chosenOption == 'regions' && (
                            <div
                                onKeyDown={handleKeyDown}
                                className='absolute z-40 w-96 bg-stone-100 pb-2'
                            >
                                {buyerPreferences &&
                                    buyerPreferences?.regions.map((value, index) => (
                                        <ButtonFilter
                                            key={index}
                                            isActive={stepThreeBuyerValues?.regions?.includes(
                                                value
                                            )}
                                            action={() => onUpdatePreferences(value)}
                                        >
                                            {value}
                                        </ButtonFilter>
                                    ))}
                                <div
                                    onClick={() => setChosenOption(undefined)}
                                    className='absolute right-2 top-2 cursor-pointer text-red-600'
                                >
                                    x
                                </div>
                            </div>
                        )}
                    </div>
                    <div onClick={onShowOptions}>
                        <FloatingField
                            placeholder='Вид строителството'
                            name='buildingTypes'
                            type='text'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={stepThreeBuyerValues}
                            errors={errors}
                            readOnly={true}
                            onFocus={onShowOptions}
                            onKeyDown={handleKeyDown}
                        />
                        {chosenOption == 'buildingTypes' && (
                            <div
                                onKeyDown={handleKeyDown}
                                className='absolute z-40 w-96 bg-stone-100 pb-2'
                            >
                                {buyerPreferences &&
                                    buyerPreferences?.buildingTypes.map((value, index) => (
                                        <ButtonFilter
                                            key={index}
                                            isActive={stepThreeBuyerValues?.buildingTypes?.includes(
                                                value
                                            )}
                                            action={() => onUpdatePreferences(value)}
                                        >
                                            {value}
                                        </ButtonFilter>
                                    ))}
                                <div
                                    onClick={() => setChosenOption(undefined)}
                                    className='absolute right-2 top-2 cursor-pointer text-red-600'
                                >
                                    x
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <FloatingField
                            placeholder='Максимална цена'
                            name='priceHigherEnd'
                            type='number'
                            onChangeHandler={onChangeHandler}
                            register={register}
                            values={stepThreeBuyerValues}
                            errors={errors}
                            readOnly={false}
                            onFocus={onShowOptions}
                        />
                    </div>
                </>
            ) : (
                <>
                    <FloatingField
                        placeholder='Първо име'
                        name='firstName'
                        type='text'
                        onChangeHandler={onChangeHandler}
                        register={register}
                        values={stepThreeValues}
                        errors={errors}
                    />
                    <FloatingField
                        placeholder='Фамилно име'
                        name='lastName'
                        type='text'
                        onChangeHandler={onChangeHandler}
                        register={register}
                        values={stepThreeValues}
                        errors={errors}
                    />
                    <FloatingField
                        placeholder='Телефонен номер'
                        name='phoneNumber'
                        type='text'
                        onChangeHandler={onChangeHandler}
                        register={register}
                        values={stepThreeValues}
                        errors={errors}
                    />
                    <div className='relative'>
                        <input
                            className='peer hidden'
                            id='image_file'
                            type='file'
                            placeholder=' '
                            onChange={onAddUserImageHandler}
                        />
                        <label
                            htmlFor='image_file'
                            className='flex h-14 w-full appearance-none items-center overflow-hidden rounded-lg border-4 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-lg text-gray-500 file:hidden focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                        >
                            {imageName}
                        </label>
                        {imageName !== 'Моля изберете снимка' && (
                            <div
                                className={`absolute start-3 top-3 z-10 origin-[0] -translate-y-5 scale-75 transform ${
                                    errors[name] &&
                                    'text-red-600 peer-focus:text-red-600 dark:text-red-400 peer-focus:dark:text-red-500'
                                } bg-stone-100 px-2 text-lg text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500`}
                            >
                                <p>Избрана снимка</p>
                            </div>
                        )}
                    </div>
                    {userImage && (
                        <img className='h-96 w-96 object-cover' src={userImage.display_url}></img>
                    )}
                </>
            )}
            <div className='flex justify-between gap-10'>
                <ButtonSecondary action={() => setCurrentStep(2)}>Назад</ButtonSecondary>
                <ButtonPrimary isSubmit={true}>Регистрация</ButtonPrimary>
            </div>
        </form>
    );
};

export default FormStepThree;
