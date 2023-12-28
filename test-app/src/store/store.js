import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import registerAdminSlice from './slices/registerAdminSlice/registerAdminSlice';
import { propertiesApi } from '../services/propertiesApi';
import { imagesApi } from '../services/imagesApi';
import { authApi } from '../services/authApi';
import authUser from './features/authUser';
import filter from './features/filter';
import likedProperties from './features/likedProperties';

const store = configureStore({
    reducer: {
        authUser: authUser,
        filter: filter,
        likedProperties: likedProperties,
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
