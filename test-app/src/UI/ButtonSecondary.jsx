const ButtonSecondary = ({ children }) => {
    return (
        <button className='text-md flex w-full justify-center rounded-md border border-indigo-600 px-3 py-1.5 font-semibold leading-6 tracking-wider text-indigo-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            {children}
        </button>
    );
};

export default ButtonSecondary;
