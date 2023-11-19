import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerAdmin, registerUser } from './authThunk';
import Cookies from 'universal-cookie';
import { createUserContext } from '../../../util/createUserContext';

const tokenKey = 'authToken';
const cookies = new Cookies();

const initialState = {
    isLoading: false,
    data: JSON.parse(localStorage.getItem('authToken')) || {},
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        removeUser(state) {
            state.isLoading = false;
            state.data = {};
            state.error = {};
            localStorage.removeItem(tokenKey);
            cookies.remove(tokenKey);
        },
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            const userContext = createUserContext(action.payload);

            localStorage.setItem('authToken', JSON.stringify(userContext));

            cookies.set(tokenKey, userContext.token.token, {
                expires: new Date(userContext.token.expiration),
                secure: true,
            });
            state.data = userContext;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            state.data = {};
        });
        
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
            state.data = {};
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            state.data = {};
        });

        builder.addCase(registerAdmin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerAdmin.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
            state.data = {};
        });
        builder.addCase(registerAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            state.data = {};
        });
    },
});

export default authSlice.reducer;
export const { removeUser } = authSlice.actions;
