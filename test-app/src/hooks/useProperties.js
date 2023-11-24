import { useEffect, useState } from 'react';
import { addAllProperties, addSelectedProperty } from '../store/slices/properties/propertiesThunk';
import useThunk from './use-thunk';
import { useSelector } from 'react-redux';

export const useProperties = () => {
    const [doAddAllProperties, isLoading, error] = useThunk(addAllProperties);
    const properties = useSelector((state) => state.properties.data.all);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (properties.length === 0 && !isFetched) {
            setIsFetched(true)
            doAddAllProperties();
        }
    }, [doAddAllProperties, properties, isFetched]);

    return { properties, isLoading, error };
};

export const useSelectedProperties = (id) => {
    const [doAddSelectedProperty, isLoading, error] = useThunk(addSelectedProperty);
    const [isFetch, setIsFetch] = useState(false);
    const property = useSelector((state) => state.properties.data.selectedProperty);


    useEffect(() => {
        if (!isFetch) {
            setIsFetch(true);
            doAddSelectedProperty(id);
        }
    }, [doAddSelectedProperty, id, isFetch]);

    return { property, isLoading, error };
};
