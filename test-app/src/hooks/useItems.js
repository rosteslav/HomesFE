import { useNavigate } from 'react-router-dom';
import { useFetch1 } from '../services/useFetch1';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, selectedItems } from '../store/slices/itemsSlice';

export const useItems = () => {
    const { getAllItems, createItem, removeItem } = useFetch1();
    const dispatch = useDispatch();
    const items = useSelector(selectedItems);
    const navigate = useNavigate();

    //This is wrong amd needs to be fixed because if there is empty array will be infinite loop

    // if(items.length === 0) {
    //     getAllItems().then((res) => {
    //         dispatch(setItems(res));
    //     });
    // }

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
    };
};
