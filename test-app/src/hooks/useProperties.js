import { useEffect } from 'react';
import { addAllProperties } from '../store/slices/properties/propertiesThunk';
import useThunk from './use-thunk';
import { useSelector } from 'react-redux';

export const useProperties = () => {
    const [doAddAllProperties, isLoading, error] = useThunk(addAllProperties);
    const properties = useSelector((state) => state.properties.data.all);

    useEffect(() => {
        if (properties.length === 0) {
            doAddAllProperties();
        }
    }, [doAddAllProperties, properties]);

    return { properties, isLoading, error };
};
