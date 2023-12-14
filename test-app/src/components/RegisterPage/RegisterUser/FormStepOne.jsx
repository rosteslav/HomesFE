import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { useFetchRolesOptionsQuery } from '../../../services/authApi';

const FormStepOne = ({ setChosenRole, setCurrentStep }) => {
    const { data: roles } = useFetchRolesOptionsQuery();

    return (
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
    );
};

export default FormStepOne;