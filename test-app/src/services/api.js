import { get, post, del } from './requester';

const hostAuth = 'http://localhost:5220';
const hostProperties = 'http://localhost:5221';
const hostAdmins = 'http://localhost:5222';
const hostImages = 'http://localhost:5223';

const endpoints = {
    // hostAuth
    getRoles: `${hostAuth}/roles`,
    login: `${hostAuth}/login`,
    register: `${hostAuth}/register`,
    adminRegister: `${hostAuth}/admin/register`,
    getAllBrokersList: `${hostAuth}/AuthOptions/brokers`,

    // hostProperties
    getAllProperties: `${hostProperties}/properties/all`,
    ownProperties: `${hostProperties}/properties`,
    getAdminsProperties: `${hostProperties}/admin/properties`,
    addProperty: `${hostProperties}/properties`,
    getPropertyById: `${hostProperties}/properties/`,
    getPropertyOptions: `${hostProperties}/PropertyOptions`,

    // hostAdmins
    getBrokers: `${hostAdmins}/admins/brokers`,
    postAdminProperties: `${hostAdmins}/admins/properties`,

    // hostImages
    postImage: `${hostImages}/Image?propertyId=`,
    deleteImage: `${hostImages}/`, // :id
    getAllImages: `${hostImages}/`, // :id
};

// AUTH FETCH
export const login = async (data) => post(endpoints.login, data);
export const register = async (data) => post(endpoints.register, data);
export const adminRegister = async (data) => post(endpoints.adminRegister, data);
export const getAllRoles = async () => get(endpoints.getRoles);

// ITEM FETCH
export const getAllProp = async () => get(endpoints.getAllProperties);
export const getAllPropertyOptions = async () => get(endpoints.getPropertyOptions);
export const createProp = async (data) => post(endpoints.addProperty, data);
export const removeItem = async (id) => del(endpoints.deleteItem + id);
export const getSelectedProperty = async (id) => get(endpoints.getPropertyById + id);
export const getOwnProperties = async () => get(endpoints.ownProperties);
export const getAllBrokersList = async () => get(endpoints.getAllBrokersList);

// IMAGE FETCH
export const uploadImg = async(id, data, file) => post(endpoints.postImage + id, data, file);
export const delImg = async(id) => del(endpoints.deleteImage + id);
export const getAllImg = async(id) => get(endpoints.getAllImages + id);