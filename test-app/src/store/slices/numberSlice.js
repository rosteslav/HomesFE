import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 100,
    status: 'idle'
};

const numberSlice = createSlice({
    name: 'numberCounter',
    initialState,
    reducers: {
        divide: (state, action) => {
            state.value /= action.payload;
        },
        increase: (state, action) => {
            state.value += action.payload;
        }
    }
});


export const {divide, increase} = numberSlice.actions;

export const selectNumber = (state) => state.numberCounter.value;

export default numberSlice.reducer;