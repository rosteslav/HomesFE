import { useState, useEffect } from "react";
import { get, post, del } from "../services/requester"

const useItems = () => {
    const [items, setItems] = useState(null);

    const loadItems = async () => {
        const items = await get("/Items");
        setItems(items);
    };
    
    const addItem = async form => {
        await post("/Items", form);
        loadItems();
    };

    const deleteItem = async itemId => {
        await del(`/Items?id=${itemId}`);
        loadItems();
    };
    
    useEffect(() => { loadItems() }, []);

    return {
        items,
        addItem,
        deleteItem,
    };
};

export default useItems;