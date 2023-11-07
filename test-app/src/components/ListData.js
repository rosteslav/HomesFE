export const ListData = ({
    data,
    showDeleteBtn,
    onDelete,
}) => {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    {showDeleteBtn && <button onClick={() => onDelete(item.id)}>&times;</button>}
                </li>
            ))}
        </ul >
    );
};
