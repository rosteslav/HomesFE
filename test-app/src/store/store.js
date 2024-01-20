import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Slices
import registerAdminSlice from './features/slices/registerAdminSlice';
import authUser from './features/slices/authUser';
import filter from './features/slices/filter';
import likedProperties from './features/slices/likedProperties';

// RTK Queries
import { propertiesApi } from './features/Api//propertiesApi';
import { imagesApi } from './features/Api//imagesApi';
import { authApi } from './features/Api/authApi';
import { adminApi } from './features/Api/adminApi';

const store = configureStore({
    reducer: {
        authUser: authUser,
        filter: filter,
        likedProperties: likedProperties,
        registerAdmin: registerAdminSlice,
        [propertiesApi.reducerPath]: propertiesApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(propertiesApi.middleware)
            .concat(imagesApi.middleware)
            .concat(authApi.middleware)
            .concat(adminApi.middleware);
    },
});
setupListeners(store.dispatch);

export default store;
