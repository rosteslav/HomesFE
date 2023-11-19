import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';

const useThunk = (thunk) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const path = useResolvedPath();
    const dispatch = useDispatch();
    const runThunk = useCallback(
        async (arg) => {
            setIsLoading(true);
            try {
                await dispatch(thunk(arg)).unwrap();
                if (path.pathname === '/auth/login') {
                    navigate('/');
                } else if (path.pathname === '/auth/register') {
                    navigate('/auth/login');
                } else if (path.pathname === '/auth/admin/register') {
                    navigate('/auth/login');
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch, thunk, navigate, path]
    );

    return [runThunk, isLoading, error];
};

export default useThunk;
