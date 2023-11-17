import { get, post, del } from './requester';

const hostAuth = 'http://localhost:5222';
const hostProperties = 'http://localhost:5220';

const endpoints = {
    login: `${hostAuth}/login`,
    register: `${hostAuth}/register`,
    adminRegister: `${hostAuth}/admin/register`,
    getAllProperties: `${hostProperties}/properties/all`,
    addItem: `${hostProperties}/items`,
    deleteItem: `${hostProperties}/items?id=`,
};

// AUTH FETCH
export const login = async (data) => post(endpoints.login, data);
export const register = async (data) => post(endpoints.register, data);
export const adminRegister = async (data) => post(endpoints.adminRegister, data);

// ITEM FETCH
export const getAllItems = async () => get(endpoints.getAllProperties);
export const createItem = async (data) => post(endpoints.addItem, data);
export const removeItem = async (id) => del(endpoints.deleteItem + id);
