import { decodeToken } from "react-jwt";

export const createUserContext = token => {
    const userContext = {
        token: token,
        claims: {},
        isAdmin: false
    };
    
    const decodedToken = decodeToken(token.token);
    for (const key in decodedToken) {
        if (key.includes('claims/role')) {
            const roles = decodedToken[key];
            userContext.claims.roles = roles;

            if (roles.includes('Администратор')) {
                userContext.isAdmin = true;
            }
        } else if (key.includes('claims/name')) {
            userContext.claims.name = decodedToken[key];
        }
    }
    
    return userContext;
};