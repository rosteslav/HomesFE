import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: '',
    username: '',
    email: '',
    password: '',
    repPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
};

const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {
        stepOne: (state, action) => {
            state.role = action.payload.role;
        },
        stepTwo: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.repPassword = action.payload.repPassword;
        },
        stepThree: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
        },
        formReset: (state) => {
            state.role = '';
            state.username = '';
            state.email = '';
            state.password = '';
            state.repPassword = '';
            state.firstName = '';
            state.lastName = '';
            state.phoneNumber = '';
        },
    },
});

export const { stepOne, stepTwo, stepThree, formReset } = registerUserSlice.actions;
export default registerUserSlice.reducer;
