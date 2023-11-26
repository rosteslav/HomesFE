import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { ButtonPrimary, ButtonSecondary } from '../../../UI';
import { stepOne } from '../../../store/slices/registerUserSlice/registerUserSlice';
import toast from 'react-hot-toast';
import { getAllRoles } from '../../../services/api';

const RegisterStepOne = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllRoles();
                setRoles(result.roles);
            } catch (error) {
                toast.error('Error fetching roles:', error.message);
            }
        };
        fetchData();
    }, []);

    const dispatch = useDispatch();

    const primaryButton = () => {
        const content = roles[0];

        return (
            <Link className='flex-1' to='/auth/register/step2' onClick={onSubmitHandler}>
                <ButtonPrimary>{content}</ButtonPrimary>
            </Link>
        );
    };

    const secondaryButtons = () => {
        return roles.map((content, inx) => {
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
        });
    };

    const onSubmitHandler = (ev) => {
        dispatch(stepOne({ role: ev.target.textContent }));
    };

    return (
        <div className='flex justify-between gap-4'>
            {primaryButton()}
            {secondaryButtons()}
        </div>
    );
};

export default RegisterStepOne;
