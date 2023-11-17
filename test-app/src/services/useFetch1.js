import { useRequester } from './useRequester.js';

export const useFetch1 = () => {
    const { get, post, del } = useRequester();

    const hostAuth = 'http://localhost:5222';
    const hostProperties = 'http://localhost:5220';

    const endpoints = {
        login: `${hostAuth}/login`,
        register: `${hostAuth}/register`,
        adminRegister: `${hostAuth}/admin/register`,
        getAllProperties: `${hostProperties}/properties/all`,
        addItem: `${hostProperties}/items`,
        deleteItem: `${hostProperties}/items?id=`
    };

    // AUTH FETCH
    const login = async (data) => post(endpoints.login, data);
    const register = async (data) => post(endpoints.register, data);
    const adminRegister = async (data) => post(endpoints.adminRegister, data);

    // ITEM FETCH
    const getAllItems = async () => get(endpoints.getAllProperties);
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
