const host = 'http://localhost:5222';

const requester = async (method, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data !== undefined) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    };
}


export const requestFactory = () => {
    return {
        get: requester.bind(null, 'GET'),
        post: requester.bind(null, 'POST'),
        // put: requester.bind(null, 'PUT'),
        // patch: requester.bind(null, 'PATCH'),
        delete: requester.bind(null, 'DELETE'),
    }
};
