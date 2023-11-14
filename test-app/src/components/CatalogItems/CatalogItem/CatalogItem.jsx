export const CatalogItem = ({ item, showDeleteBtn, onDelete }) => {
    return (
            <li key={item.id}>
                <span>{item.name}</span>
                {showDeleteBtn && <button className="btn" onClick={() => onDelete(item.id)}>&times;</button>}
            </li>
    );
};
