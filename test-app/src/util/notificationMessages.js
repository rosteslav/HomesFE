const notificationMessages = (statusCode) => {
    const messagesObj = {
        400: 'Съжалявам, нещо се случи. Моля, опитайте отново.',
        500: 'Нещо се обърка от наша страна. Екипът ни беше уведомен и работим по отстраняването му. Моля, опитайте отново по-късно.',
        404: 'Не успяхме да намерим това, което търсите.',
        403: 'За съжаление нямате разрешение за достъп до тази страница.',
        401: 'Потребителското име или паролата са грешни',
        409: 'Потребителското име е заето',
    };

    if (statusCode in messagesObj) {
        return messagesObj[statusCode];
    } else {
        return `Необработена грешка: ${statusCode}`;
    }
};

export const successNotifications = (message) => {
    const successMessages = {
        login: 'Влизането е успешно',
        register: 'Регистрацията премина успешно',
        reportReason: 'Съобщението за нередност е изпратено успешно'
    };

    if (message in successMessages) {
        return successMessages[message];
    }
    return 'Успех';
};

export default notificationMessages;
