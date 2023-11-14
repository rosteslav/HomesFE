import { Navigate } from 'react-router-dom';

import { useItems } from '../../hooks/useItems';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import { CatalogItem } from './CatalogItem/CatalogItem';

import styles from './CatalogItems.module.css';

export const CatalogItems = () => {
    const { items, onCreateItem, onDeleteItem } = useItems();
    const { user } = useAuth();
    const { formData, onChangeHandler, onSubmit } = useForm({ name: '' }, onCreateItem);
    
    return user ? (
        <div>
            <h1 className={styles['logoTitle']}>Items</h1>
            {items ? (
                items.length > 0 ? (
                    <div className={styles.itemsContainer}>
                        <ul>
                            {items.map((i) => (
                                <CatalogItem
                                    key={i.id}
                                    item={i}
                                    onDelete={onDeleteItem}
                                    showDeleteBtn={user.isAdmin}
                                />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h2>Loading items...</h2>
                )
            ) : (
                <h2>There are no items!</h2>
            )}

            {user.isAdmin && (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChangeHandler}
                        placeholder="Insert item name..."
                        required
                    />

                    <button className="btn" type="submit">Add Item</button>
                </form>
            )}
        </div>
    ) : (
        <Navigate to="/auth/login" />
    );
};
