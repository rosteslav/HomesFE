import { Link } from 'react-router-dom';
import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { useFetchRolesOptionsQuery } from '../../../store/features/Api/authApi';

const FormStepOne = ({ setChosenRole, setCurrentStep }) => {
    const { data: roles } = useFetchRolesOptionsQuery();

    return (
        <>
            <div className='mt-4 flex items-center justify-center gap-4'>
                {roles && (
                    <div>
                        <ButtonPrimary
                            action={() => {
                                setChosenRole(roles.roles[0]);
                                setCurrentStep(2);
                            }}
                        >
                            {roles.roles[0]}
                        </ButtonPrimary>{' '}
                    </div>
                )}
                {roles &&
                    roles?.roles.map((content, inx) => {
                        if (inx !== 0) {
                            return (
                                <div key={inx}>
                                    <ButtonSecondary
                                        action={() => {
                                            setChosenRole(content);
                                            setCurrentStep(2);
                                        }}
                                    >
                                        {content}
                                    </ButtonSecondary>
                                </div>
                            );
                        }
                    })}
            </div>
            <p className='mt-10 text-center text-sm text-gray-800'>
                Ако вече сте регистрирани използвайте линка
                <Link
                    className='ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                    to='/auth/login'
                >
                    Вход
                </Link>
            </p>
        </>
    );
};

export default FormStepOne;
