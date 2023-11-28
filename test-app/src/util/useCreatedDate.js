const useCreatedDate = (date) => {
    const createdDate = new Date(date);
    const currentDate = new Date();

    if (
        createdDate.getDate() === currentDate.getDate() &&
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getFullYear() === currentDate.getFullYear()
    ) {
        return 'Днес';
    }

    return `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
};

export default useCreatedDate;
