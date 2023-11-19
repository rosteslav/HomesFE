import { get, post, del } from './requester';

// const hostAuth = 'http://localhost:5222';
// const hostProperties = 'http://localhost:5220';

const hostAuth = 'http://localhost:5220';
const hostProperties = 'http://localhost:5221';
// const hostAdmins = 'http://localhost:5222';
// const hostImages = 'http://localhost:5223';

const endpoints = {
    login: `${hostAuth}/login`,
    register: `${hostAuth}/register`,
    adminRegister: `${hostAuth}/admin/register`,
    getAllProperties: `${hostProperties}/properties/all`,
    addItem: `${hostProperties}/items`,
    deleteItem: `${hostProperties}/items?id=`,
};

// AUTH FETCH
export const login = async (data) => {
    const res = post(endpoints.login, data);
    console.log('api', res);
    return res;
};
export const register = async (data) => post(endpoints.register, data);
export const adminRegister = async (data) => {
    const res = post(endpoints.adminRegister, data);
    console.log('api', res);
};

// ITEM FETCH
export const getAllProp = async () => get(endpoints.getAllProperties);
export const createItem = async (data) => post(endpoints.addItem, data);
export const removeItem = async (id) => del(endpoints.deleteItem + id);
