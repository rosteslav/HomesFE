const ListData = ({ data, onDelete }) => {
    return (
        <>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </li>

                ))}
            </ul >
        </>
    )
}

export default ListData;