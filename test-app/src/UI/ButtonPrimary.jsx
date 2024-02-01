const ButtonPrimary = ({ children, action, isSubmit }) => {
    const handleClick = () => {
        if (action) {
            action();
        }
    };
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            onClick={handleClick}
            className='text-md flex  w-full justify-center rounded-md border border-indigo-600 bg-indigo-600 px-3 py-1.5 font-bold leading-6 tracking-wider text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
