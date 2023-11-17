const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message);
        }
        if (response.status === 204) {
            return {};
        } else {
            return response.json();
        }
    } catch (err) {
        throw new Error(err);
    }
};

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {},
    };
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const userData = localStorage.getItem('authToken');
    if (userData != null) {
        options.headers['Authorization'] = `Bearer ${userData.token}`;
    }
    return options;
}

export const get = async (url) => {
    return request(url, createOptions());
};
export const post = async (url, data) => {
    return request(url, createOptions('post', data));
};

export const del = async (url) => {
    return request(url, createOptions('delete'));
};
