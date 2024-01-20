import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

// Util Functions
import { createUserContext } from '../../../util/createUserContext';

const cookies = new Cookies();

const authUserSlice = createSlice({
    name: 'auth',
    initialState: { data: JSON.parse(localStorage.getItem('authToken')) || null },
    reducers: {
        setUser(state, action) {
            const userContext = createUserContext(action.payload);
            state.data = userContext;
            localStorage.setItem('authToken', JSON.stringify(userContext));
            cookies.set('authToken', userContext, {
                expires: new Date(userContext.token.expiration),
                secure: true,
            });
        },
        setUserAutoLogin(state, action) {
            state.data = action.payload;
        },
        removeUser(state) {
            state.data = null;
            localStorage.removeItem('authToken');
            cookies.remove('authToken');
        },
    },
});

export default authUserSlice.reducer;
export const { setUser, removeUser, setUserAutoLogin } = authUserSlice.actions;
