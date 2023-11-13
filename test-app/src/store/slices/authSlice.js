import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, deleteUser } = authSlice.actions;

export const selectedUser = (state) => state.auth.user;

export default authSlice.reducer;
