import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   value: { 
        text: '',
        show: false, 
        className: {},
        disableBtn: false
    },
    status: 'idle'
};

const errorMsgSlice = createSlice({
    name: 'errorMsg',
    initialState,
    reducers: {
        errorMsg: (state, action) => {
            state.value = action.payload;
        }
    }
});


export const { errorMsg } = errorMsgSlice.actions;

export const selectedErrorMsg = (state) => state.errorMsg.value;

export default errorMsgSlice.reducer;