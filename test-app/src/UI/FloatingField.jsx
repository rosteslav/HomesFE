const FloatingField = ({
    name,
    type,
    onChangeHandler,
    register,
    values,
    errors,
    placeholder,
    passwordVisibility,
    setPasswordVisibility,
    readOnly,
    onFocus,
    onKeyDown,
}) => {
    const registerForm = register ? { ...register(name) } : '';
    const currType = type == 'password' ? (passwordVisibility ? 'text' : 'password') : type;
    return (
        <>
            <div className='relative'>
                <input
                    type={currType}
                    id={`floating_${name}`}
                    {...registerForm}
                    value={values[name]}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    onChange={onChangeHandler}
                    placeholder=' '
                    readOnly={readOnly}
                    className={`peer block w-full appearance-none rounded-lg border-4 ${
                        errors[name] &&
                        'border-red-600 focus:border-red-600 dark:border-red-700 dark:focus:border-red-500'
                    } border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500`}
                />
                <label
                    htmlFor={`floating_${name}`}
                    className={`absolute start-3 top-3 z-10 origin-[0] -translate-y-5 scale-75 transform ${
                        errors[name] &&
                        'text-red-600 peer-focus:text-red-600 dark:text-red-400 peer-focus:dark:text-red-500'
                    } bg-stone-100 px-2 text-lg text-gray-900 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500`}
                >
                    {placeholder}
                </label>
                {type == 'password' && (
                    <div
                        onClick={() =>
                            setPasswordVisibility(
                                (prevPasswordVisibility) => !prevPasswordVisibility
                            )
                        }
                        className='absolute right-4 top-4 cursor-pointer'
                    >
                        {passwordVisibility ? (
                            <i className='fas fa-eye'></i>
                        ) : (
                            <i className='fas fa-eye-slash'></i>
                        )}
                    </div>
                )}
            </div>

            {errors[name] && (
                <p style={{ marginTop: '10px' }} className='text-sm text-red-600 dark:text-red-400'>
                    {errors[name].message}
                </p>
            )}
        </>
    );
};

export default FloatingField;
