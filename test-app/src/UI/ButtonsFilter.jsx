import { useState } from 'react';

export const MainButton = ({ children, action }) => {
    const [isActive, setIsActive] = useState(false);

    const buttonContext = () => {
        if (children.length == 1) {
            return children[0];
        } else if (children.length == 2) {
            return `${children[0]}: ${children[1]}`;
        } else if (children.length > 2) {
            return `${children[0]}: ${children[1]} + ${children.length - 2}`;
        }
    };

    const handleClick = () => {
        if (children.length > 1) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        if (action) {
            action();
        }
    };

    const buttonClass = `text-primary-700 hover:border-primary-accent-100 focus:border-primary-accent-100 ${
        isActive ? 'bg-neutral-500 bg-opacity-10' : 'bg-white '
    } dark:text-primary-100 m-2 inline-block rounded-full border-2 border-blue-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`;

    return (
        <button onClick={handleClick} className={buttonClass}>
            {buttonContext(children)}
        </button>
    );
};

export const OptionButton = ({ children, action }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (action) {
            action();
        }
    };

    const buttonClass = `text-primary-700 hover:border-primary-accent-100 focus:border-primary-accent-100 ${
        isActive ? 'bg-neutral-500 bg-opacity-10' : 'bg-white '
    } dark:text-primary-100 m-2 inline-block rounded-full border-2 border-blue-400 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`;

    return (
        <button onClick={handleClick} className={buttonClass}>
            {children}
        </button>
    );
};
