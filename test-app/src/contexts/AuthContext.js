import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();

    if (!user) {
        const token = cookies.get('AuthCookie');
        if (token) {
            const userContext = createUserContext(token);
            setUser(userContext);
        }
    }

    const addUser = credentials => {
        const userContext = createUserContext(credentials.token);
        setUser(userContext);
        cookies.set('AuthCookie', credentials.token, {
            expires: new Date(credentials.expiration),
            secure: true
        });
    };

    const removeUser = () => {
        setUser(null);
        cookies.remove('AuthCookie');
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
