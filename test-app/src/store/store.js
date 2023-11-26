import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import propertiesSlice from './slices/properties/propertiesSlice';
import registerUserSlice from './slices/registerUserSlice/registerUserSlice';
import registerAdminSlice from './slices/registerAdminSlice/registerAdminSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        properties: propertiesSlice,
        registerUserForm: registerUserSlice,
        registerAdmin: registerAdminSlice
    },
});

export default store;