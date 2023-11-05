import { useState } from "react";

import useForm from "../hooks/useForm";
import useItems from "../hooks/useItems";
import ListData from "../components/ListData";

const HomePage = () => {
    const { items, addItem, deleteItem } = useItems();
    const { form, setForm, formChangeHandler } = useForm({ name: '' });
    const [disableButton, setDisableButton] = useState(false);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setDisableButton(true);

        try {
            await addItem(form);
            setForm({ name: '' });
        } catch (error) {
            // Do nothing...
        }

        setDisableButton(false);
    };

    return (
        <div>
            <h1>Items</h1>

            {items
                ? items.length > 0
                    ? <div className="itemsContainer">
                        <ListData data={items} onDelete={deleteItem} />
                    </div>
                    : <h2>There are no items!</h2>
                : <h2>Loading items...</h2>
            }

            <form onSubmit={formSubmitHandler}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={formChangeHandler}
                    placeholder="Insert item name..."
                />

                <button type='submit' disabled={disableButton}>Add Item</button>
            </form>
        </div>
    );
};

export default HomePage;