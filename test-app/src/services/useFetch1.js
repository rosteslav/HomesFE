import { useRequester } from './useRequester.js';

export const useFetch1 = () => {
    const { get, post, del } = useRequester();

    const endpoints = {
        login: '/login',
        register: '/register',
        adminRegister: '/admin/register',
        getItems: '/Items',
        addItem: '/Items',
        deleteItem: '/Items?id='
    };

    // AUTH FETCH
    const login = async (data) => post(endpoints.login, data);
    const register = async (data) => post(endpoints.register, data);
    const adminRegister = async (data) => post(endpoints.adminRegister, data);

    // ITEM FETCH
    const getAllItems = async () => get(endpoints.getItems);
    const createItem = async (data) => post(endpoints.addItem, data);
    const removeItem = async (id) => del(endpoints.deleteItem + id);

    return {
        login,
        register,
        adminRegister,
        getAllItems,
        createItem,
        removeItem
    };
};
