import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const host = 'http://localhost:5222';

export const useFetch = () => {
    const { user } = useContext(AuthContext);

    const requester = async (method, url, data) => {
        const options = { method, headers: {} };

        if (user) {
            options.headers['Authorization'] = `Bearer ${user.token}`;
        }

        if (data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        const response = await fetch(host + url, options);

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    };

    const get = async url => await requester('GET', url);
    const post = async (url, data) => await requester('POST', url, data);
    const del = async url => await requester('DELETE', url);

    return { get, post, del };
};
