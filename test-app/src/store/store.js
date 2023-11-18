import { configureStore } from '@reduxjs/toolkit';
// import numberReducer from './slices/numberSlice';
import authReducer from './slices/auth/authSlice';
// import errorMsgReducer from './slices/errorMsgSlice';
// import itemsReducer from './slices/itemsSlice';
import propertiesSlice from './slices/properties/propertiesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        properties: propertiesSlice,
        // numberCounter: numberReducer,
        // errorMsg: errorMsgReducer,
        // items: itemsReducer,
    },
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
