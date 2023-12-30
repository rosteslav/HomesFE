import { decodeToken } from 'react-jwt';

export const createUserContext = (token) => {
    const userContext = {
        token: token,
        claims: {},
        isAdmin: false,
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
        } else if (key.includes('emailaddress')) {
            userContext.claims.email = decodedToken[key];
        } else if (key.includes('givenname')) {
            userContext.claims.username = decodedToken[key];
        } else if (key.includes('mobilephone')) {
            userContext.claims.phoneNumber = decodedToken[key];
        } else if (key.includes('claims/sid')) {
            userContext.claims.id = decodedToken[key];
        } else if (key.includes('surname')) {
            userContext.claims.lastName = decodedToken[key];
        } else if (key.includes('claims/uri')) {
            userContext.claims.userImage = decodedToken[key];
        }
    }

    return userContext;
};
