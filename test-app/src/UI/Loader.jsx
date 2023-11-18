const Loader = () => {
    return (
        <div className="z-50 absolute">
            <div className=' mt-64 flex w-32 justify-center'>
                <span className='relative flex h-20 w-20'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
                    <span className='relative inline-flex h-20 w-20 rounded-full bg-sky-500  '></span>
                </span>
            </div>
        </div>
    );
};
export default Loader;
