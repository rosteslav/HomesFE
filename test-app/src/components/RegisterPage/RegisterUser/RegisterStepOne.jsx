import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { stepOne } from '../../../store/slices/registerUserSlice/registerUserSlice';
import { useFetchRolesOptionsQuery } from '../../../services/authApi';

const RegisterStepOne = () => {
    const { data, isSuccess } = useFetchRolesOptionsQuery();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setRoles(data.roles);
        }
    }, [data, isSuccess]);

    const dispatch = useDispatch();

    const onSubmitHandler = (ev) => {
        dispatch(stepOne({ role: ev.target.textContent }));
    };

    return (
        <div className='flex justify-between gap-4'>
            {roles && (
                <Link className='flex-1' to='/auth/register/step2' onClick={onSubmitHandler}>
                    <ButtonPrimary>{roles[0]}</ButtonPrimary>
                </Link>
            )}
            {roles &&
                roles?.map((content, inx) => {
                    if (inx !== 0) {
                        return (
                            <Link
                                className='flex-1'
                                to='/auth/register/step2'
                                key={content}
                                onClick={onSubmitHandler}
                            >
                                <ButtonSecondary>{content}</ButtonSecondary>
                            </Link>
                        );
                    }
                })}
        </div>
    );
};

export default RegisterStepOne;
