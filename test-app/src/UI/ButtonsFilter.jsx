export const ButtonFilter = ({ children, action, isActive }) => {
    const handleClick = () => {
        if (action) {
            action();
        }
    };

    const buttonClass = `inline-flex text-primary-700 hover:border-primary-accent-100 focus:border-primary-accent-100 ${
        isActive ? 'bg-neutral-500 bg-opacity-10' : 'bg-white '
    } dark:text-primary-100 m-2 inline-block rounded-full border-2 border-blue-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`;

    return (
        <button type="button" onClick={handleClick} className={buttonClass}>
            {children}
        </button>
    );
};

export const ButtonReset = ({ children, action }) => {
    const buttonClass =
        'm-2 inline-block rounded-full  border-2 border-indigo-600 bg-indigo-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-indigo-500 hover:bg-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-0 dark:hover:bg-indigo-500';
    const handleClick = () => {
        if (action) {
            action();
        }
    };
    return (
        <button className={buttonClass} onClick={handleClick}>
            {children}
        </button>
    );
};
