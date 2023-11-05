import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const addUser = credentials => {
        const user = {
            ...credentials,
            claims: {},
            isAdmin: false
        };

        const decodedToken = decodeToken(credentials.token);
        for (const key in decodedToken) {
            if (key.includes('claims/role')) {
                const roles = decodedToken[key];
                user.claims.roles = roles;

                if (roles.includes('Admin')) {
                    user.isAdmin = true;
                }
            } else if (key.includes('claims/name')) {
                user.claims.name = decodedToken[key];
            }
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem('user');
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
