import { useNavigate } from 'react-router-dom';
import { useFetch1 } from '../services/useFetch1';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, selectedItems } from '../store/slices/itemsSlice';
import { useEffect, useState } from 'react';

export const useItems = () => {
    const { getAllItems, createItem, removeItem } = useFetch1();
    const dispatch = useDispatch();
    const [dataFetched, setDataFetched] = useState(false);
    //TODO When notification redux is ready this useState and and setLoading needs to be removed
    const [isLoading, setIsLoading] = useState(false);
    const items = useSelector(selectedItems);
    const navigate = useNavigate();

    // Fetch data only if items array is empty and data hasn't been fetched yet
    useEffect(() => {
        if (items.length === 0 && !dataFetched) {
            //TODO setIsLoading needs to be replace with notification redux
            setIsLoading(true);
            getAllItems().then((res) => {
                dispatch(setItems(res));
                setDataFetched(true);
                setIsLoading(false);
            });
        }
    }, [items, dataFetched, dispatch, getAllItems]);

    const onCreateItem = async (data) => {
        // create new item on server
        await createItem(data);

        // update App state
        const newState = await getAllItems();
        dispatch(setItems(newState));

        // redirect to catalog
        navigate('/');
    };

    const onDeleteItem = async (detailsId) => {
        const choice = window.confirm('Are you sure you want to delete this!');

        if (choice) {
            // Delet from server
            await removeItem(detailsId);

            // Delete from State
            const filterItems = items.filter((r) => r.id !== detailsId);
            dispatch(setItems(filterItems));

            // redirect to catalog
            navigate('/');
        }
    };

    return {
        items,
        onCreateItem,
        onDeleteItem,
        isLoading,
    };
};
