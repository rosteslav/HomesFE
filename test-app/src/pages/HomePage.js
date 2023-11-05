import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { useItems } from "../hooks/useItems";

import { ListData } from "../components/ListData";
import { AuthContext } from "../contexts/AuthContext";

export const HomePage = () => {
    const [disableButton, setDisableButton] = useState(false);
    const { items, loadItems, addItem, deleteItem } = useItems();
    const { form, setForm, formChangeHandler } = useForm({ name: '' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user && !items) {
        loadItems()
            .catch(() => {
                alert('You need to log in first!');
                navigate('/login');
            });
    }

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

    return (user
        ? <div>
            <h1>Items</h1>

            {items
                ? items.length > 0
                    ? <div className="itemsContainer">
                        <ListData data={items} showDeleteBtn={user.isAdmin} onDelete={deleteItem} />
                    </div>
                    : <h2>There are no items!</h2>
                : <h2>Loading items...</h2>
            }

            {user.isAdmin &&
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
            }
        </div>
        : <Navigate to='/login' />
    );
};
