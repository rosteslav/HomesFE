import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();
    const tokenKey = 'authToken';

    if (!user) {
        let token;
        const credentials = JSON.parse(localStorage.getItem(tokenKey));

        if (credentials) {
            const expiration = new Date(credentials.expiration);
            const currDate = new Date();

            if (expiration > currDate) {
                token = credentials.token;
            } else {
                localStorage.removeItem(tokenKey);
            }
        } else {
            token = cookies.get(tokenKey);
        }

        if (token) {
            const userContext = createUserContext(token);
            setUser(userContext);
        }
    }

    const addUser = credentials => {
        const userContext = createUserContext(credentials.token);
        setUser(userContext);

        localStorage.setItem(tokenKey, JSON.stringify(credentials));

        cookies.set(tokenKey, credentials.token, {
            expires: new Date(credentials.expiration),
            secure: true
        });
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem(tokenKey);
        cookies.remove(tokenKey);
    };

    const context = {
        user,
        addUser,
        removeUser,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

const createUserContext = token => {
    const userContext = {
        token: token,
        claims: {},
        isAdmin: false
    };

    const decodedToken = decodeToken(token);
    for (const key in decodedToken) {
        if (key.includes('claims/role')) {
            const roles = decodedToken[key];
            userContext.claims.roles = roles;

            if (roles.includes('Admin')) {
                userContext.isAdmin = true;
            }
        } else if (key.includes('claims/name')) {
            userContext.claims.name = decodedToken[key];
        }
    }

    return userContext;
};
