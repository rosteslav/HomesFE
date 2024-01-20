import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
};

const registerAdminSlice = createSlice({
    name: 'registerAdmin',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
        },
        formAdminReset: (state) => {
            state.username = '';
            state.email = '';
            state.password = '';
            state.firstName = '';
            state.lastName = '';
            state.phoneNumber = '';
        },
    },
});

export const { setData, formAdminReset } = registerAdminSlice.actions;
export const selectedAdmin = (state) => state.registerAdmin;
export default registerAdminSlice.reducer;
