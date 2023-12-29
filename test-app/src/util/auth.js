import { redirect } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('authToken'));
};

export const restrictLoginRegister = async () => {
    const user = getUserData();

    if (user) {
        return redirect('/');
    }

    return null;
};

export const readToken = (token) => {
    const userData = {};
    const decodedToken = decodeToken(token);

    for (const key in decodedToken) {
        const currKey = key.split('/');
        if (!Object.prototype.hasOwnProperty.call(userData, currKey[currKey.length - 1])) {
            userData[currKey[currKey.length - 1]] = decodedToken[key];
        }
    }
    return userData;
};