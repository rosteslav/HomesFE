import { configureStore } from '@reduxjs/toolkit';
import  numberReducer from './slices/numberSlice';
import authReducer from './slices/authSlice';
import errorMsgReducer from './slices/errorMsgSlice';
import itemsReducer from './slices/itemsSlice';
import getPropertieReducer from './slices/getPropertieSlice';

const store = configureStore({
    reducer: {
        numberCounter: numberReducer,
        auth: authReducer,
        errorMsg: errorMsgReducer,
        items: itemsReducer,
        propertie: getPropertieReducer
    }
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });