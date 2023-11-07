import { useState } from "react";
import { useFetch } from "./useFetch";

export const useItems = () => {
    const [items, setItems] = useState(null);
    const { get, post, del } = useFetch();

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

    return {
        items,
        loadItems,
        addItem,
        deleteItem,
    };
};
