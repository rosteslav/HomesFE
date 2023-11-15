import { useDispatch, useSelector } from 'react-redux';
 
import { deleteUser, selectedUser } from '../store/slices/authSlice';

import Cookies from 'universal-cookie';

export const useRequester = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectedUser);
    const tokenKey = 'authToken';
    const cookies = new Cookies();

    const requester = async (url, options) => {
        try {
            const response = await fetch(url, options);
            if (response.ok !== true) {
                if (response.status === 403) {
                    dispatch(deleteUser(null));
                    localStorage.removeItem(tokenKey);
                    cookies.remove(tokenKey);
                }
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

    const createOptions = (method = 'get', data) => {
        const options = {
            method,
            headers: {}
        };
        if (data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        if (user != null) {
            options.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return options;
    };

    const get = async (url) => await requester(url, createOptions());

    const post = async (url, data) => await requester(url, createOptions('post', data));

    const del = async (url) => await requester(url, createOptions('delete'));

    return { get, post, del };
};
