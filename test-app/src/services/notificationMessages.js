const notificationMessages = (statusCode) => {
    const messagesObj = {
        400: 'Sorry, something happened. Please try again.',
        500: "Something went wrong on our end. Our team has been notified, and we're working to fix it. Please try again later.",
        404: "We couldn't find what you're looking for.",
        403: 'Sorry, you do not have permission to access this page.',
        401: 'Username or password is wrong',
        409: 'Username already exist'
    };

    if (statusCode in messagesObj) {
        return messagesObj[statusCode];
    } else {
        return `Unhandled status code: ${statusCode}`;
    }
};

export default notificationMessages;
