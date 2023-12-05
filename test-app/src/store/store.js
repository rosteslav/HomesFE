import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import propertiesSlice from './slices/properties/propertiesSlice';
import registerUserSlice from './slices/registerUserSlice/registerUserSlice';
import registerAdminSlice from './slices/registerAdminSlice/registerAdminSlice';
import { propertiesApi } from '../services/propertiesApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imagesApi } from '../services/imagesApi';
import { authApi } from '../services/authApi';
import authUser from './features/authUser';

const store = configureStore({
    reducer: {
        authUser: authUser,
        auth: authReducer,
        properties: propertiesSlice,
        registerUserForm: registerUserSlice,
        registerAdmin: registerAdminSlice,
        [propertiesApi.reducerPath]: propertiesApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(propertiesApi.middleware)
            .concat(imagesApi.middleware)
            .concat(authApi.middleware);
    },
});
setupListeners(store.dispatch);

export default store;
